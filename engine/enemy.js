import enemies from '../data/enemies.json' with { type: 'json' };

export function getRandomEnemy() {
  const enemy = enemies[Math.floor(Math.random() * enemies.length)];
  return enemy;
}
