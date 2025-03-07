class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './Assets/Neon_Background-2.png')

        this.load.image('projectile', './Assets/shot1.png')

        this.load.spritesheet('character', './Assets/Phineas_Spritesheet.png', {
            startFrame: 0,
            frameWidth: 200,
            frameHeight: 200
        })
        
        this.load.spritesheet('cherry', './Assets/Angry_Cherry.png', {
            startFrame: 0,
            frameWidth: 100,
            frameHeight: 100
        })

        this.load.spritesheet('bird', './Assets/Wierd_Bird.png', {
            startFrame: 0,
            frameWidth: 100,
            frameHeight: 100
        })

        
        this.load.image('leaf', './Assets/Leaf_Platform.png')
        this.load.image('reverse_leaf', './Assets/Reversed_Leaf_Platform.png')
        this.load.image('platform', './Assets/platform.png')


        this.load.audio('shoot', './Assets/Hairdryer_Shot.mp3')


    }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#FFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Jump and Duck', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'use ←→ to move ↑↓ to jump/duck & (SPACEBAR) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'press spacebar to start', menuConfig).setOrigin(0.5)
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

          //this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }

    }
}