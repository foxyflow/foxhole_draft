

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
    this.load.tilemapTiledJSON('map1', 'src/assets/map1.json');
    //Player just as image:
        // this.load.image('player', 'src/assets/player-crouch-1-16x15.png');
    this.load.spritesheet('player', 'src/assets/player-run-184x22.png', { frameWidth: 30, frameHeight: 22 });


}
let player;
let cursors;
function create (){
    //Create game objects:
    const map = this.make.tilemap({key: 'map1', tileWidth: 16, tileHeight: 16});
    const tileset = map.addTilesetImage('tiled1', 'tiles');
    const tileset2 = map.addTilesetImage('tiled2', 'tileset');
    const tileset3 = map.addTilesetImage('tiled3', 'castle_tileset');
    const belowLayer = map.createStaticLayer("Below Player", [tileset, tileset2, tileset3], 0, 0);
    const worldLayer = map.createStaticLayer("World",[tileset, tileset2, tileset3], 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", [tileset, tileset2, tileset3], 0, 0);
    
    //Create player without Tiled: 
        //player = this.physics.add.sprite(100, 500, 'player');
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    
    //Collision:
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, worldLayer);
    worldLayer.setCollisionByProperty({collides: true});
    player.body.setSize(player.width - 10, player.height - 10, true); //true centers and the rest changes collisionbox size

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    // To just have 1 frame, you can use this instead of start and end properties:
        //     frames: [ { key: 'player', frame: 4 } ],
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();

}// End of create

const speed = 161;
function update (){
    // game logic: updates every frame
    
    if (cursors.left.isDown )
    {
        player.flipX = true;
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }
    else if (cursors.up.isDown){
       
        player.setVelocityY(-speed);
    }
    else if (cursors.down.isDown){
        
        player.setVelocityY(speed);
    }
    else if (cursors.right.isDown)
    {
        player.flipX = false;
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocity(0);
        player.anims.play(false);
    }
    //Normalise and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
    
} // End of update.



