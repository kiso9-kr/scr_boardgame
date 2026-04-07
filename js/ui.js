// UI Rendering - 화면 관리 및 렌더링

const PLAYER_COLORS = ['#ff0000', '#0000ff', '#808000', '#008000', '#800080'];
const PLAYER_COLOR_NAMES = ['#ff0000', '#0000ff', '#808000', '#008000', '#800080'];

const SQUARE_ICONS = {
  start: '🚀', goal: '🏆', checkpoint: '⭐', chaos: '🃏', payday: '💰',
  rent: '🏠', food: '🍜', bills: '📄', rest: '😴', money: '💵',
  credit: '⭐', shortcut: '➡️', dice_event: '🎲', moveTo: '↗️'
};

// =============================================
// SCREEN MANAGEMENT
// =============================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// =============================================
// INTRO SCREEN
// =============================================
let selectedPlayerCount = 0;

function updateIntroScreen() {
  document.getElementById('intro-title').textContent = t('intro_title');
  document.getElementById('intro-text').innerHTML = t('intro_text');
  document.getElementById('label-language').textContent = t('select_language');
  document.getElementById('label-players').textContent = t('select_players');
  document.getElementById('btn-start').textContent = t('start_game');

  document.querySelectorAll('#player-buttons .btn').forEach(btn => {
    const count = btn.getAttribute('data-count');
    btn.textContent = count + t('players_suffix');
  });
}

function selectLanguage(lang) {
  setLanguage(lang);
  document.querySelectorAll('#language-buttons .btn').forEach(b => b.classList.remove('selected'));
  document.querySelector(`#language-buttons [data-lang="${lang}"]`).classList.add('selected');
  updateIntroScreen();
}

function selectPlayerCount(count) {
  selectedPlayerCount = count;
  document.querySelectorAll('#player-buttons .btn').forEach(b => b.classList.remove('selected'));
  document.querySelector(`#player-buttons [data-count="${count}"]`).classList.add('selected');
  document.getElementById('btn-start').disabled = false;
}

function goToPathSelect() {
  if (!selectedPlayerCount) return;
  renderPathSelect();
  showScreen('path-screen');
}

// =============================================
// PATH SELECT SCREEN
// =============================================
let pathChoices = {};
let playerNames = {};

function renderPathSelect() {
  const container = document.getElementById('path-selection');
  container.innerHTML = '';
  document.getElementById('path-title').textContent = t('choose_path');
  document.getElementById('path-subtitle').textContent = t('choose_path_subtitle');
  document.getElementById('btn-confirm-path').textContent = t('confirm_path');

  for (let i = 0; i < selectedPlayerCount; i++) {
    const div = document.createElement('div');
    div.className = 'player-path-choice animate-in';
    div.style.animationDelay = (i * 0.1) + 's';
    div.innerHTML = `
      <div class="player-name-row">
        <span class="player-color-dot" style="background: ${PLAYER_COLORS[i]}"></span>
        <input class="player-name-input" id="name-input-${i}"
          type="text" maxlength="12"
          placeholder="${t('player_label')} ${i + 1}"
          oninput="updatePlayerName(${i})"
          style="border-color: ${PLAYER_COLORS[i]}">
      </div>
      <div class="path-btn-group">
        <button class="btn" onclick="selectPath(${i}, 'artist')" id="path-artist-${i}">
          🎵 ${t('artist_path')}<br><small style="font-family: 'Noto Sans KR'; font-size:0.8em;">+50💵 +1C</small>
        </button>
        <button class="btn" onclick="selectPath(${i}, 'industry')" id="path-industry-${i}">
          🏢 ${t('industry_path')}<br><small style="font-family: 'Noto Sans KR'; font-size:0.8em;">+150💵 +2C</small>
        </button>
      </div>
    `;
    container.appendChild(div);
  }
}

function updatePlayerName(i) {
  const val = document.getElementById(`name-input-${i}`).value.trim();
  playerNames[i] = val;
}

function getPlayerName(i) {
  return (playerNames[i] && playerNames[i].trim()) || `${t('player_label')} ${i + 1}`;
}

