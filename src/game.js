
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 } // Top down game, so no gravity
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
//var cursors;

function preload (){
    //load assets
    this.load.image('tiles', 'src/assets/dungeon.png'); //dungeon tileset (1)
    this.load.image('tileset', 'src/assets/tileset.png'); // fox tileset (2)
    this.load.image('castle_tileset', 'src/assets/castle_tileset.png'); // castle tileset (3
    this.load.tilemapTiledJSON('map1', 'src/assets/map1.json');
    this.load.image('player', 'src/assets/player-crouch-1-15x15.png');
    this.load.spritesheet('grace', 'src/assets/grace.png', { frameWidth: 32, frameHeight: 80 });


}
let player;
var player2;
let cursors;
function create (){
    //create game objects
    const map = this.make.tilemap({key: 'map1', tileWidth: 16, tileHeight: 16});
    const tileset = map.addTilesetImage('tiled1', 'tiles');
    const tileset2 = map.addTilesetImage('tiled2', 'tileset');
    const tileset3 = map.addTilesetImage('tiled3', 'castle_tileset');
    const belowLayer = map.createStaticLayer("Below Player", [tileset, tileset2, tileset3], 0, 0);
    const worldLayer = map.createStaticLayer("World",[tileset, tileset2, tileset3], 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", [tileset, tileset2, tileset3], 0, 0);
    //create player
    player2 = this.physics.add.sprite(100, 500, 'grace');
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    player2.setCollideWorldBounds(true);
    //collision
    this.physics.add.collider(player, worldLayer);
    worldLayer.setCollisionByProperty({collides: true});

    this.anims.create({
        key: 'a',
        frames: this.anims.generateFrameNumbers('grace', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'grace', frame: 4 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'd',
        frames: this.anims.generateFrameNumbers('grace', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });
    //this.cursors = this.input.keyboard.createCursorKeys();
    cursors = this.input.keyboard.createCursorKeys();
    
}
const speed = 161;
const player2speed = 161;

function update (){
    // game logic: updates every frame
    
    if (cursors.left.isDown)
    {
        player2.setVelocityX(-player2speed);
        player.setVelocityX(-speed);
        player2.anims.play('a', true);
        
    }
    else if (cursors.up.isDown){
        player2.setVelocityY(-player2speed);
        player.setVelocityY(-speed);
    }
    else if (cursors.down.isDown){
        player2.setVelocityY(player2speed);
        player.setVelocityY(speed);
    }
    else if (cursors.right.isDown)
    {
        player2.setVelocityX(player2speed);
        player.setVelocityX(speed);
        player2.anims.play('d', true);
    }
    else
    {
        player2.setVelocity(0);
        player.setVelocity(0);
        player2.anims.play('turn');
    }
    //normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
    player2.body.velocity.normalize().scale(speed);
}



