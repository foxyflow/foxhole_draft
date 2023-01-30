import Phaser from 'phaser';
import Load from './load';
import Menu from './menu';
import Play from './play';


const config: Phaser.Types.Core.GameConfig = {

        type: Phaser.AUTO,
        width: 1200,
        height: 592,
        parent: 'game',
    // backgroundColor: '#3498db', // extra
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 } // Top down game, so no gravity.
            }
        },
        scene: [Load, Menu, Play]
    }; //end of config

    //game.scene.add('load', Load);
    //game.scene.add('menu', Menu);
   // game.scene.add('play', Play);

    //start the game
    //game.scene.start('load');
    export default new Phaser.Game(config);