function selectPath(playerIndex, path) {
  pathChoices[playerIndex] = path;
  document.getElementById(`path-artist-${playerIndex}`).classList.toggle('selected', path === 'artist');
  document.getElementById(`path-industry-${playerIndex}`).classList.toggle('selected', path === 'industry');

  const allChosen = Object.keys(pathChoices).length === selectedPlayerCount;
  document.getElementById('btn-confirm-path').disabled = !allChosen;
}

function confirmPaths() {
  initGame(selectedPlayerCount, pathChoices);
  showHowToPlay();
}

// =============================================
// HOW TO PLAY CARDS
// =============================================
let currentCardIndex = 0;
const TOTAL_CARDS = 6;

function showHowToPlay() {
  currentCardIndex = 0;
  renderHowToPlayCard();
  document.getElementById('howtoplay-overlay').classList.add('active');
}

function renderHowToPlayCard() {
  const cardKeys = ['card1_text', 'card2_text', 'card3_text', 'card4_text', 'card5_text', 'card6_text'];
  const titles = [
    t('how_to_play'),
    getLanguage() === 'ko' ? '커뮤니티 크레딧 vs 돈' : 'Community Credits vs Money',
    getLanguage() === 'ko' ? '크레딧 전환' : 'Credit Conversion',
    getLanguage() === 'ko' ? '게임판 소개' : 'About the Board',
    'Out of Money',
    getLanguage() === 'ko' ? '게임 종료' : 'End of Game'
  ];

  document.getElementById('card-number').textContent = `${currentCardIndex + 1} / ${TOTAL_CARDS}`;
  document.getElementById('howtoplay-title').textContent = titles[currentCardIndex];
  document.getElementById('howtoplay-text').innerHTML = t(cardKeys[currentCardIndex]);

  // Chaos info button only on card 1
  const chaosContainer = document.getElementById('chaos-info-btn-container');
  if (currentCardIndex === 0) {
    chaosContainer.innerHTML = `<button class="btn btn-pink" onclick="showChaosInfo()" style="white-space: nowrap;">${t('view_chaos_info')}</button>`;
  } else {
    chaosContainer.innerHTML = '';
  }

  // Close (X) button: only shown before game starts
  const closeBtn = document.getElementById('btn-close-howtoplay');
  if (closeBtn) {
    const inGame = typeof gameState !== 'undefined' && gameState.phase === 'playing';
    closeBtn.style.display = inGame ? 'none' : '';
  }

  document.getElementById('btn-prev-card').textContent = t('prev_card');
  document.getElementById('btn-prev-card').style.display = currentCardIndex > 0 ? '' : 'none';

  const skipBtn = document.getElementById('btn-skip-howtoplay');
  skipBtn.textContent = t('skip');
  skipBtn.style.display = currentCardIndex < TOTAL_CARDS - 1 ? '' : 'none';

  const nextBtn = document.getElementById('btn-next-card');
  if (currentCardIndex < TOTAL_CARDS - 1) {
    nextBtn.textContent = t('next_card');
    nextBtn.onclick = nextCard;
  } else {
    nextBtn.innerHTML = t('lets_play');
    nextBtn.onclick = closeHowToPlay;
  }
}

function nextCard() {
  if (currentCardIndex < TOTAL_CARDS - 1) {
    currentCardIndex++;
    renderHowToPlayCard();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    renderHowToPlayCard();
  }
}

function closeHowToPlay() {
  document.getElementById('howtoplay-overlay').classList.remove('active');
  if (typeof gameState !== 'undefined' && gameState.phase === 'playing') return;
  showScreen('game-screen');
  startGame();
}

function goBackFromHowToPlay() {
  if (typeof gameState !== 'undefined' && gameState.phase === 'playing') return;
  document.getElementById('howtoplay-overlay').classList.remove('active');
  showScreen('path-screen');
}

function showChaosInfo() {
  document.getElementById('chaosinfo-text').innerHTML = t('chaos_info_text');
  document.getElementById('chaosinfo-overlay').querySelector('.popup-nav .btn').textContent = t('close');
  document.getElementById('chaosinfo-overlay').classList.add('active');
}

function closeChaosInfo() {
  document.getElementById('chaosinfo-overlay').classList.remove('active');
}

// =============================================
// GAME BOARD RENDERING (image-based)
// =============================================

