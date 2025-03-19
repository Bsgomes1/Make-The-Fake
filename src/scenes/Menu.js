class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './Assets/Neon_Background-2.png')
        this.load.image('clouds', './Assets/Clouds.png')
        this.load.image('bean', './Assets/beanstalk.png')
        this.load.image('heads', './Assets/Phineas_Head.png')

        this.load.image('one_way', './Assets/one_way_platform.png')
        

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

        this.load.audio('player_hurt_1', './Assets/player_hurt_1.mp3')
        this.load.audio('player_hurt_2', './Assets/player_hurt_2.mp3')

        this.load.audio('cherry_hurt_1', './Assets/cherry_hurt_1.mp3')
        this.load.audio('cherry_hurt_2', './Assets/cherry_hurt_2.mp3')
        this.load.audio('cherry_hurt_3', './Assets/cherry_hurt_3.mp3')
        this.load.audio('cherry_hurt_4', './Assets/cherry_hurt_4.mp3')

        this.load.audio('bird_hurt', './Assets/bird_hurt.mp3')


        this.load.audio('select', './Assets/sfx-select.wav')

        this.load.audio('music', './Assets/See You Soon - Otis McDonald.mp3')
    }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        menuConfig.fontSize = '100px'
        this.add.text(game.config.width/2, 250, 'Jump and Duck', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '28px'
        this.add.text(game.config.width/2, game.config.height/2, 'use ←→ to move ↑ to jump', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 29, '↓ to go through down platforms', menuConfig).setOrigin(0.5)
        
        this.add.text(game.config.width/2, game.config.height/2 + 60, '(SPACEBAR) to fire', menuConfig).setOrigin(0.5)
        

        menuConfig.backgroundColor = '#FF0000'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Defeat All Enemies To Win', menuConfig).setOrigin(0.5)

        menuConfig.backgroundColor = '#00FFFF'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 90, 'Press Spacebar to Start', menuConfig).setOrigin(0.5)
        
        menuConfig.backgroundColor = '#FF00FF'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 150, 'press C for Credits', menuConfig).setOrigin(0.5)


        menuConfig.backgroundColor = '#00FF00'

        this.add.text(42, 15, 'Lives', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FFFF00'

        this.add.text(34, 51, 'Ammo', menuConfig).setOrigin(0.5)


        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    
        if (!this.sound.get('music')) {
            this.music = this.sound.add('music', { 
                loop: true, 
                volume: 0.1 
            })
            this.music.play()
        }
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.sound.play('select')
            this.scene.start('playScene') 
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.scene.start('creditsScene')
        }
    }
}