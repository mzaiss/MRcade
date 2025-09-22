// expect global FFT from standalone-fft.js when loaded via <script>

const SIZE = 64;
const EMOJIS = [
  // Faces we keep for guessing variety
  '😀','😎','🤖','👻','👽','💀','🧙‍♂️','🧛‍♀️','🧟‍♂️','🧞‍♂️',
  // Animals
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐵','🐸','🐔','🦄','🦉','🦇','🐙','🦈','🐳','🐬','🐢','🦕','🦖','🦩','🦦',
  // Food & Drink
  '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🍍','🥭','🥝','🍅','🥥','🥑','🌽','🥕','🥔','🍄','🍞','🥐','🥨','🥯','🧇','🥞','🧀','🍗','🍖','🍔','🍟','🍕','🌭','🌮','🌯','🥙','🥗','🍣','🍤','🍜','🍝','🍲','🍛','🍚','🍥','🍩','🍪','🍫','🍬','🍭','🍮','🍦','🍧','🍨','🥤','🧁','☕','🍵','🍺','🍻','🍷','🍸','🍹',
  // Sports & Activities
  '⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥅','🥊','🥋','🎯','🎳','🎮','🎲','♟️',
  // Objects & Symbols
  '💡','🔧','🔨','⚙️','🧩','🧠','🎧','🎵','📷','📱','💻','⌚','📺','🖨️','🪐','🌙','⭐','🌟','✨','🌈','🔥','💥','⚡','❄️','💧','🌊','🌪️','🌋','⛰️','🏔️','🌅','🌄','🌆','🌃','🎃','🎄','🎁','🎀','🕹️','🚀','🛰️','✈️','🚁','🚗','🛸','🚤','🚲','🛴','🛵','🚌','🚂','🚇',
  // Plants & Nature
  '🌻','🌼','🌸','🌺','🌷','🌹','🌵','🌳','🌴','🌿','🍀','🍁','🍂','🍃'
];

// Official-style readable names for all emojis in EMOJIS
const EMOJI_NAMES = new Map([
  // Faces
  ['😀','grinning face'],['😎','smiling face with sunglasses'],['🤖','robot'],['👻','ghost'],['👽','alien'],['💀','skull'],['🧙‍♂️','man mage'],['🧛‍♀️','woman vampire'],['🧟‍♂️','man zombie'],['🧞‍♂️','man genie'],
  // Animals
  ['🐶','dog face'],['🐱','cat face'],['🐭','mouse face'],['🐹','hamster face'],['🐰','rabbit face'],['🦊','fox'],['🐻','bear'],['🐼','panda'],['🐨','koala'],['🐯','tiger face'],['🦁','lion'],['🐮','cow face'],['🐷','pig face'],['🐵','monkey face'],['🐸','frog'],['🐔','chicken'],['🦄','unicorn'],['🦉','owl'],['🦇','bat'],['🐙','octopus'],['🦈','shark'],['🐳','spouting whale'],['🐬','dolphin'],['🐢','turtle'],['🦕','sauropod'],['🦖','T-Rex'],['🦩','flamingo'],['🦦','otter'],
  // Food & Drink
  ['🍎','red apple'],['🍐','pear'],['🍊','tangerine'],['🍋','lemon'],['🍌','banana'],['🍉','watermelon'],['🍇','grapes'],['🍓','strawberry'],['🫐','blueberries'],['🍒','cherries'],['🍑','peach'],['🍍','pineapple'],['🥭','mango'],['🥝','kiwi fruit'],['🍅','tomato'],['🥥','coconut'],['🥑','avocado'],['🌽','ear of corn'],['🥕','carrot'],['🥔','potato'],['🍄','mushroom'],['🍞','bread'],['🥐','croissant'],['🥨','pretzel'],['🥯','bagel'],['🧇','waffle'],['🥞','pancakes'],['🧀','cheese wedge'],['🍗','poultry leg'],['🍖','meat on bone'],['🍔','hamburger'],['🍟','french fries'],['🍕','pizza'],['🌭','hot dog'],['🌮','taco'],['🌯','burrito'],['🥙','stuffed flatbread'],['🥗','green salad'],['🍣','sushi'],['🍤','fried shrimp'],['🍜','steaming bowl'],['🍝','spaghetti'],['🍲','pot of food'],['🍛','curry rice'],['🍚','cooked rice'],['🍥','fish cake with swirl'],['🍩','doughnut'],['🍪','cookie'],['🍫','chocolate bar'],['🍬','candy'],['🍭','lollipop'],['🍮','custard'],['🍦','soft ice cream'],['🍧','shaved ice'],['🍨','ice cream'],['🥤','cup with straw'],['🧁','cupcake'],['☕','hot beverage'],['🍵','teacup without handle'],['🍺','beer mug'],['🍻','clinking beer mugs'],['🍷','wine glass'],['🍸','cocktail glass'],['🍹','tropical drink'],
  // Sports & Activities
  ['⚽','soccer ball'],['🏀','basketball'],['🏈','american football'],['⚾','baseball'],['🎾','tennis'],['🏐','volleyball'],['🏉','rugby football'],['🎱','pool 8 ball'],['🏓','ping pong'],['🏸','badminton'],['🥅','goal net'],['🥊','boxing glove'],['🥋','martial arts uniform'],['🎯','direct hit'],['🎳','bowling'],['🎮','video game'],['🎲','game die'],['♟️','chess pawn'],
  // Objects & Symbols
  ['💡','light bulb'],['🔧','wrench'],['🔨','hammer'],['⚙️','gear'],['🧩','puzzle piece'],['🧠','brain'],['🎧','headphone'],['🎵','musical note'],['📷','camera'],['📱','mobile phone'],['💻','laptop'],['⌚','watch'],['📺','television'],['🖨️','printer'],['🪐','ringed planet'],['🌙','crescent moon'],['⭐','star'],['🌟','glowing star'],['✨','sparkles'],['🌈','rainbow'],['🔥','fire'],['💥','collision'],['⚡','high voltage'],['❄️','snowflake'],['💧','droplet'],['🌊','water wave'],['🌪️','tornado'],['🌋','volcano'],['⛰️','mountain'],['🏔️','snow-capped mountain'],['🌅','sunrise'],['🌄','sunrise over mountains'],['🌆','cityscape at dusk'],['🌃','night with stars'],['🎃','jack-o-lantern'],['🎄','Christmas tree'],['🎁','wrapped gift'],['🎀','ribbon'],['🕹️','joystick'],['🚀','rocket'],['🛰️','satellite'],['✈️','airplane'],['🚁','helicopter'],['🚗','automobile'],['🛸','flying saucer'],['🚤','speedboat'],['🚲','bicycle'],['🛴','kick scooter'],['🛵','motor scooter'],['🚌','bus'],['🚂','locomotive'],['🚇','metro'],
  // Plants & Nature
  ['🌻','sunflower'],['🌼','blossom'],['🌸','cherry blossom'],['🌺','hibiscus'],['🌷','tulip'],['🌹','rose'],['🌵','cactus'],['🌳','deciduous tree'],['🌴','palm tree'],['🌿','herb'],['🍀','four leaf clover'],['🍁','maple leaf'],['🍂','fallen leaves'],['🍃','leaf fluttering in wind']
]);


