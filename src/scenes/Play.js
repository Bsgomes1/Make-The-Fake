class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // Display background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0)

        this.platforms = this.physics.add.staticGroup()

        // Inside your `create()` method (in the appropriate scene)
        this.projectile = this.physics.add.group({
            defaultKey: 'projectile',  // This refers to the 'shot1.png' texture
            maxSize: 10                // Optional: Limits the number of active bullets
        });

        

        // Example platforms
        this.platforms.create(400, 500, 'platform').setScale(0.5).refreshBody()
        this.platforms.create(300, 300, 'platform').setScale(0.5).refreshBody()
        this.platforms.create(200, 400, 'platform').setScale(6, 1).refreshBody()

        // Create player sprite
        this.player = this.physics.add.sprite(200, 100, 'character', 1).setOrigin(0, 0).setScale(0.05)
        this.player.body.setSize(200, 200).setOffset(0, 0) // Adjust hitbox
        this.player.body.setCollideWorldBounds(true) // Prevent player from moving off-screen
        this.player.body.setGravityY(500) // Apply gravity


        this.physics.add.collider(this.player, this.platforms)

        this.cameras.main.setZoom(3)
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)


        if (!this.anims.exists('idle-right')) {
            this.anims.create({
                key: 'idle-right',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 0, end: 0 })
            })
        }

        if (!this.anims.exists('idle-left')) {
            this.anims.create({
                key: 'idle-left',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 18, end: 18 })
            })
        }

        if (!this.anims.exists('right')) {
            this.anims.create({
                key: 'right',
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 1, end: 3 })
            })
        }

        if (!this.anims.exists('right-shoot')) {
            this.anims.create({
                key: 'right-shoot',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { 
                    frames: [4]
                })
            })
        }

        if (!this.anims.exists('right-shoot-invincible')) {
            this.anims.create({
                key: 'right-shoot-invincible',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 10, end: 10 })
            })
        }

        if (!this.anims.exists('left-shoot-invincible')) {
            this.anims.create({
                key: 'left-shoot-invincible',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 16, end: 16 })
            })
        }

        if (!this.anims.exists('left-shoot')) {
            this.anims.create({
                key: 'left-shoot',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 22, end: 22 })
            })
        }

        if (!this.anims.exists('right-crouch')) {
            this.anims.create({
                key: 'right-crouch',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 5, end: 5 })
            })
        }

        if (!this.anims.exists('right-invincible')) {
            this.anims.create({
                key: 'right-invincible',
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 7, end: 9 })
            })
        }

        if (!this.anims.exists('right-invincible-crouch')) {
            this.anims.create({
                key: 'right-invincible-crouch',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 11, end: 11 })
            })
        }

        if (!this.anims.exists('left-invincible')) {
            this.anims.create({
                key: 'left-invincible',
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 13, end: 15 })
            })
        }

        if (!this.anims.exists('left-invincible-crouch')) {
            this.anims.create({
                key: 'left-invincible-crouch',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 17, end: 17 })
            })
        }

        if (!this.anims.exists('left')) {
            this.anims.create({
                key: 'left',
                frameRate: 10,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 19, end: 21 })
            })
        }

        if (!this.anims.exists('left-crouch')) {
            this.anims.create({
                key: 'left-crouch',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 23, end: 23 })
            })
        }

        if (!this.anims.exists('left-damage')) {
            this.anims.create({
                key: 'left-damage',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 24, end: 24 })
            })
        }

        if (!this.anims.exists('right-damage')) {
            this.anims.create({
                key: 'right-damage',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 25, end: 25 })
            })
        }


        if (!this.anims.exists('right-jump')) {
            this.anims.create({
                key: 'right-jump',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 1, end: 1 })
            })
        }

        if (!this.anims.exists('left-jump')) {
            this.anims.create({
                key: 'left-jump',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 19, end: 19 })
            })
        }


        if (!this.anims.exists('invincible-right-jump')) {
            this.anims.create({
                key: 'invincible-right-jump',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 7, end: 7 })
            })
        }

        if (!this.anims.exists('invincible-left-jump')) {
            this.anims.create({
                key: 'invincible-left-jump',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 13, end: 13 })
            })
        }

        if (!this.anims.exists('cherry-left')) {
            this.anims.create({
                key: 'cherry-left',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('cherry', { start: 0, end: 1 })
            })
        }

        if (!this.anims.exists('cherry-right')) {
            this.anims.create({
                key: 'cherry-right',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('cherry', { start: 2, end: 3 })
            })
        }

        if (!this.anims.exists('bird-left')) {
            this.anims.create({
                key: 'bird-left',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 })
            })
        }

        if (!this.anims.exists('bird-right')) {
            this.anims.create({
                key: 'bird-right',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('bird', { start: 3, end: 5 })
            })
        }


        // Keyboard input
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })


        //console.log(this.anims)
        //this.player.play('fly')

        //console.log(this.anims.getTotalFrames)

        this.gameOverFlag = false // Track if the game is over

    
    }

    
    update() {
        if (this.gameOverFlag) return
    
        let isMoving = false
        let isJumping = !this.player.body.touching.down
        let isCrouching = this.cursors.down.isDown
        let isShooting = this.input.keyboard.checkDown(
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            250
        )
    
        // MOVEMENT LOGIC
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
            if (!isJumping && !isCrouching && !isShooting) {
                this.player.play('left', true)
            }
            this.lastDirection = 'left'
            isMoving = true
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200)
            if (!isJumping && !isCrouching && !isShooting) {
                this.player.play('right', true)
            }
            this.lastDirection = 'right'
            isMoving = true
        } else {
            this.player.setVelocityX(0)
            if (!isJumping && !isCrouching) {
                this.player.play(this.lastDirection === 'left' ? 'idle-left' : 'idle-right', true)
            }
        }
    
        // CROUCHING LOGIC (Pressing 'S')
        if (isCrouching && !isJumping && !isShooting) {
            this.player.setVelocityX(0) // Stop movement when crouching
            this.player.play(this.lastDirection === 'left' ? 'left-crouch' : 'right-crouch', true)
        }
    
        // JUMPING LOGIC
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400)
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        } else if (isJumping && !isShooting) {
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        }

        // SHOOTING LOGIC (Pressing Spacebar while in the air or on the ground)
        if (isShooting) {
            this.sound.play('shoot');  // Assuming you have a sound for shooting

            // Create a bullet from the group
            let bullet = this.projectile.get(this.player.x + (this.lastDirection === 'left' ? 0 : 10), this.player.y + 4);

            if (bullet) {
                bullet.setActive(true).setVisible(true);
                bullet.setScale(0.5);  // Adjust bullet size if needed
                bullet.setVelocityX(this.lastDirection === 'left' ? -40 : 40); // Move bullet left or right
                
                // Destroy the projectile when it leaves the world bounds
                bullet.setCollideWorldBounds(true);
                bullet.body.onWorldBounds = true;
                this.physics.world.on('worldbounds', (body) => {
                    if (body.gameObject === bullet) {
                        bullet.destroy();
                    }
                });
            }
        }

        
        
    }
        
    
    



    gameOver() {

    }


}