// 플레이어별 토큰 오프셋 (같은 칸에 여러 명 있을 때 겹치지 않게)
const TOKEN_OFFSETS = [
  { dx: -12, dy: -12 },
  { dx:  12, dy: -12 },
  { dx: -12, dy:  12 },
  { dx:  12, dy:  12 },
  { dx:   0, dy:   0 },
];

function renderBoard() {
  const boardArea = document.getElementById('board-area');

  // 이미지 래퍼가 없으면 처음 한 번만 생성
  if (!document.getElementById('board-img-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.id = 'board-img-wrapper';
    wrapper.style.cssText = 'position: relative; height: 100%; line-height: 0;';

    const img = document.createElement('img');
    img.id = 'board-img';
    img.src = 'assets/map.png';
    img.style.cssText = 'display: block; height: 100%; width: auto;';
    img.onload = placeTokens;

    wrapper.appendChild(img);
    boardArea.insertBefore(wrapper, boardArea.firstChild);
  }

  placeTokens();
}

function placeTokens() {
  const wrapper = document.getElementById('board-img-wrapper');
  const img = document.getElementById('board-img');
  if (!wrapper || !img || !img.complete || !img.naturalWidth) return;
  if (typeof SQUARE_POSITIONS === 'undefined') return;

  const scaleX = img.offsetWidth  / img.naturalWidth;
  const scaleY = img.offsetHeight / img.naturalHeight;

  // Set game-header and game-main width to match board + right panel (desktop only)
  // Uses board-area's actual offsetWidth (respects CSS max-width) so right panel is never clipped
  if (window.innerWidth > 768) {
    const boardArea = document.querySelector('.board-area');
    const rightPanel = document.querySelector('.right-panel');
    const boardW = boardArea ? boardArea.offsetWidth : img.offsetWidth;
    const panelW = rightPanel ? rightPanel.offsetWidth : 234;
    const totalW = boardW + 4 + panelW;
    const gameHeader = document.querySelector('.game-header');
    const gameMain   = document.querySelector('.game-main');
    if (gameHeader) gameHeader.style.width = totalW + 'px';
    if (gameMain)   gameMain.style.width   = totalW + 'px';
  } else {
    const gameHeader = document.querySelector('.game-header');
    const gameMain   = document.querySelector('.game-main');
    if (gameHeader) gameHeader.style.width = '';
    if (gameMain)   gameMain.style.width   = '';
  }

  gameState.players.forEach((player, pi) => {
    let token = document.getElementById(`token-p${pi}`);

    // 게임 끝난 플레이어는 숨김
    if (player.finished) {
      if (token) token.style.display = 'none';
      return;
    }

    // 토큰 없으면 생성
    if (!token) {
      token = document.createElement('div');
      token.id = `token-p${pi}`;
      token.className = `player-token p${pi}`;
      token.title = `${t('player_label')} ${pi + 1}`;
      wrapper.appendChild(token);
    }
    token.style.display = 'block';

    const squareId = player.currentPath[player.pathIndex];
    const pos = SQUARE_POSITIONS[squareId];
    if (!pos) return;

    const off = TOKEN_OFFSETS[pi] || { dx: 0, dy: 0 };
    token.style.left = (pos.x * scaleX + off.dx) + 'px';
    token.style.top  = (pos.y * scaleY + off.dy) + 'px';
  });

  // Sync spotlight ring AFTER token positions are updated
  const ring = document.getElementById('board-spotlight-ring');
  if (ring && ring.classList.contains('active')) {
    const movingToken = document.getElementById(`token-p${gameState.currentPlayerIndex}`);
    if (movingToken && movingToken.classList.contains('moving')) {
      ring.style.left = movingToken.style.left;
      ring.style.top  = movingToken.style.top;
    }
  }
}

// =============================================
// PLAYER INFO PANEL
// =============================================
function renderPlayerPanel() {
  const panel = document.getElementById('side-panel');
  panel.innerHTML = '';

  gameState.players.forEach((player, i) => {
    const card = document.createElement('div');
    card.className = 'player-info-card';
    if (i === gameState.currentPlayerIndex) card.classList.add('active-player');

    const jobName = player.job
      ? (getLanguage() === 'ko' ? player.job.name_ko : player.job.name)
      : t('no_job');

    let status = '';
    if (player.finished) status = ` ${t('finished')}`;
    else if (player.resting) status = ` ${t('resting')}`;

    const lang = getLanguage();
    const musicSkillInline = player.initialPath === 'artist'
      ? ` <span class="${player.masteredMusic ? 'music-skill-on' : 'music-skill-off'}">` +
        `(🎸 ${player.masteredMusic ? (lang === 'ko' ? '보유 ✔' : '✔') : (lang === 'ko' ? '미보유' : 'No skill')})</span>`
      : '';
    const heldCardsHtml = player.heldCards.length > 0
      ? `<div class="held-cards">${player.heldCards.map(c => `<span class="held-card-badge">${lang === 'ko' ? c.name_ko : c.name}</span>`).join('')}</div>`
      : '';

    card.innerHTML = `
      <div class="player-header">
        <span class="player-name">
          <span class="player-color" style="background: ${PLAYER_COLOR_NAMES[i]}"></span>
          ${getPlayerName(i)}${status}
        </span>
        <span style="font-size: 0.7em; color: ${PLAYER_COLOR_NAMES[i]}">
          ${player.initialPath === 'artist' ? '🎵' : '🏢'}
        </span>
      </div>
      <div class="player-stats">
        <div class="stat">
          <span class="stat-label">${t('money_label')}</span>
          <span class="stat-value money">${player.money}</span>
        </div>
        <div class="stat">
          <span class="stat-label">${t('credit_label')}</span>
          <span class="stat-value credit">${player.credits}C</span>
        </div>
        <div class="stat" style="grid-column: 1 / -1;">
          <span class="stat-label">${t('job_label')}</span>
          <span class="stat-value">${jobName}${musicSkillInline}</span>
        </div>
        <div class="stat">
          <span class="stat-label">${t('loans_label')}</span>
          <span class="stat-value" style="color: ${player.loans.length > 0 ? '#ff4444' : 'inherit'}">
            ${player.loans.length > 0 ? player.loans.length + ' (' + player.loans.reduce((a, b) => a + b, 0) + ')' : '0'}
          </span>
        </div>
      </div>
      ${heldCardsHtml}
    `;

    panel.appendChild(card);
  });
}

// =============================================
// TURN INDICATOR
// =============================================
function updateTurnIndicator() {
  const player = gameState.players[gameState.currentPlayerIndex];
  const indicator = document.getElementById('turn-indicator');
  indicator.innerHTML = `<span style="color: ${PLAYER_COLOR_NAMES[gameState.currentPlayerIndex]}">
    ${getPlayerName(gameState.currentPlayerIndex)}${t('current_turn')}
  </span>`;
}

// =============================================
// ACTION BUTTONS
// =============================================
function renderActionButtons(options) {
  const container = document.getElementById('action-buttons');
  container.innerHTML = '';

  if (options.rollDice) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-green';
    btn.textContent = t('roll_dice');
    btn.onclick = () => handleRollDice();
    container.appendChild(btn);
  }

  if (options.takeLoan) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-yellow';
    btn.textContent = t('take_loan');
    btn.onclick = () => handleTakeLoan();
    container.appendChild(btn);
  }

  if (options.endTurn) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = t('end_turn');
    btn.onclick = () => endTurn();
    container.appendChild(btn);
  }

  // Show usable held cards
  const player = gameState.players[gameState.currentPlayerIndex];
  if (options.showHeldCards && player.heldCards.length > 0) {
    player.heldCards.forEach((card, idx) => {
      if (card.action === 'shield') {
        const btn = document.createElement('button');
        btn.className = 'btn btn-purple';
        btn.style.borderColor = 'var(--neon-purple)';
        btn.style.color = 'var(--neon-purple)';
        btn.textContent = t('use_shield');
        btn.onclick = () => useHeldCard(idx, 'shield');
        container.appendChild(btn);
      }
    });
  }
}

