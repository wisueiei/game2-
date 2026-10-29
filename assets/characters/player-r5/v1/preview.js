'use strict';

(async () => {
  const byId = id => document.getElementById(id);
  const canvas = byId('stage');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { ready: false, direction: 'front', pose: 'world', walking: false,
    playing: !reducedMotion, step: 0, elapsed: 0, x: 200, y: 156, frame: null, renderedFrames: 0, errors: [] };
  window.__R5Preview = state;
  const keys = new Set();
  let manifest;
  const atlases = new Map();

  function drawFrame(context, name, x, y) {
    const f = manifest.frames[name];
    const [sx, sy, w, h] = f.rect;
    context.imageSmoothingEnabled = false;
    context.drawImage(atlases.get(f.atlas), sx, sy, w, h, Math.round(x - f.pivot[0]), Math.round(y - f.pivot[1]), w, h);
  }

  function makeGallery() {
    for (const [name, f] of Object.entries(manifest.frames)) {
      const fig = document.createElement('figure');
      const cv = document.createElement('canvas');
      cv.width = f.rect[2]; cv.height = f.rect[3];
      const scale = f.role === 'cutscene' ? 3 : 4;
      cv.dataset.maxScale = scale;
      cv.style.width = `${cv.width * scale}px`; cv.style.height = `${cv.height * scale}px`;
      drawFrame(cv.getContext('2d'), name, f.pivot[0], f.pivot[1]);
      const caption = document.createElement('figcaption');
      caption.textContent = `${name} · ${cv.width}×${cv.height}`;
      fig.append(cv, caption);
      byId(f.role === 'world' ? 'walk-gallery' : 'story-gallery').append(fig);
    }
    fitGallery();
  }

  function fitGallery() {
    document.querySelectorAll('figure canvas').forEach(cv => {
      const scale = Math.max(1, Math.min(Number(cv.dataset.maxScale), Math.floor((cv.parentElement.clientWidth - 10) / cv.width)));
      cv.style.width = `${cv.width * scale}px`; cv.style.height = `${cv.height * scale}px`;
    });
  }
  window.addEventListener('resize', fitGallery);

  function setPose(value) {
    state.pose = value; state.elapsed = 0; state.step = 0;
    byId('pose').value = value;
  }

  function animation() {
    if (state.pose === 'world') {
      return state.walking ? manifest.animations[`walk-${state.direction}`] : { frames: [`${state.direction}-idle`], frameDurationMs: 140, loop: true };
    }
    return manifest.animations[state.pose] || { frames: [state.pose], frameDurationMs: 140, loop: false };
  }

  function currentFrame() {
    const a = animation();
    if (!state.playing) return a.frames[state.step % a.frames.length];
    const durations = a.frameDurationsMs || a.frames.map(() => a.frameDurationMs);
    const total = durations.reduce((n, v) => n + v, 0);
    let time = a.loop ? state.elapsed % total : Math.min(state.elapsed, total - .01);
    for (let i = 0; i < durations.length; i++) {
      if (time < durations[i]) { state.step = i; return a.frames[i]; }
      time -= durations[i];
    }
    return a.frames.at(-1);
  }

  function background(type) {
    ctx.fillStyle = type === 'light' ? '#ece8dc' : type === 'ruins' ? '#30263d' : '#10191d';
    ctx.fillRect(0, 0, 400, 225);
    if (type === 'checker') {
      for (let y = 0; y < 225; y += 8) for (let x = 0; x < 400; x += 8) {
        ctx.fillStyle = ((x + y) / 8) % 2 ? '#303647' : '#1c2231'; ctx.fillRect(x, y, 8, 8);
      }
    } else if (type === 'forest') {
      ctx.fillStyle = '#243128'; ctx.fillRect(40, 65, 320, 125);
      ctx.fillStyle = '#303a30'; ctx.fillRect(50, 126, 300, 36);
      ctx.fillStyle = '#365046';
      for (const [x, y] of [[63,93],[104,169],[313,95],[341,164],[71,181]]) {
        ctx.fillRect(x, y, 14, 4); ctx.fillRect(x + 5, y - 5, 4, 14);
      }
    } else if (type === 'ruins') {
      ctx.fillStyle = '#483950'; ctx.fillRect(36, 72, 328, 126);
      ctx.strokeStyle = '#352c40';
      for (let x = 36; x < 365; x += 20) { ctx.beginPath(); ctx.moveTo(x + .5, 72); ctx.lineTo(x + .5, 198); ctx.stroke(); }
      for (let y = 72; y < 199; y += 20) { ctx.beginPath(); ctx.moveTo(36, y + .5); ctx.lineTo(364, y + .5); ctx.stroke(); }
    } else if (type === 'battle') {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 400, 225);
      ctx.strokeStyle = '#e8e8ec'; ctx.lineWidth = 1;
      ctx.strokeRect(76.5, 100.5, 247, 75);
    }
  }

  function render(dt) {
    if (!state.ready) return;
    const dx = Number(keys.has('d') || keys.has('ArrowRight')) - Number(keys.has('a') || keys.has('ArrowLeft'));
    const dy = Number(keys.has('s') || keys.has('ArrowDown')) - Number(keys.has('w') || keys.has('ArrowUp'));
    const moving = state.pose === 'world' && (dx || dy);
    if (moving) {
      state.walking = true;
      state.direction = Math.abs(dx) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'front' : 'back');
      const factor = dt * .07 / Math.hypot(dx, dy);
      state.x = Math.max(20, Math.min(380, state.x + dx * factor));
      state.y = Math.max(40, Math.min(200, state.y + dy * factor));
    }
    if (state.playing) state.elapsed += dt;
    background(byId('background').value);
    const name = currentFrame();
    const battle = byId('background').value === 'battle';
    const x = battle ? 200 : state.x, y = battle ? 151 : state.y;
    drawFrame(ctx, name, x, y);
    if (byId('anchors').checked) {
      ctx.strokeStyle = '#63d2ec'; ctx.strokeRect(Math.round(x) - 6 + .5, Math.round(y) - 6 + .5, 11, 5);
      ctx.fillStyle = '#f079a0'; ctx.fillRect(Math.round(x) - 2, Math.round(y), 5, 1); ctx.fillRect(Math.round(x), Math.round(y) - 2, 1, 5);
    }
    state.renderedFrames++;
    if (state.frame !== name) {
      state.frame = name;
      const f = manifest.frames[name];
      byId('readout').textContent = `${name}  |  ${f.rect[2]}×${f.rect[3]} px  |  pivot ${f.pivot.join(',')}\n18 PNG + 2 atlases · exported / not installed`;
    }
    for (const button of byId('directions').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.dir === state.direction));
    const walkLabel = state.walking ? 'ยืนเฉยๆ' : 'เดินวน';
    if (byId('walk').textContent !== walkLabel) byId('walk').textContent = walkLabel;
  }

  byId('directions').addEventListener('click', e => {
    const dir = e.target.dataset.dir;
    if (!dir || !state.ready) return;
    state.direction = dir; setPose('world');
  });
  byId('walk').addEventListener('click', () => {
    setPose('world'); state.walking = !state.walking;
    byId('walk').textContent = state.walking ? 'ยืนเฉยๆ' : 'เดินวน';
  });
  byId('pause').addEventListener('click', () => {
    state.playing = !state.playing;
    if (state.playing) {
      const a = animation();
      const durations = a.frameDurationsMs || a.frames.map(() => a.frameDurationMs);
      state.elapsed = durations.slice(0, state.step % a.frames.length).reduce((n, v) => n + v, 0);
    }
    byId('pause').textContent = state.playing ? 'หยุดแอนิเมชัน' : 'เล่นแอนิเมชัน';
  });
  byId('step').addEventListener('click', () => {
    state.playing = false; state.step++; byId('pause').textContent = 'เล่นแอนิเมชัน';
  });
  byId('pose').addEventListener('change', e => setPose(e.target.value));
  const inputKey = e => /^Key[WASD]$/.test(e.code) ? e.code.at(-1).toLowerCase() : e.key;
  canvas.addEventListener('keydown', e => {
    const key = inputKey(e);
    if (!['w','a','s','d','ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(key)) return;
    e.preventDefault(); keys.add(key);
  });
  canvas.addEventListener('keyup', e => {
    keys.delete(inputKey(e)); if (!keys.size && state.pose === 'world') state.walking = false;
  });
  canvas.addEventListener('blur', () => { keys.clear(); state.walking = false; });
  window.addEventListener('blur', () => { keys.clear(); state.walking = false; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) keys.clear(); });

  try {
    const response = await fetch('manifest.json');
    if (!response.ok) throw new Error(`Manifest HTTP ${response.status}`);
    manifest = await response.json();
    await Promise.all([...new Set(Object.values(manifest.frames).map(f => f.atlas))].map(async filename => {
      const image = new Image(); image.src = filename; await image.decode(); atlases.set(filename, image);
    }));
    state.ready = true; state.loadedFrames = Object.keys(manifest.frames).length;
    state.atlasSizes = Object.fromEntries([...atlases].map(([name, img]) => [name, [img.naturalWidth, img.naturalHeight]]));
    makeGallery();
    document.querySelectorAll('button:disabled, select:disabled').forEach(el => { el.disabled = false; });
    if (reducedMotion) byId('pause').textContent = 'เล่นแอนิเมชัน';
    let last = performance.now();
    const tick = now => { render(Math.min(100, now - last)); last = now; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  } catch (error) {
    state.errors.push(String(error));
    byId('error').textContent = 'โหลดไม่สำเร็จ: เปิดผ่านเซิร์ฟเวอร์ของโปรเจกต์ (node serve.cjs) ไม่ใช่ file:// — ' + error.message;
  }
})();
