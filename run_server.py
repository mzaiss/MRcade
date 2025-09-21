import http.server
import socket
import socketserver
import webbrowser
import threading
import sys
import time
from typing import Optional
import json
import asyncio
try:
    import websockets
except Exception:
    websockets = None
try:
    import qrcode
except Exception:
    qrcode = None

PORT = 8000

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def get_lan_ip() -> str:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0)
        # Doesn't need to be reachable; no packets are sent
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

def try_print_qr(url: str, label: Optional[str] = None):
    try:
        qr = qrcode.QRCode(border=1)
        qr.add_data(url)
        qr.make(fit=True)
        matrix = qr.get_matrix()
        # Print simple ASCII QR (two rows per line for square-ish look)
        print('\n' + (label or 'QR') + ':')
        for row in matrix:
            line = ''.join('  ' if not cell else '██' for cell in row)
            print(line)
    except ImportError:
        print(f"\n(Install 'qrcode' for QR output: pip install qrcode[pil])\nURL ({label or 'QR'}): {url}")

def save_qr_png(url: str, filename: str):
    if not qrcode:
        return False
    try:
        img = qrcode.make(url)
        img.save(filename)
        return True
    except Exception:
        return False

def serve(directory: str = '.'):
    handler = http.server.SimpleHTTPRequestHandler
    httpd = ThreadingHTTPServer(('0.0.0.0', PORT), handler)
    lan_ip = get_lan_ip()

    index_url = f'http://{lan_ip}:{PORT}/index.html'
    phone1_url = f'http://{lan_ip}:{PORT}/controller.html'

    print('\nLocal server running...')
    print(f'  App index:         {index_url}')
    print(f'  Desktop receiver:  http://{lan_ip}:{PORT}/receiver.html')
    print(f'  Phone controller:  {phone1_url}')
    print('\nTips:')
    print('  - Keep this window open while testing.')
    print('  - If the phone cannot open the link, confirm both devices are on the same Wi‑Fi.')
    print('  - If Chrome blocks motion sensors, tap "Enable motion sensors" on the phone page.')
    # Single controller/receiver pair recommended

    # Print QR codes for quick phone access
    try_print_qr(index_url, 'App index')
    try_print_qr(phone1_url, 'Phone')

    # Save PNG QR codes to serve on receiver page
    if save_qr_png(phone1_url, 'qr_controller.png'):
        print('Saved phone controller QR: qr_controller.png')
    else:
        print("(Skipping PNG QR; install 'qrcode[pil]' to enable)")

    # Open receiver on desktop after a short delay so server is ready
    def _open():
        time.sleep(0.5)
        try:
            webbrowser.open_new_tab(f'http://{lan_ip}:{PORT}/receiver.html')
        except Exception:
            pass

    threading.Thread(target=_open, daemon=True).start()

    # Start WebSocket signaling server if available
    if websockets is None:
        print("\n(WebSocket signaling disabled: install 'websockets' with: pip install websockets)")
        print('Manual copy/paste signaling will still work.')
    else:
        def run_ws():
            asyncio.run(start_ws_server(lan_ip))
        threading.Thread(target=run_ws, daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
        print('\nServer stopped.')

peers = {}

async def start_ws_server(lan_ip: str, port: int = 8765):
    async def handler(ws):
        role = None
        peer_id = None
        target_role = None
        try:
            print("[ws] client connected")
            async for msg in ws:
                try:
                    data = json.loads(msg)
                except Exception:
                    print("[ws] non-json message ignored")
                    continue
                t = data.get('type')
                if t == 'hello':
                    peer_id = str(data.get('peer', '1'))
                    role = data.get('role')  # 'controller' or 'receiver'
                    if role not in ('controller', 'receiver'):
                        await ws.close()
                        return
                    target_role = 'receiver' if role == 'controller' else 'controller'
                    room = peers.setdefault(peer_id, {'controller': {'ws': None, 'queue': []}, 'receiver': {'ws': None, 'queue': []}})
                    # If a connection for this role already exists, close it to avoid duplicates
                    old = room[role]['ws']
                    if old and old is not ws:
                        try:
                            await old.close()
                        except Exception:
                            pass
                    room[role]['ws'] = ws
                    print(f"[ws] hello role={role} peer={peer_id}")
                    # Flush queued messages if any
                    q = room[role]['queue']
                    if q:
                        print(f"[ws] flushing {len(q)} queued to {role}")
                        for queued in q:
                            try:
                                await ws.send(queued)
                            except Exception:
                                break
                        room[role]['queue'] = []
                    continue
                # forward signaling
                if peer_id is None or role is None:
                    print("[ws] received before hello; ignoring")
                    continue
                room = peers.get(peer_id)
                if not room:
                    continue
                other = room[target_role]['ws']
                payload = json.dumps(data)
                if other:
                    try:
                        await other.send(payload)
                        print(f"[ws] fwd {t} to {target_role} peer={peer_id}")
                    except Exception as e:
                        print(f"[ws] send error to {target_role}, queueing: {e}")
                        room[target_role]['queue'].append(payload)
                else:
                    room[target_role]['queue'].append(payload)
                    print(f"[ws] queued {t} for {target_role} peer={peer_id}")
        finally:
            # cleanup on disconnect
            if peer_id and role:
                room = peers.get(peer_id)
                if room and room.get(role, {}).get('ws') is ws:
                    room[role]['ws'] = None
                    print(f"[ws] disconnect role={role} peer={peer_id}")

    bind = ('0.0.0.0', port)
    # websockets.serve accepts handler(ws, path) in some versions and handler(ws) in newer
    try:
      srv = await websockets.serve(handler, *bind)
    except TypeError:
      # fallback to two-arg handler signature
      async def handler2(ws, path):
        return await handler(ws)
      srv = await websockets.serve(handler2, *bind)
    print(f"\nWebSocket signaling running at ws://{lan_ip}:{port} (auto-signaling enabled)")
    await srv.wait_closed()

if __name__ == '__main__':
    # Change working directory to script location to serve project files
    try:
        import os
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
    except Exception:
        pass
    serve()