// const srcCanvas = document.getElementById('src'); // removed original canvas
// const fftCanvas = document.getElementById('fft'); // removed pure k-space canvas
const maskCanvas = document.getElementById('fftMasked');
const fftMaskedCanvas = maskCanvas; // unify: draw mask directly on masked k-space canvas
const reconCanvas = document.getElementById('recon');
const btn = document.getElementById('btn');
const revealOriginalBtn = document.getElementById('revealOriginal');
const pongModeEl = document.getElementById('pongMode');
const shipModeEl = document.getElementById('curlMode');
const gradModeEl = document.getElementById('gradMode');
const markerSizeInput = document.getElementById('markerSize');
const remoteTiltEl = document.getElementById('remoteTilt');
const acqWeightEl = document.getElementById('acqWeight');
const remoteTiltStatusEl = document.getElementById('remoteTiltStatus');
const localTiltStatusEl = document.getElementById('localTiltStatus');
const emojiNameEl = document.getElementById('emojiName');

// const srcCtx = srcCanvas.getContext('2d');
// const fftCtx = fftCanvas.getContext('2d');
const maskCtx = maskCanvas.getContext('2d');
const fftMaskedCtx = fftMaskedCanvas.getContext('2d');
const reconCtx = reconCanvas.getContext('2d');

// binary mask 0..1, start filled with 0s (black = block all)
const maskData = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0)); // can hold integer weights
maskCtx.fillStyle = '#000000';
maskCtx.fillRect(0, 0, SIZE, SIZE);

function redrawMaskCanvas() { /* unified into spectrum; no direct mask rendering */ }

