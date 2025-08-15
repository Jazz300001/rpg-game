import { player } from './player.js';
import { log } from '../game.js';
import { allMoves } from './moves.js';

export function createFight(enemy, onVictory) {
    let turnCount = 1;

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }


    function handleMove(moveName) {
        const move = allMoves.find(m => m.name.toLowerCase() === moveName.toLowerCase());
        if (!move) return log(`Invalid move: ${moveName}`);

        if (player.speed < enemy.speed && turnCount === 1) {
            setTimeout(() => {
                enemyTurn();
            },1000);
        }

        if (move.type === "magic") {
            if (player.mp < move.cost) {
                log(`Not enough MP to use ${move.name}.`);
                return;
            }
            player.mp -= move.cost;
        }

        const damage = Math.max(move.power + player.attack - enemy.defense, 1);
        enemy.hp -= damage;
        log(`You used ${move.name} and dealt ${damage} damage!`);
        getHit('enemy-sprite');
        if (enemy.hp <= 0) {
            log(`Enemy defeated!`);
            onVictory();
        } else {
            setTimeout(() =>{
                enemyTurn();
            }, 1000);
        }

        turnCount++;
        log(`Turn: ${turnCount}`);
    }
    function enemyTurn() {
        const damage = Math.max(enemy.attack - player.defense, 1);
        player.hp -= damage;
        log(`${enemy.name} attacks and deals ${damage} damage!`);
        getHit('player-sprite');
        if (player.hp <= 0) {
            log("You were defeated...");
        }
    }

    return handleMove;
}

function getHit(target){
    const hit = document.getElementById(target);
    if (!hit) return;
    hit.style.borderColor = '#ff0000'
    setTimeout(() => {
        hit.style.borderColor = '#0f0'
    }, 500);
}