// =============================================
// DICE DISPLAY
// =============================================
function animateDice(callback) {
  const dice = document.getElementById('dice-display');
  dice.classList.add('rolling');
  let count = 0;
  const interval = setInterval(() => {
    dice.textContent = Math.floor(Math.random() * 6) + 1;
    count++;
    if (count > 15) {
      clearInterval(interval);
      dice.classList.remove('rolling');
      const result = rollDice();
      dice.textContent = result;
      setTimeout(() => callback(result), 300);
    }
  }, 80);
}

// =============================================
// EVENT POPUP
// =============================================
function showEventPopup(title, text, flavor, buttons) {
  document.getElementById('event-title').textContent = title;
  document.getElementById('event-text').textContent = text;
  document.getElementById('event-flavor').textContent = flavor || '';
  document.getElementById('event-flavor').style.display = flavor ? 'block' : 'none';

  const cardImg = document.getElementById('event-card-img');
  const popup = document.getElementById('event-popup');
  if (_pendingEventImage) {
    cardImg.src = _pendingEventImage;
    cardImg.style.display = 'block';
    popup.classList.add('has-card-img');
    // 이미지 로드 후 팝업 너비를 카드 비율에 맞게 조정
    const setSizeFromImg = () => {
      if (!cardImg.naturalWidth) return;
      const ratio = cardImg.naturalWidth / cardImg.naturalHeight;
      const imgH = Math.min(cardImg.naturalHeight, window.innerHeight * 0.54);
      const imgW = Math.round(imgH * ratio);
      popup.style.width = Math.max(imgW + 32, 240) + 'px';
    };
    if (cardImg.complete && cardImg.naturalWidth) {
      setSizeFromImg();
    } else {
      cardImg.onload = setSizeFromImg;
    }
    _pendingEventImage = null;
  } else {
    cardImg.style.display = 'none';
    popup.classList.remove('has-card-img');
    popup.style.width = '';
  }

  const btnContainer = document.getElementById('event-buttons');
  btnContainer.innerHTML = '';

  buttons.forEach(b => {
    const btn = document.createElement('button');
    btn.className = `btn ${b.class || ''}`;
    btn.textContent = b.text;
    btn.onclick = () => {
      hideEventPopup();
      if (b.action) b.action();
    };
    btnContainer.appendChild(btn);
  });

  document.getElementById('event-backdrop').classList.add('active');
  popup.classList.add('active');
}

