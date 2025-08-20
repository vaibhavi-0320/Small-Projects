// Bulletproof single-button Pomodoro
(() => {
  const DEFAULT_SECONDS = 25 * 60;

  let remaining = DEFAULT_SECONDS;
  let running = false;
  let intervalId = null;

  const timeEl = document.getElementById("time");
  const startBtn = document.getElementById("start");

  if (!timeEl || !startBtn) {
    // If you see this in console, your HTML IDs don't match.
    console.error("Missing #time or #start in HTML.");
    return;
  }

  const fmt = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const render = () => { timeEl.textContent = fmt(remaining); };

  const tick = () => {
    if (remaining <= 0) {
      stop();
      startBtn.textContent = "RESET";
      alert("Time's up! Take a break.");
      return;
    }
    remaining -= 1;
    render();
  };

  const start = () => {
    if (running) return;
    running = true;
    startBtn.textContent = "PAUSE";
    intervalId = setInterval(tick, 1000);
  };

  const pause = () => {
    if (!running) return;
    running = false;
    clearInterval(intervalId);
    startBtn.textContent = "RESUME";
  };

  const reset = () => {
    clearInterval(intervalId);
    running = false;
    remaining = DEFAULT_SECONDS;
    startBtn.textContent = "START";
    render();
  };

  const stop = () => {
    clearInterval(intervalId);
    running = false;
  };

  // Single-button behavior
  startBtn.addEventListener("click", () => {
    const label = startBtn.textContent.trim().toUpperCase();
    if (label === "START" || label === "RESUME") start();
    else if (label === "PAUSE") pause();
    else if (label === "RESET") reset();
  });

  // Initial paint
  render();
})();