function attachMaskPainting() {
  let painting = false;
  let erase = false;
  let brush = Math.max(0, Math.floor((markerSizeInput?.value ? parseInt(markerSizeInput.value, 10) : 6) / 2));

  function setMaskAt(x, y, value) {
    const currentBrush = Math.max(0, Math.floor((markerSizeInput?.value ? parseInt(markerSizeInput.value, 10) : 6) / 2));
    for (let yy = -currentBrush; yy <= currentBrush; yy++) {
      for (let xx = -currentBrush; xx <= currentBrush; xx++) {
        const px = x + xx; const py = y + yy;
        if (px >= 0 && px < SIZE && py >= 0 && py < SIZE) {
          if (acqWeightEl && acqWeightEl.checked) {
            const current = maskData[py][px] || 0;
            maskData[py][px] = value ? (current + 1) : 0;
          } else {
            maskData[py][px] = value ? 1 : 0;
          }
        }
      }
    }
  }

  function eventPos(e) {
    const rect = maskCanvas.getBoundingClientRect();
    const cx = Math.floor((e.clientX - rect.left) * (SIZE / rect.width));
    const cy = Math.floor((e.clientY - rect.top) * (SIZE / rect.height));
    return { x: cx, y: cy };
  }

  maskCanvas.addEventListener('contextmenu', e => e.preventDefault());
  maskCanvas.addEventListener('pointerdown', e => {
    painting = true;
    erase = (e.button === 2);
    const { x, y } = eventPos(e);
    setMaskAt(x, y, !erase);
    updateMaskedSpectrum();
  });
  window.addEventListener('pointerup', () => painting = false);
  maskCanvas.addEventListener('pointermove', e => {
    if (!painting) return;
    const { x, y } = eventPos(e);
    setMaskAt(x, y, !erase);
    updateMaskedSpectrum();
  });
}

function pickEmoji() {
  const idx = Math.floor(Math.random() * EMOJIS.length);
  return EMOJIS[idx];
}

function drawEmojiToCanvas(emoji) {
  srcCtx.clearRect(0, 0, SIZE, SIZE);
  srcCtx.fillStyle = '#000000';
  srcCtx.fillRect(0, 0, SIZE, SIZE);
  const fontSize = 56;
  srcCtx.font = `${fontSize}px system-ui, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji`;
  srcCtx.textAlign = 'center';
  srcCtx.textBaseline = 'middle';
  srcCtx.fillText(emoji, SIZE/2, SIZE/2 + 2);
}

function splitChannels(imgData) {
  const r = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const g = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const b = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const d = imgData.data;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4;
      r[y][x] = d[i];
      g[y][x] = d[i+1];
      b[y][x] = d[i+2];
    }
  }
  return { r, g, b };
}

function toComplexRow(row) {
  return row.map(v => ({ real: v, imag: 0 }));
}

function fft2DReal(channel) {
  // Row-wise FFT
  const rows = channel.map(row => FFT.fft(toComplexRow(row)));
  // Column-wise FFT
  const out = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(null));
  for (let x = 0; x < SIZE; x++) {
    const col = new Array(SIZE);
    for (let y = 0; y < SIZE; y++) col[y] = rows[y][x];
    const colFft = FFT.fft(col);
    for (let y = 0; y < SIZE; y++) out[y][x] = colFft[y];
  }
  return out;
}

function fftshift2D(spectrum) {
  const N = SIZE;
  const out = new Array(N).fill(null).map(() => new Array(N).fill(null));
  const h = N >> 1;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const yy = (y + h) & (N - 1);
      const xx = (x + h) & (N - 1);
      out[yy][xx] = spectrum[y][x];
    }
  }
  return out;
}

function ifft2DComplex(spectrum) {
  // inverse of fftshift first (unshift): shift back by N/2
  const N = SIZE; const h = N >> 1;
  const unshift = new Array(N).fill(null).map(() => new Array(N).fill(null));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const yy = (y + h) & (N - 1);
      const xx = (x + h) & (N - 1);
      unshift[y][x] = spectrum[yy][xx];
    }
  }
  // column-wise IFFT then row-wise IFFT (or vice versa)
  // Perform IFFT via conjugate -> FFT -> conjugate / N (1D)
  const N1 = N;
  const cols = new Array(N1).fill(null).map(() => new Array(N1).fill(null));
  for (let x = 0; x < N1; x++) {
    const col = new Array(N1);
    for (let y = 0; y < N1; y++) col[y] = unshift[y][x];
    const conj = col.map(c => ({ real: c.real, imag: -c.imag }));
    const f = FFT.fft(conj);
    const ifftCol = f.map(c => ({ real: c.real / N1, imag: -c.imag / N1 }));
    for (let y = 0; y < N1; y++) cols[y][x] = ifftCol[y];
  }
  const out = new Array(N1).fill(null).map(() => new Array(N1).fill(null));
  for (let y = 0; y < N1; y++) {
    const row = cols[y];
    const conj = row.map(c => ({ real: c.real, imag: -c.imag }));
    const f = FFT.fft(conj);
    const ifftRow = f.map(c => ({ real: c.real / N1, imag: -c.imag / N1 }));
    for (let x = 0; x < N1; x++) out[y][x] = ifftRow[x];
  }
  return out;
}

