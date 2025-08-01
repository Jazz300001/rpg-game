import { player } from './player.js';
import { log } from '../game.js';

export function createFight(enemy, onVictory) {
    let turnCount = 1;

    function handleMove(type) {
        if (type === 'attack') {
            if (player.speed < enemy.speed && turnCount === 1) {
                enemyTurn();
            }

            const damage = Math.max(player.attack - enemy.defense, 1);
            enemy.hp -= damage;
            log(`You attack with your weapon and deal ${damage} damage!`);

            if (enemy.hp <= 0) {
                log(`Enemy defeated!`);
                onVictory();
            } else {
                enemyTurn();
            }
        }

        turnCount++;
        log(`turnCount: ${turnCount}`);
    }

    function enemyTurn() {
        const damage = Math.max(enemy.attack - player.defense, 1);
        player.hp -= damage;
        log(`${enemy.name} attacks and deals ${damage} damage!`);

        if (player.hp <= 0) {
            log("You were defeated...");
        }
    }
    return handleMove;
}