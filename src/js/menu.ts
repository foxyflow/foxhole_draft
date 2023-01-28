import Phaser from 'phaser';

export default class Menu{
    add: any;
    upKey: any;
    input: any;
    scene: any;

    //data pram is object coming from Play scene.
    create(data: { score: any; }){
        // get score
        let score = data.score ?
            data.score : 0;
        // add background // was 0, 0 not 250 170
        this.add.image(250, 170, 'background').setOrigin(0, 0);
        // add title
        let nameLabel = this.add.text(250, 80, 'You deeead', {font: '50px Arial', fill: '#ffffff'});
        nameLabel.setOrigin(0.5, 0.5);
        // display score
        let scoreText = 'score: ' + score;
        let scoreLabel = this.add.text(250, 150, scoreText, {font: '25px Arial', fill: '#ffffff'});
        scoreLabel.setOrigin(0.5, 0.5);
        // add start button
        let startText = 'press the up arrow key to start';
        let startLabel = this.add.text(250, 250, startText, {font: '25px Arial', fill: '#ffffff'});
        startLabel.setOrigin(0.5, 0.5);
        // store the up arrow key
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    } // end of create()

    update(){
        // check if up key is pressed
        if(this.upKey.isDown){
            // start the play scene
            this.scene.start('play'); //maybe change to Play
        }
    }
}