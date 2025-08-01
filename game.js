import { player } from './engine/player.js';
import { getRandomEnemy } from './engine/enemy.js';
import { createFight } from './engine/fightLogic.js'

const logEl = document.getElementById('log');
const contBtn = document.getElementById('cont');
const actionButtons = document.getElementById('action-buttons');

let enemy;
let handleMove;

export function log(message) {
  const p = document.createElement('p');
  p.textContent = message;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

function setupEventListeners() {
  actionButtons.querySelectorAll('button').forEach(btn => {
    const move = btn.textContent.toLowerCase();

    if (move === 'continue...') return;

    btn.addEventListener('click', () => {
      if (handleMove) handleMove(move);
    });
  });

  contBtn.addEventListener('click', startFight);
}

function startFight() {
  contBtn.setAttribute('hidden', '');
  enemy = getRandomEnemy();
  log(`A wild ${enemy.name} appears!`);
  enemy.hp = enemy.maxHp;
  handleMove = createFight(enemy, moveOn);
}

function moveOn() {
  log(`You have defeated ${enemy.name}! Now is a good time to buff up or use healing items before the next battle.`);
  log(`Press "Continue..." when ready.`);
  contBtn.removeAttribute('hidden');
}

function renderStats() {
  document.getElementById('player-stats').textContent =
      `Player HP: ${player.hp}/${player.maxHp}`;
  document.getElementById('enemy-stats').textContent =
      enemy ? `${enemy.name} HP: ${enemy.hp}/${enemy.maxHp}` : '';
}

setupEventListeners();
startFight();
setInterval(renderStats, 100);