function magnitudeToImage(rSpec, gSpec, bSpec, useLog, overrideMaxSum, targetAvgSum) {
  const img = maskCtx.createImageData(SIZE, SIZE);
  const d = img.data;
  const magR = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const magG = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const magB = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  let maxSum = overrideMaxSum != null ? overrideMaxSum : 1;

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const r = rSpec[y][x];
      const g = gSpec[y][x];
      const b = bSpec[y][x];
      const mr = Math.hypot(r.real, r.imag);
      const mg = Math.hypot(g.real, g.imag);
      const mb = Math.hypot(b.real, b.imag);
      magR[y][x] = mr;
      magG[y][x] = mg;
      magB[y][x] = mb;
      if (overrideMaxSum == null) {
        const sum = mr + mg + mb;
        if (sum > maxSum) maxSum = sum;
      }
    }
  }

  const scale = (v) => {
    if (maxSum <= 0) return 0;
    if (useLog) {
      const lv = Math.log(1 + v);
      const lmax = Math.log(1 + maxSum);
      return Math.min(255, Math.max(0, Math.round(255 * (lv / lmax))));
    }
    return Math.min(255, Math.max(0, Math.round(255 * (v / maxSum))));
  };

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4;
      d[i]   = scale(magR[y][x]);
      d[i+1] = scale(magG[y][x]);
      d[i+2] = scale(magB[y][x]);
      d[i+3] = 255;
    }
  }

  // Optional brightness match using average of non-zero voxels (sum of RGB)
  if (targetAvgSum != null) {
    let sum = 0, count = 0;
    for (let i = 0; i < d.length; i += 4) {
      const s = d[i] + d[i+1] + d[i+2];
      if (s > 0) { sum += s; count++; }
    }
    const avg = count ? (sum / count) : 0;
    if (avg > 0) {
      const gain = targetAvgSum / avg;
      for (let i = 0; i < d.length; i += 4) {
        d[i]   = Math.max(0, Math.min(255, Math.round(d[i]   * gain)));
        d[i+1] = Math.max(0, Math.min(255, Math.round(d[i+1] * gain)));
        d[i+2] = Math.max(0, Math.min(255, Math.round(d[i+2] * gain)));
      }
    }
  }
  return img;
}

function process() {
  const emoji = pickEmoji();
  // synthesize original image into an offscreen canvas to compute k-space
  const off = document.createElement('canvas'); off.width = SIZE; off.height = SIZE;
  const offCtx = off.getContext('2d');
  offCtx.fillStyle = '#000'; offCtx.fillRect(0,0,SIZE,SIZE);
  offCtx.font = `56px system-ui, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji`;
  offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle';
  offCtx.fillText(emoji, SIZE/2, SIZE/2 + 2);
  const imgData = offCtx.getImageData(0, 0, SIZE, SIZE);
  originalAvgSum = computeAvgNonZeroSumInImageData(imgData);
  const { r, g, b } = splitChannels(imgData);

  const rF = fftshift2D(fft2DReal(r));
  const gF = fftshift2D(fft2DReal(g));
  const bF = fftshift2D(fft2DReal(b));

  // compute original k-space max (sum of magnitudes across RGB)
  originalKspaceMaxSum = 1;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const mr = Math.hypot(rF[y][x].real, rF[y][x].imag);
      const mg = Math.hypot(gF[y][x].real, gF[y][x].imag);
      const mb = Math.hypot(bF[y][x].real, bF[y][x].imag);
      const sum = mr + mg + mb;
      if (sum > originalKspaceMaxSum) originalKspaceMaxSum = sum;
    }
  }

  // pure k-space display removed to save space

  // cache current spectra for masking step
  cachedSpectrum = { rF, gF, bF };
  updateMaskedSpectrum();

  // Hide emoji name by default until reveal button is pressed
  if (emojiNameEl) emojiNameEl.textContent = '';
  lastEmoji = emoji;
}

btn.addEventListener('click', () => {
  // clear mask to black
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      maskData[y][x] = 0;
    }
  }
  redrawMaskCanvas();
  // also reset pong to a new random angle/position
  resetPongState();
  // reset curl/gradient markers to their init positions
  if (shipActive) resetShipState();
  if (typeof gradActive !== 'undefined' && gradActive) { gradX = 0; gradY = 0; }
  if (emojiNameEl) emojiNameEl.textContent = '';
  process();
});
revealOriginalBtn.addEventListener('click', () => {
  for (let y=0;y<SIZE;y++) for (let x=0;x<SIZE;x++) maskData[y][x] = 1;
  updateMaskedSpectrum();
  if (emojiNameEl && lastEmoji) {
    const name = EMOJI_NAMES.get(lastEmoji) || 'Unknown emoji';
    emojiNameEl.textContent = `Name: ${name}`;
  }
});

// --- Pong mode ---
let pongActive = false;
let pongX = 1, pongY = 1; // integer grid coords
let pongDX = 1, pongDY = 1; // integer steps per update (ensure co-prime with 2*SIZE)
let pongSize = parseInt(markerSizeInput?.value || '6', 10);
let pongAnimHandle = null;
let pongFrameCounter = 0; // throttling counter
let pongStepInterval = 8; // step every 8 frames (~8x slower), constant for smoothness