function hideEventPopup() {
  const popup = document.getElementById('event-popup');
  document.getElementById('event-backdrop').classList.remove('active');
  popup.classList.remove('active');
  popup.classList.remove('has-card-img');
  popup.style.width = '';
}

// =============================================
// JOB SELECTION OVERLAY (lantern effect)
// =============================================
function showJobSelection(availableJobs, callback) {
  const lang = getLanguage();

  const overlay = document.createElement('div');
  overlay.className = 'job-select-overlay';

  const title = document.createElement('div');
  title.className = 'job-select-title pixel-font';
  title.textContent = t('choose_job');
  overlay.appendChild(title);

  const row = document.createElement('div');
  row.className = 'job-cards-row';
  overlay.appendChild(row);

  const descPanel = document.createElement('div');
  descPanel.className = 'job-desc-panel';
  overlay.appendChild(descPanel);

  let locked = false;
  // Touch devices: use click-only (no hover) to prevent flickering from synthesized mouse events
  const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);

  availableJobs.forEach((job, i) => {
    const card = document.createElement('div');
    card.className = 'job-card-item';
    card.style.animationDelay = (i * 140) + 'ms';

    const imgSrc = getJobCardImage(job.id);
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'job-card-img';
      card.appendChild(img);
    } else {
      const fallback = document.createElement('div');
      fallback.className = 'job-card-name-fallback';
      fallback.textContent = lang === 'ko' ? (job.name_ko || job.name) : job.name;
      card.appendChild(fallback);
    }

    if (job.locked) {
      card.classList.add('job-locked');
      if (!isTouch) {
        card.addEventListener('mouseenter', () => {
          if (locked) return;
          _showJobDescPanel(job, card, descPanel, lang, false, null, true);
        });
        card.addEventListener('mouseleave', () => {
          if (locked) return;
          descPanel.classList.remove('visible');
        });
      }
      card.addEventListener('click', () => {
        if (locked) return;
        _showJobDescPanel(job, card, descPanel, lang, true, null, true);
      });
    } else {
      if (!isTouch) {
        card.addEventListener('mouseenter', () => {
          if (locked) return;
          _showJobDescPanel(job, card, descPanel, lang, false, null, false);
        });
        card.addEventListener('mouseleave', () => {
          if (locked) return;
          descPanel.classList.remove('visible');
        });
      }
      card.addEventListener('click', () => {
        if (locked) return;
        locked = true;

        // Dim other cards, keep selected lit
        row.querySelectorAll('.job-card-item').forEach(c => {
          if (c !== card) c.classList.add('dimmed-out');
        });
        card.classList.add('selected-card');

        // Show description with confirm button
        _showJobDescPanel(job, card, descPanel, lang, true, () => {
          overlay.classList.add('fade-out');
          setTimeout(() => {
            overlay.remove();
            callback(job);
          }, 420);
        }, false);
      });
    }

    row.appendChild(card);
  });

  // Spotlight follows cursor
  overlay.addEventListener('mousemove', e => {
    overlay.style.setProperty('--spotlight-x', e.clientX + 'px');
    overlay.style.setProperty('--spotlight-y', e.clientY + 'px');
  });

  // Click outside cards/panel while locked → reset selection
  overlay.addEventListener('click', e => {
    if (!locked) return;
    if (e.target.closest('.job-card-item') || e.target.closest('.job-desc-panel') || e.target.closest('.job-select-title')) return;
    locked = false;
    row.querySelectorAll('.job-card-item').forEach(c => {
      c.classList.remove('dimmed-out', 'selected-card');
    });
    descPanel.classList.remove('visible');
  });

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function _showJobDescPanel(job, cardEl, panel, lang, withConfirm, confirmCb, isLocked) {
  const rect = cardEl.getBoundingClientRect();
  const name = lang === 'ko' ? (job.name_ko || job.name) : job.name;
  const desc = lang === 'ko' ? job.description_ko : job.description_en;

  const respectHTML = job.respectBonus > 0
    ? `<div class="jdp-bonus">+${job.respectBonus}C ${lang === 'ko' ? '(게임 종료 시)' : '(at end)'}</div>`
    : '';
  const descHTML = desc ? `<div class="jdp-desc">${desc}</div>` : '';
  let confirmHTML = '';
  if (withConfirm) {
    if (isLocked) {
      confirmHTML = `<div class="jdp-locked-label">${lang === 'ko' ? '선택 불가!' : 'Not Available!'}</div>`;
    } else {
      confirmHTML = `<button class="btn btn-pink jdp-confirm" id="_jdp_btn">${lang === 'ko' ? '이 직업 선택하기!' : 'Choose this job!'}</button>`;
    }
  }

  panel.innerHTML = `
    <div class="jdp-name">${name}</div>
    ${respectHTML}
    ${descHTML}
    <div class="jdp-grades">
      <div><span class="grade-a">A</span>💰${job.grades.A.salary} / 🏠${job.grades.A.rent}</div>
      <div><span class="grade-b">B</span>💰${job.grades.B.salary} / 🏠${job.grades.B.rent}</div>
      <div><span class="grade-c">C</span>💰${job.grades.C.salary} / 🏠${job.grades.C.rent}</div>
    </div>
    ${confirmHTML}
  `;

  if (withConfirm && !isLocked && confirmCb) {
    document.getElementById('_jdp_btn').addEventListener('click', confirmCb);
  }

  if (window.innerWidth <= 768) {
    // Mobile: bottom sheet, centered
    panel.style.left = '5%';
    panel.style.top  = '';
    panel.style.width = '90%';
    panel.classList.remove('from-right');
  } else {
    // Desktop: position beside the card
    const panelW = 215;
    const margin = 14;
    let left = rect.right + margin;
    let fromRight = false;
    if (left + panelW > window.innerWidth - 10) {
      left = rect.left - panelW - margin;
      fromRight = true;
    }
    let top = Math.max(10, rect.top - 10);
    if (top + 280 > window.innerHeight) top = window.innerHeight - 290;

    panel.style.left = left + 'px';
    panel.style.top  = top  + 'px';
    panel.style.width = '';
    panel.classList.toggle('from-right', fromRight);
  }

  panel.classList.add('visible');
}

