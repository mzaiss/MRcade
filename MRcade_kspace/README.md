# K-Space Emoji FFT + Remote Tilt Controller

This project lets you:
- Run a local emoji-to-FFT visualizer (offline, no server).
- Optionally enable a phone-as-controller that streams tilt (over WebRTC + WebSocket signaling) to steer the mask in the main app.

## 1) Offline mode (no server)
Use this to run the FFT app locally without any network features.

Steps:
1. Open `index.html` in your desktop browser (double-click or drag into the window).
2. Use the UI:
   - New emoji: picks a new random emoji.
   - Pong mode / Curl mode: optional local interactions with the mask.
   - Mask: draw to filter K-space; reconstruction updates live.
3. Remote tilt and phone features are disabled in offline mode.

Notes:
- Works via `file://` for the base FFT app.
- Some browsers may restrict fonts/emoji rendering; use a modern Chrome/Edge/Firefox.

## 2) Server mode with phone controller (WebRTC + WebSocket)
Use this to stream tilt from your phone and steer the Curl mode in the desktop app.

### Requirements
- Python 3.9+ on your desktop
- Recommended: install once for QR and signaling (optional but helpful):
  - `pip install qrcode[pil] websockets`

### Start the local server
In a terminal from the project folder:
```
py run_server.py
```
You’ll see printed URLs and ASCII QR codes:
- App index: `http://YOUR_PC_IP:8000/index.html`
- Receiver (debug): `http://YOUR_PC_IP:8000/receiver.html`
- Phone controllers: `http://YOUR_PC_IP:8000/controller.html?peer=1` and `?peer=2`

The server also auto-opens `receiver.html` for quick debugging.

### Connect the phone controller
1. Ensure your phone and PC are on the same Wi‑Fi.
2. On your phone, open the controller page (scan QR or type the URL).
3. Tap “Enable motion sensors” and allow permission.
   - You should see “Secure context: true/false” and “Motion: … raw=…”.
   - If raw stays 0 after a few seconds, some Android/Chrome configs require HTTPS for sensors.
     - Option A (Chrome flag): `chrome://flags/#unsafely-treat-insecure-origin-as-secure`, add `http://YOUR_PC_IP:8000`, relaunch browser.
     - Option B: Use a trusted HTTPS tunnel (e.g., `cloudflared`) – not needed if Option A works.

### Use tilt in the main app
1. On your desktop, open `http://YOUR_PC_IP:8000/index.html`.
2. Check “Curl mode” and “Remote tilt”.
3. Now tilt the phone – the Curl marker should steer. The mask trail updates and the FFT/reconstruction refresh.

### Debug tools
- `receiver.html` shows:
  - Signaling status and logs
  - Live instantaneous tilt dot
  - Integrated “tilt moment” dot (first moment over time)
- `controller.html` shows:
  - Signaling status/logs
  - Motion telemetry (beta/gamma, sent/raw counters)

### Traffic, stability, and reconnects
- The phone sends tilt via WebRTC DataChannel (~30 Hz) and a light WebSocket feed (~10 Hz with deadzone). This reduces router load.
- Both pages auto-reconnect WS with a fixed 2s delay and suppress parallel attempts.
- If you see Wi‑Fi hiccups:
  - Don’t run `receiver.html` and “Remote tilt” simultaneously unless needed.
  - Prefer 5 GHz Wi‑Fi and update router firmware.

## Troubleshooting
- “CORS” or module errors when opening `index.html` directly: use the server mode.
- Phone shows “Motion: waiting …”: grant motion permission, use the Chrome flag for insecure origin if needed, then reload.
- WebSocket shows “closed/error” repeatedly: verify desktop IP/port, firewall rules, and that `run_server.py` is running.

## Files overview
- `index.html` – main FFT app (offline-capable). Optional “Remote tilt” toggle.
- `app.js` – FFT logic, mask tools, Curl/Pong modes, optional WS tilt mapping.
- `standalone-fft.js` – 1D FFT used to compose 2D FFT.
- `controller.html` – phone controller; streams tilt via WebRTC + WS.
- `receiver.html` – desktop debug page for signaling and live tilt viz.
- `run_server.py` – HTTP server + optional WS signaling and console QR rendering.

## Privacy & network
All traffic stays on your LAN. No cloud services are required. The optional QR images in the terminal are ASCII; the receiver page’s QR links use Google Charts only if loaded by you and reachable (not required for operation).
