

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 } // Top down game, so no gravity.
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);


function preload (){
    //Load assets:
    this.load.image('tiles', 'src/assets/dungeon.png'); //dungeon tileset (1)
    this.load.image('tileset', 'src/assets/tileset.png'); // fox tileset (2)
    this.load.image('castle_tileset', 'src/assets/castle_tileset.png'); // castle tileset (3
    this.load.image('tileset_grassland', 'src/assets/tileset_grassland.png'); // grassland tileset (4)
    this.load.image('tilesetdeep', 'src/assets/tilesetdeep.png'); // deep tileset (5)
    this.load.image('tilesetpurple', 'src/assets/tilesetpurple.png'); // purple tileset (6)
    this.load.image('coolcastle', 'src/assets/coolcastle-tileset.png'); // cool castle tileset (7)
    this.load.tilemapTiledJSON('map1', 'src/assets/map1.json');
    //Player just as image:
    this.load.spritesheet('player', 'src/assets/player-run-184x22.png', { frameWidth: 30, frameHeight: 22 });
    this.load.spritesheet('playerIdle', 'src/assets/playerIdle120x22.png', { frameWidth: 30, frameHeight: 22 });
}

let player;
let cursors;
let A; // works without declaring it.
let D;
let W;
let S;
function create (){
    //Create game objects:
    const map = this.make.tilemap({key: 'map1', tileWidth: 16, tileHeight: 16});
    const tileset = map.addTilesetImage('tiled1', 'tiles');
    const tileset2 = map.addTilesetImage('tiled2', 'tileset');
    const tileset3 = map.addTilesetImage('tiled3', 'castle_tileset');
    const tileset4 = map.addTilesetImage('tiled4', 'tileset_grassland');
    const tileset5 = map.addTilesetImage('tiled5', 'tilesetdeep');
    const tileset6 = map.addTilesetImage('tiled6', 'tilesetpurple');
    const tileset7 = map.addTilesetImage('tiled7', 'coolcastle');
    const belowLayer = map.createLayer("Below Player", [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
    const worldLayer = map.createLayer("World",[tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
    const aboveLayer = map.createLayer("Above Player", [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
    belowLayer.setDepth(0); //0 is default -- no need to set it
    worldLayer.setDepth(1); //player between layers.
    aboveLayer.setDepth(2); //player can now go under layers (1 and 2, which weren't needed to be set).

    //Create player without Tiled Object Spawn Point: 
        //player = this.physics.add.sprite(100, 500, 'player');
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    
    //Collision:
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, worldLayer);
    worldLayer.setCollisionByProperty({collides: true});
    player.body.setSize(player.width - 20, player.height - 10, true); //true centers and the rest changes collisionbox size

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
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

}// End of create

const speed = 150;
function update (){
// game logic: updates every frame
    
    if (A.isDown || cursors.left.isDown)
    {
        player.flipX = true;
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }
    else if (S.isDown || cursors.down.isDown){
       
        player.setVelocityY(speed);
        
    }
    else if (W.isDown || cursors.up.isDown){
        
        player.setVelocityY(-speed);
    }
    else if (D.isDown || cursors.right.isDown)
    {
        player.flipX = false;
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    else
    {
        
        player.setVelocity(0);
        player.anims.play(false); // Stops the animation.
        player.anims.play('idle', true);  
    }

    //Normalise and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
    
} // End of update.