// =============================================
// PLAYER SELECTION POPUP
// =============================================
function showPlayerSelection(excludeIndex, callback) {
  const title = t('choose_player');
  const btnContainer = document.getElementById('event-buttons');
  btnContainer.innerHTML = '';

  document.getElementById('event-title').textContent = title;
  document.getElementById('event-text').textContent = '';
  document.getElementById('event-flavor').style.display = 'none';

  gameState.players.forEach((p, i) => {
    if (i === excludeIndex) return;
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.borderColor = PLAYER_COLOR_NAMES[i];
    btn.style.color = PLAYER_COLOR_NAMES[i];
    btn.textContent = `${t('player_label')} ${i + 1}`;
    btn.onclick = () => {
      hideEventPopup();
      callback(i);
    };
    btnContainer.appendChild(btn);
  });

  document.getElementById('event-backdrop').classList.add('active');
  document.getElementById('event-popup').classList.add('active');
}

// =============================================
// GAME OVER SCREEN
// =============================================
function renderGameOver(rankings) {
  showScreen('gameover-screen');

  document.getElementById('gameover-title').textContent = t('game_over');
  const lang = getLanguage();

  const winner = rankings[0];
  document.getElementById('winner-name').textContent =
    `🏆 ${t('player_label')} ${winner.playerIndex + 1} - ${t('winner')}! 🏆`;

  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'score-row header';
  header.innerHTML = `
    <span>#</span>
    <span>${t('player_label')}</span>
    <span>${t('job_label')}</span>
    <span>${t('money_label')}</span>
    <span>${t('money_to_credit')}</span>
    <span>${t('respect_bonus')}</span>
    <span>${t('total_credits')}</span>
  `;
  scoreboard.appendChild(header);

  rankings.forEach((r, i) => {
    const row = document.createElement('div');
    row.className = `score-row ${i === 0 ? 'winner-row' : ''}`;
    const jobName = r.job ? (lang === 'ko' ? r.job.name_ko : r.job.name) : '-';
    row.innerHTML = `
      <span class="rank">${i + 1}</span>
      <span style="color: ${PLAYER_COLOR_NAMES[r.playerIndex]}">
        ${t('player_label')} ${r.playerIndex + 1}
      </span>
      <span>${jobName}</span>
      <span>${r.finalMoney}</span>
      <span>+${r.moneyToCredit}C</span>
      <span>+${r.respectBonus}C</span>
      <span style="color: var(--neon-yellow); font-weight: 700;">${r.totalCredits}C</span>
    `;
    scoreboard.appendChild(row);
  });

  // Play again button
  const playAgainBtn = document.querySelector('#gameover-screen .btn');
  playAgainBtn.textContent = t('play_again');
}

