class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0)
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0, 0)
        this.beanstalk = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bean').setOrigin(0, 0)
        this.platforms = this.physics.add.staticGroup()
        this.leaf = this.physics.add.staticGroup()
        this.reverse_leaf = this.physics.add.staticGroup()

        // Example platforms
        this.platforms.create(0, 350, 'platform').setScale(1).refreshBody()
        this.platforms.create(550, 350, 'platform').setScale(1).refreshBody()
        this.platforms.create(400, 330, 'platform').setScale(0.5).refreshBody()
        this.platforms.create(200, 400, 'platform').setScale(6, 1).refreshBody()


        // beanstalk platforms
        this.reverse_leaf.create(680, 600, 'reverse_leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.leaf.create(750, 550, 'leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.reverse_leaf.create(680, 500, 'reverse_leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.leaf.create(725, 450, 'leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.reverse_leaf.create(660, 400, 'reverse_leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.leaf.create(740, 350, 'leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.reverse_leaf.create(693, 300, 'reverse_leaf').setScale(0.05).refreshBody().setSize(30,5)
        this.leaf.create(760, 250, 'leaf').setScale(0.05).refreshBody().setSize(30,5)


        // Create player sprite 
        this.player = this.physics.add.sprite(200, 100, 'character', 1).setOrigin(0, 0).setScale(0.05)
        this.player.body.setSize(200, 200).setOffset(0, 0) // Adjust hitbox
        this.player.body.setCollideWorldBounds(true) // Prevent player from moving off-screen
        this.player.body.setGravityY(500) // Apply gravity

        // Projectiles
        this.projectile = this.physics.add.group({
            defaultKey: 'projectile',
            maxSize: 10
        })

        // Create enemies
        this.cherries = this.physics.add.group({
            runChildUpdate: true,
            allowGravity: true,
        })

        this.birds = this.physics.add.group({
            runChildUpdate: true,
            allowGravity: false
        })

        // Spawn multiple cherries
        let cherryPositions = [
            { x: 500, y: 450 },
            { x: 300, y: 250 },
            { x: 700, y: 300 }
        ]



        // Spawn multiple birds
        let birdPositions = [
            { x: 600, y: 100 },
            { x: 200, y: 200 },
            { x: 800, y: 150 }
        ]

        //enemy collision
        this.physics.add.collider(this.projectile, this.cherries, this.hitEnemy, null, this)
        this.physics.add.collider(this.projectile, this.birds, this.hitEnemy, null, this)


        // Add collisions with platforms
        this.physics.add.collider(this.cherries, this.platforms)
        this.physics.add.collider(this.birds, this.platforms)

        // THEN add player collisions
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.leaf)
        this.physics.add.collider(this.player, this.reverse_leaf)
        this.physics.add.collider(this.player, this.cherries, this.hitPlayer, null, this)
        this.physics.add.collider(this.player, this.birds, this.hitPlayer, null, this)

        // Camera setup
        this.cameras.main.setZoom(4)
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height)
        this.cameras.main.startFollow(this.player, true, 1, 1)

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
                frameRate: 7,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', {
                    frames: [1, 2, 3, 0]
                })
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
                frames: this.anims.generateFrameNumbers('character', {
                    frames: [7, 8, 9, 6]
                })
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
                frames: this.anims.generateFrameNumbers('character', {
                    frames: [13, 14, 15, 12]
                })
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
                frameRate: 7,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', {
                    frames: [19, 20, 21, 18]
                })
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
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        })


        this.gameOverFlag = false // Track if the game is over


        cherryPositions.forEach(pos => {
            let cherry = this.cherries.create(pos.x, pos.y, 'cherry').setScale(0.25).setOffset(0, -15)
            if (cherry.body) {
                cherry.body.setVelocityX(50) // Move right
                cherry.setBounce(0)
                cherry.setCollideWorldBounds(true)

                cherry.play('cherry-right') // Play animation
                cherry.body.setGravityY(500)
            }
        })
        this.physics.add.collider(this.cherries, this.platforms);
        //this.physics.add.overlap(this.projectile, this.cherries, this.hitCherry, null, this);


        birdPositions.forEach(pos => {
            let bird = this.birds.create(pos.x, pos.y, 'bird').setScale(0.25)
            if (bird.body) {
                bird.body.setVelocityX(-50) // Move left
                bird.setBounce(1)
                bird.setCollideWorldBounds(true)
                bird.play('bird-left') // Play animation
            }
        })

        this.time.addEvent({
            delay: 1000,  // Every second
            loop: true,
            callback: () => {
                this.birds.children.iterate(bird => {
                    if (bird && bird.active && Phaser.Math.Between(0, 1) === 0) { // Ensure bird exists
                        bird.setVelocityY(100)  // Move downward

                        this.time.delayedCall(500, () => {
                            if (bird && bird.active) {  // Check if bird still exists before modifying
                                bird.setVelocityY(0) // Stop swooping after 0.5 sec
                            }
                        })
                    }
                })
            }
        })


        // lives
        this.lives = 5;  // Track player lives
        this.lifeIcons = [];
        
        // Adjust for zoom
        //let zoomFactor = 4;  // Same as your camera zoom
        
        for (let i = 0; i < this.lives; i++) {
            let life = this.add.image(340 + i * 10, 265, 'heads')
                .setScale(0.25) // Scale it properly
                .setOrigin(0, 0)
                .setScrollFactor(0); // Keeps it fixed in place
        
            this.lifeIcons.push(life);
        }
        
        

        // make a hairdryer in the top right/left to dysplay how many shot you have left
        // as well as lives display

        this.gameOverFlag = false
        this.invincible = false; // Set player invincibility state to false at the start

    }


    update() {
        if (this.lives <= 0 && !this.gameOverFlag) {
            this.gameOver();
            return;
        }

        this.clouds.tilePositionX += 0.25

        if (this.player.y >= 650) {
            this.lives--    
            this.lifeIcons[this.lives].destroy()        
            this.player.y = 200
            this.player.x = 0
        }

        let isMoving = false
        let isJumping = !this.player.body.touching.down
        let isCrouching = this.cursors.down.isDown
        let isShooting = this.input.keyboard.checkDown(
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            250
        )

        // MOVEMENT LOGIC
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-100)
            if (!isJumping && !isCrouching && !isShooting) {
                this.player.play('left', true)
            }
            this.lastDirection = 'left'
            isMoving = true
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(100)
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
            this.player.setVelocityY(-300)
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        } else if (isJumping && !isShooting) {
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        }

        // SHOOTING LOGIC (Pressing Spacebar while in the air or on the ground)
        if (isShooting) {
            this.sound.play('shoot')
            this.player.play(this.lastDirection === 'left' ? 'left-shoot' : 'right-shoot', true)
            // Create a bullet from the group
            let bullet = this.projectile.get(this.player.x + (this.lastDirection === 'left' ? -5 : 20), this.player.y + 4)

            if (bullet) {
                bullet.setActive(true).setVisible(true)
                bullet.setScale(0.5)  // Adjust bullet size if needed
                bullet.setVelocityX(this.lastDirection === 'left' ? -100 : 100) // Move bullet left or right

                // Destroy the projectile when it leaves the world bounds
                bullet.setCollideWorldBounds(true)
                bullet.body.onWorldBounds = true
                this.physics.world.on('worldbounds', (body) => {
                    if (body.gameObject === bullet) {
                        bullet.destroy()
                    }
                })
            }
        }

        // enemy movement
        this.cherries.children.iterate(cherry => {
            if (cherry.body.velocity.x > 0) {
                cherry.play('cherry-right', true)
                cherry.body.setVelocityX(50)
            } else {
                cherry.play('cherry-left', true)
                cherry.body.setVelocityX(-50)
            }
        })

        this.birds.children.iterate(bird => {
            if (bird.body.velocity.x > 0) {
                bird.play('bird-right', true)
            } else {
                bird.play('bird-left', true)
            }
        })



        //allows for cherries to stay on platforms
        this.cherries.children.iterate(cherry => {
            if (cherry.body) {
                let touchingGround = cherry.body.blocked.down; // Check if on platform

                // Raycasting to detect platform edge
                let aheadX = cherry.x + (cherry.body.velocity.x > 0 ? 10 : -10); // Check a little ahead
                let aheadY = cherry.y + cherry.body.height / 2 + 2; // Slightly below the cherry

                let onPlatform = this.platforms.getChildren().some(platform =>
                    platform.getBounds().contains(aheadX, aheadY)
                );

                if (touchingGround && !onPlatform) {
                    cherry.setVelocityX(-cherry.body.velocity.x); // Reverse direction
                    cherry.play(cherry.body.velocity.x > 0 ? 'cherry-right' : 'cherry-left');
                }
            }
        });


    }


    // hitPlayer(player, enemy) {
    //     if (!enemy || !enemy.body) return // Prevent undefined error
    //     console.log("Player hit!")
    //     enemy.destroy()
    // }

    // hitPlayer(player, enemy) {
    //     if (!enemy || !enemy.body) return; // Prevent undefined error
    
    //     console.log("Player hit!");
    
    //     //enemy.destroy(); // Destroy enemy on collision
    //     let damageAnim = this.lastDirection === 'left' ? 'left-damage' : 'right-damage';
    //     this.player.play(damageAnim, true);

    //     if (this.lives > 0) {
    //         this.lives--; // Reduce lives count
    //         this.lifeIcons[this.lives].destroy(); // Remove last life icon
    //     }
    
    //     if (this.lives <= 0) {
    //         this.gameOver();
    //     }
    // }
    hitPlayer(player, enemy) {
        if (!enemy || !enemy.body || this.invincible) return; // Prevent further hits if invincible
    
        console.log("Player hit!");
    
        // Start invincibility period
        this.invincible = true;
    
        // Play damage animation
        this.player.setTint(0xff0000) // Flash red
        this.time.delayedCall(250, () => {
            this.invincible = false; // Reset invincibility after 1 second
            this.player.clearTint(); // Remove the green tint
            this.player.setTint(0x00ff00); // Green tint for invincibility
            this.time.delayedCall(2000, () => {
                this.invincible = false; // Reset invincibility after 1 second
                this.player.clearTint(); // Remove the green tint
            });

        });
    
    
        // Reduce lives
        if (this.lives > 0) {
            this.lives--; // Reduce lives count
            this.lifeIcons[this.lives].destroy(); // Remove last life icon
        }
    
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    

    hitEnemy(projectile, enemy) {
        if (!enemy || !enemy.body) return

        if (enemy.texture.key === 'bird') {
            enemy.destroy()  // Birds die instantly
        } else if (enemy.texture.key === 'cherry') {
            enemy.hitCount = (enemy.hitCount || 0) + 1 // Track hits
            enemy.setTint(0xff0000) // Flash red

            this.time.delayedCall(200, () => {
                enemy.clearTint() // Remove red tint after 200ms
            })

            if (enemy.hitCount >= 3) {
                enemy.destroy() // Destroy cherry after 3 hits
            }
        }

        projectile.destroy() // Destroy projectile on hit
    }





    // gameOver() {
    //     if (!this.gameOverFlag) {  // Prevent multiple triggers
    //         this.gameOverFlag = true;
    //         this.physics.pause()
    //         console.log("Game Over!");
    
    //         // Stop player movement
    //         this.player.setVelocity(0, 0);
    //         this.player.setActive(false).setVisible(false);
    
    //         // Stop all enemy movements
    //         this.cherries.children.iterate(cherry => cherry.setVelocityX(0));
    //         this.birds.children.iterate(bird => bird.setVelocityX(0));
    
    //         // Display a "Game Over" message
    //         this.add.text(this.player.x, 
    //                       this.player.y, 
    //                       'GAME OVER', 
    //                       { fontSize: '32px', fill: '#fff' })
    //             .setOrigin(0.5);
    
    //         this.input.keyboard.once('keydown-R', () => {
    //             this.scene.restart()
    //         })

    //         this.input.keyboard.once('keydown-M', () => {
    //             this.scene.start('menuScene');
    //         });
    //     }
    // }
    gameOver() {
        if (!this.gameOverFlag) {  // Prevent multiple triggers
            this.gameOverFlag = true;
            this.physics.pause();
            console.log("Game Over!");
    
            // Stop player movement
            this.player.setVelocity(0, 0);
            this.player.setActive(false).setVisible(false);
    
            // Stop all enemy movements
            this.cherries.children.iterate(cherry => cherry.setVelocityX(0));
            this.birds.children.iterate(bird => bird.setVelocityX(0));
    
            // Get the camera's center position
            const camera = this.cameras.main;
            const cameraCenterX = camera.worldView.centerX;
            const cameraCenterY = camera.worldView.centerY;
    
            // Display a "Game Over" message at the center of the camera
            this.add.text(cameraCenterX, cameraCenterY - 15, 'GAME OVER', 
                { fontSize: '32px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5);
            this.add.text(cameraCenterX, cameraCenterY + 25, 'R to Restart', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5);
            this.add.text(cameraCenterX, cameraCenterY + 35, 'M to go to Menu', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5);
    
            // Restart the game when 'R' is pressed
            this.input.keyboard.once('keydown-R', () => {
                this.scene.restart();
            });
    
            // Go to menu when 'M' is pressed
            this.input.keyboard.once('keydown-M', () => {
                this.scene.start('menuScene');
            });
        }
    }
    


}
