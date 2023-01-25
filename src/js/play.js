
class Play{
    
        constructor (player, cursors, A, D, W, S)
        {
            this.player = player;
            this.cursors = cursors;
            this.A = A;
            this.D = D;
            this.W = W;
            this.S = S;
            this.speed = 100;
            this.score = 0;
            
        }

    create (){
        //Create game objects:
        const map = this.make.tilemap({key: 'map1', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('tiled1', 'tiles');
        const tileset2 = map.addTilesetImage('tiled2', 'tileset');
        const tileset3 = map.addTilesetImage('tiled3', 'castle_tileset');
        const tileset4 = map.addTilesetImage('tiled4', 'tileset_grassland');
        const tileset5 = map.addTilesetImage('tiled5', 'tilesetdeep');
        const tileset6 = map.addTilesetImage('tiled6', 'tilesetpurple');
        const tileset7 = map.addTilesetImage('tiled7', 'coolcastle');
        const tileset8 = map.addTilesetImage('tiled8', 'alex');
        const aboveGround = map.createLayer("Above Ground", [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8], 0, 0);
        const belowLayer = map.createLayer("Below Player", [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8], 0, 0);
        const worldLayer = map.createLayer("World",[tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8], 0, 0);
        const aboveLayer = map.createLayer("Above Player", [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8], 0, 0);
        belowLayer.setDepth(0); //0 is default -- no need to set it
        aboveGround.setDepth(1); //player between layers.
        worldLayer.setDepth(2); 
        aboveLayer.setDepth(3); //player can now go under layers (1 and 2, which weren't needed to be set).

        //add coins:
        this.coin = this.physics.add.sprite(310, 300, 'coin');
        //display coin score: //this.add.text(x,y,text,style) (style is an object)
        this.scoreLabel = this.add.text(98, 15, 'Score: 0', { font: '16px Arial', fill: '#fff', backgroundColor: '#000' });
        
        //create sounds:
        this.coinSound = this.sound.add('coin');
        this.dieSound = this.sound.add('die');
        this.bgMusic = this.sound.add('backgroundMusic');
        this.bgMusic.play();
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.2;


        //Create player without Tiled Object Spawn Point: 
            //this.player = this.physics.add.sprite(100, 500, 'player');
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
        
        //Collision:
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, worldLayer);
        worldLayer.setCollisionByProperty({collides: true});
        this.player.body.setSize(this.player.width - 20, this.player.height - 10, true); //true centers and the rest changes collisionbox size

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });
        // To just have 1 frame, you can use this instead of start and end properties:
            //     frames: [ { key: 'player', frame: 4 } ],
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({ 
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerIdle', [0,1,2,3,]),
            frameRate: 8,
            repeat: -1
        });

       this.cursors = this.input.keyboard.createCursorKeys();
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }// End of create

     //speed = 1500; // (works if commeted out of constructor)
     update (){
    // game logic: updates every frame
        if(!this.player.active){ //this code is not needed.
            return;
        }
        
        if (this.A.isDown || this.cursors.left.isDown)
        {
            this.player.flipX = true;
            //player.setVelocityX(-speed); // This is the same as:
            this.player.body.velocity.x = -this.speed;
            this.player.anims.play('left', true);
        }
        else if (this.S.isDown || this.cursors.down.isDown){
        
            this.player.setVelocityY(this.speed);
            
        }
        else if (this.W.isDown || this.cursors.up.isDown){
            
            this.player.setVelocityY(-this.speed);
        }
        else if (this.D.isDown || this.cursors.right.isDown)
        {
            this.player.flipX = false;
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
 
        else
        {
            
            this.player.setVelocity(0);
            this.player.anims.play(false); // Stops the animation.
            this.player.anims.play('idle', true);  
        }
        

        //Normalise and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(this.speed);
        
        //player die
        if (this.player.y > 550 || this.player.y < 10 || this.player.x > 1190 || this.player.x < 10){
            this.playerDie();
        }
        //taking a coin: this.physics.add.overlap(objectA, objectB)
        if(this.physics.overlap(this.player, this.coin)){
            this.takeCoin();
        }
        //to not call player info if it's dead:
        if (!this.player.active){
            return;
        }
    } // End of update.

    //Methods:

    //death be not proud
    playerDie(){
        this.player.destroy();
        this.scene.start('menu', {score: this.score});
        this.dieSound.play();
        this.score = 0; //reset score
        this.bgMusic.stop();
        this.cameras.main.flash(999, 255, 50, 35); //flash effect - ms, r, g, b

    }
    //take a coin
    takeCoin(){
        this.coinSound.play();
        this.coin.destroy();
        this.score += 10;
        this.scoreLabel.text = 'Score: ' + this.score;
        
    }

}; // End of class Main