function resetPongState() {
  pongX = Math.floor(Math.random() * (SIZE - pongSize));
  pongY = Math.floor(Math.random() * (SIZE - pongSize));
  // choose odd integer steps (co-prime with 2*SIZE) to diversify angles
  function pickOddMagnitude() { return [1,3][Math.floor(Math.random()*2)]; }
  function pickSignedOdd() { const m = pickOddMagnitude(); return (Math.random()<0.5?-1:1) * m; }
  pongDX = pickSignedOdd();
  pongDY = pickSignedOdd();
  // avoid always-45° paths; if magnitudes equal, nudge dy to a different odd
  if (Math.abs(pongDX) === Math.abs(pongDY)) {
    let newMag;
    do { newMag = pickOddMagnitude(); } while (newMag === Math.abs(pongDY));
    pongDY = (pongDY < 0 ? -newMag : newMag);
  }
  pongFrameCounter = 0;
  // keep constant interval to avoid speed swings across angles
  pongStepInterval = 4;
}

function drawPongOverlay() {
  // re-render masked spectrum as base (no stamping in pong)
  updateMaskedSpectrum();
  // draw marker as a red square overlay
  maskCtx.save();
  maskCtx.fillStyle = '#ff4040';
  maskCtx.globalAlpha = 0.8;
  maskCtx.fillRect(pongX, pongY, pongSize, pongSize);
  maskCtx.restore();
}

function stepPong() {
  // throttle: step only every pongStepInterval frames
  pongFrameCounter = (pongFrameCounter + 1) % pongStepInterval;
  if (pongFrameCounter !== 0) { drawPongOverlay(); return; }
  // move by integer steps
  pongX += pongDX;
  pongY += pongDY;
  // reflect on walls considering marker size
  if (pongX < 0) { pongX = 0; pongDX = -pongDX; }
  if (pongX > SIZE - pongSize) { pongX = SIZE - pongSize; pongDX = -pongDX; }
  if (pongY < 0) { pongY = 0; pongDY = -pongDY; }
  if (pongY > SIZE - pongSize) { pongY = SIZE - pongSize; pongDY = -pongDY; }
  drawPongOverlay();
}

function startPong() {
  if (pongAnimHandle) cancelAnimationFrame(pongAnimHandle);
  pongActive = true;
  const loop = () => {
    if (!pongActive) return;
    stepPong();
    pongAnimHandle = requestAnimationFrame(loop);
  };
  pongAnimHandle = requestAnimationFrame(loop);
}

function stopPong() {
  pongActive = false;
  if (pongAnimHandle) cancelAnimationFrame(pongAnimHandle);
  pongAnimHandle = null;
  redrawMaskCanvas();
}

pongModeEl.addEventListener('change', () => {
  resetPongState();
  // turning on pong disables ship
  if (pongModeEl.checked) { shipModeEl.checked = false; stopShip(); startPong(); }
  else stopPong();
});

// Spacebar to stamp mask at current pong position
window.addEventListener('keydown', (e) => {
  if (!pongActive) return;
  if (e.code === 'Space') {
    e.preventDefault();
    // stamp a white square in mask
    const sx = pongX;
    const sy = pongY;
    for (let yy = 0; yy < pongSize; yy++) {
      for (let xx = 0; xx < pongSize; xx++) {
        const px = sx + xx;
        const py = sy + yy;
        if (px >= 0 && px < SIZE && py >= 0 && py < SIZE) {
          if (acqWeightEl && acqWeightEl.checked) maskData[py][px] = (maskData[py][px] || 0) + 1; else maskData[py][px] = 1;
        }
      }
    }
    redrawMaskCanvas();
    updateMaskedSpectrum();
  }
});

// --- Ship mode (inertial movement) ---
let shipActive = false;
let shipX = 0, shipY = 0;
let shipVX = 0, shipVY = 0;
let shipSize = parseInt(markerSizeInput?.value || '6', 10);
const shipAccel = 0.2;
const shipFriction = 0.99; // 50% lower damping (from 0.98 -> 0.99)
let shipAnimHandle = null;
let keyLeft = false, keyRight = false, keyUp = false, keyDown = false;
let shipFrameCounter = 0;

function resetShipState() {
  const corners = [
    { x: 0, y: 0 },
    { x: SIZE - shipSize, y: 0 },
    { x: 0, y: SIZE - shipSize },
    { x: SIZE - shipSize, y: SIZE - shipSize }
  ];
  const c = corners[Math.floor(Math.random() * corners.length)];
  shipX = c.x;
  shipY = c.y;
  shipVX = 0; shipVY = 0;
  shipFrameCounter = 0;
}

function drawShipOverlay() {
  // render masked spectrum and draw a blue marker overlay; stamping happens in stepShip
  updateMaskedSpectrum();
  maskCtx.save();
  maskCtx.fillStyle = '#40a9ff';
  maskCtx.globalAlpha = 0.9;
  maskCtx.fillRect(Math.round(shipX), Math.round(shipY), shipSize, shipSize);
  maskCtx.restore();
}

