
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
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
    //load assets
    this.load.image('tiles', 'src/assets/dungeon.png'); //dungeon tileset (1)
    this.load.image('tileset', 'src/assets/tileset.png'); // fox tileset (2)
    this.load.tilemapTiledJSON('map1', 'src/assets/map1.json');    
}

function create (){
    //create game objects


    const map = this.make.tilemap({key: 'map1', tileWidth: 16, tileHeight: 16});
    const tileset = map.addTilesetImage('tiled1', 'tiles');
    const tileset2 = map.addTilesetImage('tiled2', 'tileset');
    const layer = map.createStaticLayer("bottom_layer", [tileset, tileset2], 0, 0);
    const layer2 = map.createStaticLayer("top_layer",[tileset, tileset2], 0, 0);


 
    

   
}

function update (){
    // game logic
}



