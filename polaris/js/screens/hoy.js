// ═══════════════════════════════════════════
// PANTALLA: HOY
// ═══════════════════════════════════════════

// Usa tus frases propias (del seed) si existen; si no, las genéricas.
function pickPhrase() {
  const arr = (state.customPhrases && state.customPhrases.length) ? state.customPhrases : IDENTITY_PHRASES;
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderHoy() {
  // Day counter
  document.getElementById('day-counter').textContent = 'Día ' + state.day + ' de evolución';
  document.getElementById('season-label').textContent = state.polaris.season || state.season;

  // Identity phrase
  const phrase = pickPhrase();
  document.getElementById('identity-phrase-hoy').textContent = '"' + phrase + '"';

  // Mission
  renderMissionDisplay();

  // Habits
  renderHabits();
}

function updateHoyUI() {
  const li = getCurrentLevelInfo();
  document.getElementById('level-badge').textContent = 'Nv.' + li.level;
  document.getElementById('xp-display').textContent = state.xpTotal + ' XP';
  document.getElementById('daily-xp-display').textContent = state.xpDaily + ' XP hoy';
  const dailyMax = 175;
  document.getElementById('daily-xp-bar').style.width = Math.min(100, Math.round((state.xpDaily / dailyMax) * 100)) + '%';
}

function renderMissionDisplay() {
  const disp = document.getElementById('mission-display');
  if (state.mission) {
    disp.textContent = state.mission;
    disp.style.color = 'var(--text)';
  } else {
    disp.textContent = 'Tocá para definir tu misión de hoy...';
    disp.style.color = 'var(--text3)';
  }
}

function editMission() {
  document.getElementById('mission-display').style.display = 'none';
  document.getElementById('mission-btns').style.display = 'none';
  document.getElementById('mission-edit-area').style.display = 'block';
  document.getElementById('mission-input').value = state.mission;
  document.getElementById('mission-input').focus();
}

function cancelMissionEdit() {
  document.getElementById('mission-display').style.display = '';
  document.getElementById('mission-btns').style.display = '';
  document.getElementById('mission-edit-area').style.display = 'none';
}

function saveMission() {
  const val = document.getElementById('mission-input').value.trim();
  if (!val) return;
  state.mission = val;
  saveState();
  cancelMissionEdit();
  renderMissionDisplay();
}

function renderHabits() {
  const container = document.getElementById('habits-list');
  container.innerHTML = '';
  HABITS.forEach(h => {
    const done = state.habits[h.id] || false;
    const row = document.createElement('div');
    row.className = 'habit-row';
    row.onclick = () => toggleHabit(h.id);
    row.innerHTML = `
      <div class="habit-info">
        <div class="habit-check ${done ? 'done' : ''}" id="hcheck-${h.id}">
          ${done ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <span class="habit-name ${done ? 'done' : ''}">${h.name}</span>
      </div>
      <span class="habit-xp">+${h.xp} XP</span>
    `;
    container.appendChild(row);
  });
}

function toggleHabit(id) {
  const h = HABITS.find(x => x.id === id);
  if (state.habits[id]) {
    // uncheck - don't remove XP for simplicity
    state.habits[id] = false;
  } else {
    state.habits[id] = true;
    addXP(h.xp, h.attr);
  }
  saveState();
  renderHabits();
}

function saveIdentityProof() {
  const val = document.getElementById('identity-proof-input').value.trim();
  if (!val) return;
  state.identityProofList.unshift({ text: val, date: new Date().toLocaleDateString('es-UY') });
  if (state.identityProofList.length > 20) state.identityProofList.pop();
  document.getElementById('identity-proof-input').value = '';
  addXP(10, 'mente');
  saveState();
  alert('✅ Prueba guardada. +10 XP');
}

// ═══════════════════════════════════════════
// NUEVO DÍA
// ═══════════════════════════════════════════

function confirmNewDay() {
  // Archive today
  state.habits = {};
  state.xpDaily = 0;
  state.day++;

  // Streak
  const today = new Date().toDateString();
  if (state.lastActiveDate) {
    const last = new Date(state.lastActiveDate);
    const diff = Math.round((new Date(today) - last) / (1000*60*60*24));
    if (diff <= 1) {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 1;
    }
  } else {
    state.streak = 1;
  }
  state.lastActiveDate = today;

  saveState();
  document.getElementById('newday-modal').classList.remove('active');
  renderHoy();
  updateHoyUI();

  // New identity phrase
  const phrase = pickPhrase();
  document.getElementById('identity-phrase-hoy').textContent = '"' + phrase + '"';
}