function stepShip() {
  // accelerate with arrow keys
  if (keyLeft)  shipVX -= shipAccel;
  if (keyRight) shipVX += shipAccel;
  if (keyUp)    shipVY -= shipAccel;
  if (keyDown)  shipVY += shipAccel;
  // apply friction
  shipVX *= shipFriction;
  shipVY *= shipFriction;
  // move
  shipX += shipVX;
  shipY += shipVY;
  // reflect at walls
  if (shipX < 0) { shipX = 0; shipVX = -shipVX; }
  if (shipX > SIZE - shipSize) { shipX = SIZE - shipSize; shipVX = -shipVX; }
  if (shipY < 0) { shipY = 0; shipVY = -shipVY; }
  if (shipY > SIZE - shipSize) { shipY = SIZE - shipSize; shipVY = -shipVY; }
  // stamp trail into mask
  for (let yy = 0; yy < shipSize; yy++) {
    for (let xx = 0; xx < shipSize; xx++) {
      const px = Math.round(shipX) + xx;
      const py = Math.round(shipY) + yy;
      if (px >= 0 && px < SIZE && py >= 0 && py < SIZE) {
        if (acqWeightEl && acqWeightEl.checked) maskData[py][px] = (maskData[py][px] || 0) + 1; else maskData[py][px] = 1;
      }
    }
  }
  drawShipOverlay();
}

function startShip() {
  if (shipAnimHandle) cancelAnimationFrame(shipAnimHandle);
  resetShipState();
  shipActive = true;
  const loop = () => {
    if (!shipActive) return;
    stepShip();
    shipAnimHandle = requestAnimationFrame(loop);
  };
  shipAnimHandle = requestAnimationFrame(loop);
}

function stopShip() {
  shipActive = false;
  if (shipAnimHandle) cancelAnimationFrame(shipAnimHandle);
  shipAnimHandle = null;
  redrawMaskCanvas();
}

shipModeEl.addEventListener('change', () => {
  // turning on ship disables pong
  if (shipModeEl.checked) { pongModeEl.checked = false; stopPong(); startShip(); }
  else stopShip();
});

// --- Gradient mode (linear position control) ---
let gradActive = false;
let gradX = 0, gradY = 0;
let gradSize = parseInt(markerSizeInput?.value || '6', 10);
const gradStep = 1; // per frame step when key pressed
let gradAnim = null;
let gLeft=false,gRight=false,gUp=false,gDown=false;

function drawGradOverlay(){
  // draw marker overlay (green) on top of current masked spectrum
  updateMaskedSpectrum();
  maskCtx.save();
  maskCtx.fillStyle = '#6be675';
  maskCtx.globalAlpha = 0.9;
  maskCtx.fillRect(Math.round(gradX), Math.round(gradY), gradSize, gradSize);
  maskCtx.restore();
}
function stepGrad(){
  // keyboard
  if (gLeft) gradX -= gradStep;
  if (gRight) gradX += gradStep;
  if (gUp) gradY -= gradStep;
  if (gDown) gradY += gradStep;
  // clamp
  gradX = Math.max(0, Math.min(SIZE - gradSize, gradX));
  gradY = Math.max(0, Math.min(SIZE - gradSize, gradY));
  // stamp trail into mask
  for (let yy=0; yy<gradSize; yy++){
    for (let xx=0; xx<gradSize; xx++){
      const px = Math.round(gradX)+xx, py = Math.round(gradY)+yy;
      if (acqWeightEl && acqWeightEl.checked) maskData[py][px] = (maskData[py][px] || 0) + 1; else maskData[py][px] = 1;
    }
  }
  // then render with overlay marker
  drawGradOverlay();
}
function startGrad(){
  gradActive = true;
  gradX = 0; gradY = 0;
  const loop = ()=>{ if (!gradActive) return; stepGrad(); gradAnim = requestAnimationFrame(loop); };
  gradAnim = requestAnimationFrame(loop);
}
function stopGrad(){ gradActive=false; if (gradAnim) cancelAnimationFrame(gradAnim); gradAnim=null; redrawMaskCanvas(); }

gradModeEl.addEventListener('change', ()=>{
  if (gradModeEl.checked){
    // disable other modes
    pongModeEl.checked = false; stopPong();
    shipModeEl.checked = false; stopShip();
    startGrad();
  } else stopGrad();
});

if (markerSizeInput) markerSizeInput.addEventListener('change', ()=>{
  const v = Math.max(1, Math.min(16, parseInt(markerSizeInput.value || '6', 10)));
  markerSizeInput.value = String(v);
  pongSize = v;
  shipSize = v;
  gradSize = v;
});

window.addEventListener('keydown', (e)=>{
  if (!gradActive) return;
  if (e.code==='ArrowLeft') gLeft=true; else if (e.code==='ArrowRight') gRight=true; else if (e.code==='ArrowUp') gUp=true; else if (e.code==='ArrowDown') gDown=true;
});
window.addEventListener('keyup', (e)=>{
  if (!gradActive) return;
  if (e.code==='ArrowLeft') gLeft=false; else if (e.code==='ArrowRight') gRight=false; else if (e.code==='ArrowUp') gUp=false; else if (e.code==='ArrowDown') gDown=false;
});

