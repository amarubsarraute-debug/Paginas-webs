// ═══════════════════════════════════════════
// PANTALLA: SHADOW MODE
// ═══════════════════════════════════════════

let shadowCurrentStep = 0;

function shadowGoTo(step) {
  document.querySelectorAll('.shadow-step').forEach((el, i) => {
    el.classList.toggle('active', i === step);
  });
  document.querySelectorAll('.step-dot').forEach((el, i) => {
    el.classList.toggle('done', i <= step);
  });
  shadowCurrentStep = step;
  // scroll top
  document.getElementById('screen-shadow').scrollTo(0,0);
}

function selectOption(btn, type) {
  const grid = btn.parentElement;
  grid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  shadowState[type] = btn.textContent;
}

function generateShadowResponse() {
  const fear = shadowState.fear;
  const certainty = shadowState.certainty;
  const emotion = shadowState.emotion;

  let response = '';
  if (fear && SHADOW_RESPONSES.fear[fear]) {
    response = SHADOW_RESPONSES.fear[fear];
  } else if (certainty && SHADOW_RESPONSES.certainty[certainty]) {
    response = SHADOW_RESPONSES.certainty[certainty];
  } else if (emotion && SHADOW_RESPONSES.emotion[emotion]) {
    response = SHADOW_RESPONSES.emotion[emotion];
  } else {
    response = 'La certeza aparece después de actuar, no antes. No necesitás saber si va a funcionar. Necesitás hacer el siguiente paso. Solo el siguiente paso.';
  }

  document.getElementById('shadow-response-text').textContent = response;
  shadowGoTo(5);
}

function saveShadowSession(completed) {
  const session = {
    date: new Date().toLocaleDateString('es-UY'),
    task: shadowState.task || document.getElementById('shadow-task')?.value || '',
    emotion: shadowState.emotion,
    certainty: shadowState.certainty,
    fear: shadowState.fear,
    action: document.getElementById('shadow-action')?.value || '',
    completed,
  };
  state.shadowHistory.unshift(session);
  if (state.shadowHistory.length > 20) state.shadowHistory.pop();
  saveState();
  renderShadowHistory();
}

function renderShadowHistory() {
  const container = document.getElementById('shadow-history');
  if (!state.shadowHistory.length) {
    container.innerHTML = '<p class="text-sm text-dimmer" style="padding:12px 0">No hay sesiones todavía.</p>';
    return;
  }
  container.innerHTML = state.shadowHistory.slice(0,5).map(s => `
    <div class="history-item">
      <div class="history-date">${s.date} · ${s.emotion || '—'} · ${s.fear || '—'}</div>
      <div class="history-text">${s.task || 'Sin descripción'}</div>
      ${s.action ? '<div class="history-text text-accent" style="margin-top:4px">→ ' + s.action + '</div>' : ''}
    </div>
  `).join('');
}

function resetShadow() {
  shadowState = { task:'', emotion:'', certainty:'', fear:'' };
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  if (document.getElementById('shadow-task')) document.getElementById('shadow-task').value = '';
  if (document.getElementById('shadow-action')) document.getElementById('shadow-action').value = '';
  shadowGoTo(0);
}
