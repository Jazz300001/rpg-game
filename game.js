import { player } from './engine/player.js';
import { getRandomEnemy } from './engine/enemy.js';
import { createFight } from './engine/fightLogic.js'
import { meleeMoves, magicMoves } from './engine/moves.js';
import { asciiSprites } from "./assets/asciiSprites.js";

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
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      if (type === 'attack') {
        showMoveOptions(meleeMoves);
      } else if (type === 'magic') {
        showMoveOptions(magicMoves);
      }
    });
  });
  contBtn.addEventListener('click', startFight);
}

function showMoveOptions(moves) {
  const moveList = document.getElementById('moves');
  if(!moveList) {
    console.log('im geekin');
  }
  moveList.innerHTML = '';
  moves.forEach((move) => {
    const btn = document.createElement('button');
    btn.textContent = move.name;
    btn.addEventListener('click', () => {
      handleMove(move.name);
      moveList.innerHTML = '';
    });
    moveList.appendChild(btn);
    console.log(moveList)
  });
}

function startFight() {
  contBtn.setAttribute('hidden', '');
  enemy = getRandomEnemy();
  log(`A wild ${enemy.name} appears!`);
  enemy.hp = enemy.maxHp;
  handleMove = createFight(enemy, moveOn);
  document.getElementById('enemy-sprite').src = `assets/${enemy.name.toLowerCase()}.jpg`;
}

function moveOn() {
  log(`You have defeated ${enemy.name}! Now is a good time to buff up or use healing items before the next battle.`);
  log(`Press "Continue..." when ready.`);
  contBtn.removeAttribute('hidden');
}

function renderStats() {
  document.getElementById('player-stats').textContent =
      `Player HP: ${player.hp}/${player.maxHp} | MP: ${player.mp}`;
  document.getElementById('enemy-stats').textContent =
      enemy ? `${enemy.name} HP: ${enemy.hp}/${enemy.maxHp}` : '';
}
document.getElementById('player-sprite').src = `assets/player.jpg`;
setupEventListeners();
startFight();
setInterval(renderStats, 100);