// --- Remote tilt integration (optional, non-destructive) ---
let rtWs = null;
let rtPeer = '1';
function setRemoteTiltStatus(t){ if (remoteTiltStatusEl) remoteTiltStatusEl.textContent = t; }
function setLocalTiltStatus(t){ if (localTiltStatusEl) localTiltStatusEl.textContent = t; }
function startRemoteTilt(){
  try { if (rtWs) { rtWs.close(); rtWs = null; } } catch{}
  try {
    const loc = window.location;
    rtWs = new WebSocket(`ws://${loc.hostname}:8765`);
    setRemoteTiltStatus('connecting...');
    rtWs.onopen = () => {
      setRemoteTiltStatus('connected');
      // act as receiver of tilt datachannel surrogate msgs
      rtWs.send(JSON.stringify({ type:'hello', role:'receiver', peer: rtPeer }));
    };
    rtWs.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === 'tilt') {
          const nx = Math.max(-1, Math.min(1, data.nx || 0));
          const ny = Math.max(-1, Math.min(1, data.ny || 0));
          // curl: accelerate; gradient: position step
          if (shipActive) { shipVX += nx * shipAccel * 4; shipVY += ny * shipAccel * 4; }
          if (gradActive) { gradX += nx * 8; gradY += ny * 8; }
        }
      } catch{}
    };
    rtWs.onerror = () => setRemoteTiltStatus('error');
    rtWs.onclose = () => setRemoteTiltStatus('closed');
  } catch(e) { setRemoteTiltStatus('error'); }
}
function stopRemoteTilt(){ try { if (rtWs) rtWs.close(); } catch{} rtWs = null; setRemoteTiltStatus(''); }
if (remoteTiltEl) remoteTiltEl.addEventListener('change', ()=>{ if (remoteTiltEl.checked) startRemoteTilt(); else stopRemoteTilt(); });

// Local tilt detection and handling
let localTiltActive = false;
let localTiltEverFired = false;
let lastLocalSend = 0;
const LOCAL_INTERVAL_MS = 100;
function handleLocalOrientation(e){
  if (!localTiltEverFired) {
    localTiltEverFired = true;
    setLocalTiltStatus('on');
  }
  const now = performance.now();
  if (now - lastLocalSend < LOCAL_INTERVAL_MS) return;
  lastLocalSend = now;
  const beta = e.beta || 0, gamma = e.gamma || 0;
  const nx = Math.max(-1, Math.min(1, gamma / 45));
  const ny = Math.max(-1, Math.min(1, beta / 45));
  if (shipActive) { shipVX += nx * shipAccel * 4; shipVY += ny * shipAccel * 4; }
  if (gradActive) { gradX += nx * 8; gradY += ny * 8; }
}
function startLocalTilt(){
  if (localTiltActive) return;
  localTiltActive = true;
  localTiltEverFired = false;
  setLocalTiltStatus('probing...');
  window.addEventListener('deviceorientation', handleLocalOrientation);
  // Probe for 2 seconds; if no events, turn it back off
  setTimeout(()=>{
    if (!localTiltEverFired) {
      stopLocalTilt();
      setLocalTiltStatus('not available');
    }
  }, 2000);
}
function stopLocalTilt(){
  if (!localTiltActive) return;
  localTiltActive = false;
  // don't override a more specific status set by the probe caller
  window.removeEventListener('deviceorientation', handleLocalOrientation);
}
// auto-start local tilt when available

// Auto-detect mobile + sensor support, suggest enabling
try {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  const hasOrientation = typeof window.DeviceOrientationEvent !== 'undefined';
  if (hasOrientation) {
    // For iOS 13+ permissions
    const needsPerm = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
    if (needsPerm) {
      localTiltStatusEl && (localTiltStatusEl.textContent = 'tap screen to enable');
      const onTap = async () => {
        try {
          const res = await DeviceOrientationEvent.requestPermission();
          if (res === 'granted') { startLocalTilt(); localTiltStatusEl && (localTiltStatusEl.textContent = 'on'); }
          else { localTiltStatusEl && (localTiltStatusEl.textContent = 'denied'); }
        } catch {
          localTiltStatusEl && (localTiltStatusEl.textContent = 'error');
        }
        window.removeEventListener('click', onTap, { once: true });
      };
      window.addEventListener('click', onTap, { once: true });
    } else {
      startLocalTilt();
    }
  } else {
    localTiltStatusEl && (localTiltStatusEl.textContent = 'not available');
  }
} catch{}