// =============================================
// FULL UI REFRESH
// =============================================
function refreshGameUI() {
  updateTurnIndicator();
  renderBoard();
  renderPlayerPanel();
}

// =============================================
// CARD IMAGE POPUP
// =============================================
const JOB_CARD_IMAGES = {
  'mc':                'assets/job_MC.png',
  'dj_respect':        'assets/job_DJ1.png',
  'dj_dice':           'assets/job_DJ2.png',
  'live_musician':     'assets/job_LIVE MUSICION.png',
  'music_producer':    'assets/job_MUSIC PRODUCER.png',
  'radio_boss':        'assets/job_RADIO BOSS.png',
  'label_owner':       'assets/job_LABEL OWNER.png',
  'club_owner':        'assets/job_CLUB OWNER.png',
  'party_promoter':    'assets/job_PARTY PROMOTER.png',
  'record_shop_owner': 'assets/job_RECORD SHOP OWNER.png',
};

const CHAOS_CARD_IMAGES = {
  'communityCollab': 'assets/chaos_COMMUNITY COLLAB.png',
  'doubleSalary':    'assets/chaos_DOUBLE SALARY.png',
  'lifeSwap':        'assets/chaos_LIFE SWAP.png',
  'tax':             'assets/chaos_TAX.png',
  'hoisik':          'assets/chaos_HOISIK.png',
  'shield':          'assets/chaos_SHIELD.png',
  'sponsorship_150': 'assets/chaos_SPONSORSHIP1.png',
  'sponsorship_100': 'assets/chaos_SPONSORSHIP2.png',
  'sponsorship_50':  'assets/chaos_SPONSORSHIP3.png',
  'sceneDate':       'assets/chaos_SCENE DATE.png',
  'merchCollab':     'assets/chaos_MERCH COLLAB.png',
  'investment':      'assets/chaos_INVESTMENT.png',
  'noraeband':       'assets/chaos_NORAEBANG.png',
  'danceClub':       'assets/chaos_DANCE CLUB.png',
  'moneyDispute':    'assets/chaos_MONEY DISPUTE.png',
  'gotCanceled':     'assets/chaos_GOT CANCELED.png',
  'newEvent':        'assets/chaos_NEW EVENT.png',
  'donation':        'assets/chaos_DONATION.png',
};

