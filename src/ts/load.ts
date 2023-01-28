

export default class Load{
    load: any;
    scene: any;
    add: any;
    
    //Load assets:
    preload (){
        //load menu background image:
        this.load.image('background', 'src/assets/pngs/background.png');
        //Load tilesets:
        this.load.image('tiles', 'src/assets/pngs/tilesets/dungeon.png'); //dungeon tileset (1)
        this.load.image('tileset', 'src/assets/pngs/tilesets/tileset.png'); // fox tileset (2)
        this.load.image('castle_tileset', 'src/assets/pngs/tilesets/castle_tileset.png'); // castle tileset (3
        this.load.image('tileset_grassland', 'src/assets/pngs/tilesets/tileset_grassland.png'); // grassland tileset (4)
        this.load.image('tilesetdeep', 'src/assets/pngs/tilesets/tilesetdeep.png'); // deep tileset (5)
        this.load.image('tilesetpurple', 'src/assets/pngs/tilesets/tilesetpurple.png'); // purple tileset (6)
        this.load.image('coolcastle', 'src/assets/pngs/tilesets/coolcastle-tileset.png'); // cool castle tileset (7)
        this.load.image('alex', 'src/assets/pngs/tilesets/alex.png'); // alex tileset (8)
        //load tilemap:
        this.load.tilemapTiledJSON('map1', 'src/assets/map1.json');
        //Player just as image:
        this.load.spritesheet('player', 'src/assets/pngs/spritesheets/player-run-184x22.png', { frameWidth: 30, frameHeight: 22 });
        this.load.spritesheet('playerIdle', 'src/assets/pngs/spritesheets/playerIdle120x22.png', { frameWidth: 30, frameHeight: 22 });
        //load moneybag as coin:
        this.load.image('coin', 'src/assets/pngs/alex_money.png');
        // display loading text
        let loadLabel = this.add.text(150, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        loadLabel.setOrigin(0.5, 0.5); // change the origin to the center of the text

        // load audio
        this.load.audio('coin', ['src/assets/sounds/alexSoundFx/05.wav']);
        this.load.audio('die', ['src/assets/sounds/alexSoundFx/35.wav']);
        this.load.audio('backgroundMusic', ['src/assets/sounds/Osiris.mp3']);
    } //end preload
    
    create(){
        // start Menu scene
        this.scene.start('menu');
    }
    
} //end class Load