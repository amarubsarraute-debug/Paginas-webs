// ═══════════════════════════════════════════
// TIMER (modo enfoque / acción mínima)
// ═══════════════════════════════════════════

let timerInterval = null;
let timerSeconds = 0;
let timerMode = '';
let timerXP = 0;

function startTimer(minutes, mode) {
  timerSeconds = minutes * 60;
  timerMode = mode;
  timerXP = mode === 'mision' ? 30 : 30;

  document.getElementById('timer-overlay').classList.add('active');
  let modeLabel = 'SHADOW MODE — ACCIÓN MÍNIMA';
  let taskLabel = document.getElementById('shadow-action')?.value || 'Acción mínima';
  if (mode === 'mision') {
    modeLabel = 'MODO ENFOQUE — MISIÓN';
    taskLabel = state.mission || 'Tu misión de hoy';
  } else if (mode === 'visual') {
    modeLabel = 'VISUALIZACIÓN — YO IDEAL';
    taskLabel = (state.ideal && state.ideal.creencias && state.ideal.creencias[0]) || 'Tu yo ideal, ya logrado.';
  }
  document.getElementById('timer-mode-label').textContent = modeLabel;
  document.getElementById('timer-task-label').textContent = taskLabel;
  document.getElementById('timer-complete-btn').style.display = 'none';
  updateTimerDisplay();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById('timer-complete-btn').style.display = 'flex';
      document.getElementById('timer-display').textContent = '¡LISTO!';
      if (typeof notifyTimerDone === 'function') notifyTimerDone(timerMode);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  document.getElementById('timer-display').textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function cancelTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('timer-overlay').classList.remove('active');
}

function completeTimer() {
  cancelTimer();
  if (timerMode === 'mision') {
    addXP(30, 'disciplina');
    addXP(5, 'valor');
  } else if (timerMode === 'shadow') {
    addXP(30, 'valor');
    addXP(10, 'mente');
    state.shadowCount++;
    // save shadow session
    saveShadowSession(true);
    shadowGoTo(0);
    showScreen('shadow');
    alert('🔥 Convertiste procrastinación en evidencia. +40 XP');
  } else if (timerMode === 'visual') {
    addXP(10, 'mente');
    alert('⭐ Visualización completa. Tu cerebro ya lo vio. +10 XP');
  }
}