function getJobCardImage(jobId) {
  return JOB_CARD_IMAGES[jobId] || null;
}

function getChaosCardImage(card) {
  if (card.action === 'sponsorship') return CHAOS_CARD_IMAGES[card.id] || null;
  return CHAOS_CARD_IMAGES[card.action] || null;
}

let _pendingEventImage = null;

function setEventCardImage(src) {
  _pendingEventImage = src;
}

let _cardImgCallback = null;

function showCardImagePopup(imageSrc, callback) {
  if (!imageSrc) { callback(); return; }
  _cardImgCallback = callback;
  document.getElementById('card-img-display').src = imageSrc;
  document.getElementById('card-img-backdrop').classList.add('active');
  document.getElementById('card-img-popup').classList.add('active');
}

function hideCardImagePopup() {
  document.getElementById('card-img-backdrop').classList.remove('active');
  document.getElementById('card-img-popup').classList.remove('active');
  if (_cardImgCallback) {
    const cb = _cardImgCallback;
    _cardImgCallback = null;
    cb();
  }
}

// =============================================
// MOVING SPOTLIGHT
// =============================================
function showMovingSpotlight(playerIndex) {
  const wrapper = document.getElementById('board-img-wrapper');
  const token   = document.getElementById(`token-p${playerIndex}`);
  if (!wrapper || !token) return;

  let ring = document.getElementById('board-spotlight-ring');
  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'board-spotlight-ring';
    wrapper.appendChild(ring);
  }
  ring.style.left = token.style.left;
  ring.style.top  = token.style.top;
  ring.classList.add('active');
}

function hideMovingSpotlight() {
  const ring = document.getElementById('board-spotlight-ring');
  if (ring) ring.classList.remove('active');
}

// =============================================
// FANFARE SOUND (Web Audio API)
// =============================================
function playFanfare() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    const durations = [0.12, 0.12, 0.12, 0.4];
    let time = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);
      osc.start(time);
      osc.stop(time + durations[i]);
      time += durations[i] * 0.85;
    });
  } catch (e) { /* Web Audio not supported */ }
}

// =============================================
// FANFARE BANNER OVERLAY
// =============================================
function showFanfareBanner(text) {
  const banner = document.createElement('div');
  banner.className = 'fanfare-banner';
  banner.innerHTML = `<span class="fanfare-icon">🎉</span><span class="fanfare-text">${text}</span><span class="fanfare-icon">🎉</span>`;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('fanfare-banner-out'), 1800);
  banner.addEventListener('animationend', (e) => {
    if (e.animationName === 'fanfareOut') banner.remove();
  });
}

// =============================================
// FIREWORKS
// =============================================
function showFireworks() {
  const colors = ['#ffff00', '#ff44ff', '#44ffff', '#ff8800', '#44ff88', '#ff4444', '#ffffff'];
  const bursts = 7;
  for (let b = 0; b < bursts; b++) {
    setTimeout(() => {
      const x = 15 + Math.random() * 70;
      const y = 10 + Math.random() * 55;
      const color = colors[b % colors.length];
      for (let i = 0; i < 14; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';
        const angle = (i / 14) * 2 * Math.PI;
        const dist = 55 + Math.random() * 55;
        p.style.cssText = `left:${x}vw;top:${y}vh;background:${color};--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;`;
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
      }
    }, b * 180);
  }
}

// Initialize intro on load
window.addEventListener('DOMContentLoaded', () => {
  updateIntroScreen();
});

window.addEventListener('resize', () => {
  if (typeof gameState !== 'undefined' && gameState.players) {
    placeTokens();
  }
});