// Arrow keys control inertia, space stamps at ship position when active
window.addEventListener('keydown', (e) => {
  if (shipActive) {
    if (e.code === 'ArrowLeft') keyLeft = true;
    else if (e.code === 'ArrowRight') keyRight = true;
    else if (e.code === 'ArrowUp') keyUp = true;
    else if (e.code === 'ArrowDown') keyDown = true;
    else if (e.code === 'Space') {
      e.preventDefault();
      for (let yy = 0; yy < shipSize; yy++) {
        for (let xx = 0; xx < shipSize; xx++) {
          const px = Math.round(shipX) + xx;
          const py = Math.round(shipY) + yy;
          if (px >= 0 && px < SIZE && py >= 0 && py < SIZE) maskData[py][px] = 1;
        }
      }
      redrawMaskCanvas();
      updateMaskedSpectrum();
    }
  }
});

window.addEventListener('keyup', (e) => {
  if (!shipActive) return;
  if (e.code === 'ArrowLeft') keyLeft = false;
  else if (e.code === 'ArrowRight') keyRight = false;
  else if (e.code === 'ArrowUp') keyUp = false;
  else if (e.code === 'ArrowDown') keyDown = false;
});

let cachedSpectrum = null;
let originalAvgSum = 1;
let originalKspaceMaxSum = 1;
let lastEmoji = null;

function applyMaskToSpectrum(spec, mask) {
  const out = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(null));
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const m = mask[y][x];
      const c = spec[y][x];
      out[y][x] = { real: c.real * m, imag: c.imag * m };
    }
  }
  return out;
}

function updateMaskedSpectrum() {
  if (!cachedSpectrum) return;
  const { rF, gF, bF } = cachedSpectrum;
  const rM = applyMaskToSpectrum(rF, maskData);
  const gM = applyMaskToSpectrum(gF, maskData);
  const bM = applyMaskToSpectrum(bF, maskData);
  // Compute reconstruction first to derive shared normalization max from final image
  const rSpatial = ifft2DComplex(rM);
  const gSpatial = ifft2DComplex(gM);
  const bSpatial = ifft2DComplex(bM);

  let maxSum = 1;
  const rVals = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const gVals = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  const bVals = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0));
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const rv = Math.max(0, rSpatial[y][x].real);
      const gv = Math.max(0, gSpatial[y][x].real);
      const bv = Math.max(0, bSpatial[y][x].real);
      rVals[y][x] = rv; gVals[y][x] = gv; bVals[y][x] = bv;
      const sum = rv + gv + bv;
      if (sum > maxSum) maxSum = sum;
    }
  }

  // Render masked k-space using original k-space normalization (keep same scale as image 2)
  const img = magnitudeToImage(rM, gM, bM, true, originalKspaceMaxSum, null);
  fftMaskedCtx.putImageData(img, 0, 0);
  updateReconstructionFromVals(rVals, gVals, bVals, maxSum, originalAvgSum);
}

function clampByte(v) { return Math.max(0, Math.min(255, Math.round(v))); }

function updateReconstructionFromVals(rVals, gVals, bVals, maxSum, targetAvgSum) {
  const img = reconCtx.createImageData(SIZE, SIZE);
  const d = img.data;
  // First map to 0..255 using maxSum
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4;
      d[i]   = maxSum > 0 ? Math.round(255 * (rVals[y][x] / maxSum)) : 0;
      d[i+1] = maxSum > 0 ? Math.round(255 * (gVals[y][x] / maxSum)) : 0;
      d[i+2] = maxSum > 0 ? Math.round(255 * (bVals[y][x] / maxSum)) : 0;
      d[i+3] = 255;
    }
  }
  // Then apply brightness match gain to meet target average sum of non-zero pixels
  if (targetAvgSum != null) {
    let sum = 0, count = 0;
    for (let i = 0; i < d.length; i += 4) {
      const s = d[i] + d[i+1] + d[i+2];
      if (s > 0) { sum += s; count++; }
    }
    const avg = count ? (sum / count) : 0;
    if (avg > 0) {
      const gain = targetAvgSum / avg;
      for (let i = 0; i < d.length; i += 4) {
        d[i]   = Math.max(0, Math.min(255, Math.round(d[i]   * gain)));
        d[i+1] = Math.max(0, Math.min(255, Math.round(d[i+1] * gain)));
        d[i+2] = Math.max(0, Math.min(255, Math.round(d[i+2] * gain)));
      }
    }
  }
  reconCtx.putImageData(img, 0, 0);
}

// Ensure pong mode starts disabled and original is shown
pongModeEl.checked = false;
stopPong();
// removed original checkbox/button state here

attachMaskPainting();
redrawMaskCanvas();
process();

function computeAvgNonZeroSumInImageData(imgData) {
  const d = imgData.data;
  let sum = 0, count = 0;
  for (let i = 0; i < d.length; i += 4) {
    const s = d[i] + d[i+1] + d[i+2];
    if (s > 0) { sum += s; count++; }
  }
  return count ? (sum / count) : 1;
}
