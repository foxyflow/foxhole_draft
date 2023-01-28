import Phaser from 'phaser';
import Load from './load';
import Menu from './menu';
import Play from './play';

let game = new Phaser.Game({
    //type: Phaser.AUTO,
    width: 1200,
    height: 592,
   // backgroundColor: '#3498db', // extra
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 } // Top down game, so no gravity.
        }
    },
    // scene: {
    //     preload: this.preload,
    //     create: this.create,
    //     update: this.update
    // },
    parent: 'game'
}); //end of config

game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('play', Play);

//start the game
game.scene.start('load');
// game.scene.add('play', Play);
// game.scene.start('play');
