class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0)
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0, 0)
        this.beanstalk = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bean').setOrigin(0, 0)
        
        this.platforms = this.physics.add.staticGroup()
        this.oneWayPlatforms = this.physics.add.staticGroup()
        this.oneWayPlatforms2 = this.physics.add.staticGroup()
        this.leaf = this.physics.add.staticGroup()
        this.reverse_leaf = this.physics.add.staticGroup()
        this.projectiles = this.physics.add.group()

        // platforms
        this.platforms.create(0, 350, 'platform').setScale(1).refreshBody()        
        this.platforms.create(100, 400, 'platform').setScale(2, 1).refreshBody()
        this.platforms.create(200, 350, 'platform').setScale(1).refreshBody()
        this.platforms.create(290, 370, 'platform').setScale(1.5, 1).refreshBody()
        this.platforms.create(330, 420, 'platform').setScale(1.5, 1).refreshBody()
        this.platforms.create(290, 470, 'platform').setScale(1.5, 1).refreshBody()
        this.platforms.create(250, 525, 'platform').setScale(0.5).refreshBody()
        this.platforms.create(250, 590, 'platform').setScale(3, 1).refreshBody()
        this.platforms.create(400, 590, 'platform').setScale(1).refreshBody()
        this.platforms.create(400, 590, 'platform').setScale(1).refreshBody()
        this.platforms.create(460, 570, 'platform').setScale(1).refreshBody()
        this.platforms.create(500, 620, 'platform').setScale(1).refreshBody()
        this.platforms.create(600, 650, 'platform').setScale(3, 1).refreshBody()


        //one way platform and areana 
        this.cursors = this.input.keyboard.createCursorKeys()
        this.isCrouching = false

        let platform1 = this.oneWayPlatforms.create(700, 200, 'one_way').setScale(7,1).refreshBody()
        platform1.body.checkCollision.down = false
        let platform2 = this.oneWayPlatforms2.create(550, 150, 'one_way').setScale(1, 0.5).refreshBody()
        platform2.body.checkCollision.down = false
        let platform3 = this.oneWayPlatforms2.create(550, 100, 'one_way').setScale(1, 0.5).refreshBody()
        platform3.body.checkCollision.down = false
        let platform4 = this.oneWayPlatforms2.create(850, 150, 'one_way').setScale(1, 0.5).refreshBody()
        platform4.body.checkCollision.down = false
        let platform5 = this.oneWayPlatforms2.create(850, 100, 'one_way').setScale(1, 0.5).refreshBody()
        platform5.body.checkCollision.down = false
        
        let barrier1 = this.platforms.create(510, 100, 'platform').setScale(4, 1)
        barrier1.setAngle(90)
        barrier1.body.setSize(20, 300).setOffset(16,-190)
        let barrier2 = this.platforms.create(890, 100, 'platform').setScale(4, 1)
        barrier2.setAngle(-90)
        barrier2.body.setSize(20, 300).setOffset(16,-190)

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
        // this.player = this.physics.add.sprite(0, 300, 'character', 1).setOrigin(0, 0).setScale(0.05)
        this.player = this.physics.add.sprite(0, 300, 'character', 1).setOrigin(0, 0).setScale(0.05)

        this.player.body.setSize(200, 200).setOffset(0, 0) // Adjust hitbox
        this.player.body.setCollideWorldBounds(true) // Prevent player from moving off-screen
        this.player.body.setGravityY(500) // Apply gravity


        // Projectiles
        this.projectile = this.physics.add.group({
            defaultKey: 'projectile',
            //maxSize: 5
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
            { x: 300, y: 370 },
            { x: 300, y: 330 },
            { x: 100, y: 375 },
            { x: 250, y: 570 },
            { x: 280, y: 570 },
            { x: 230, y: 570 },
            { x: 660, y: 540 },
            { x: 720, y: 500 },
            { x: 660, y: 460 },
            { x: 720, y: 430 },
            { x: 640, y: 380 },
            { x: 720, y: 340 },
            { x: 720, y: 100 },
            { x: 700, y: 150 },
            { x: 690, y: 150 },
            { x: 720, y: 150 },
            { x: 800, y: 150 },
            { x: 520, y: 20 },
            { x: 520, y: 60 },
            { x: 560, y: 100 },
        ]

        // Spawn multiple birds
        let birdPositions = [
            { x: 400, y: 100 },
            { x: 200, y: 200 },
            { x: 100, y: 150 },
            { x: 500, y: 500 },
            { x: 600, y: 400 },
            { x: 800, y: 500 },
            { x: 700, y: 600 },
            { x: 450, y: 450 },
            { x: 300, y: 300 },
            { x: 200, y: 300 },
            { x: 600, y: 100 },
            { x: 800, y: 130 },
            { x: 550, y: 0 },
        ]

        //enemy collision
        this.physics.add.collider(this.projectile, this.cherries, this.hitEnemy, null, this)
        this.physics.add.collider(this.projectile, this.birds, this.hitEnemy, null, this)
        this.physics.add.collider(this.projectile, this.platforms, this.hitEnemy, null, this)
        this.physics.add.collider(this.projectile, this.oneWayPlatforms, this.hitEnemy, null, this)
        this.physics.add.collider(this.projectile, this.oneWayPlatforms2, this.hitEnemy, null, this)


        // Add collisions with platforms
        this.physics.add.collider(this.cherries, this.platforms)
        this.physics.add.collider(this.cherries, this.leaf)
        this.physics.add.collider(this.cherries, this.reverse_leaf)
        this.physics.add.collider(this.cherries, this.oneWayPlatforms)
        this.physics.add.collider(this.birds, this.platforms)
        this.physics.add.collider(this.birds, this.leaf)
        this.physics.add.collider(this.birds, this.reverse_leaf)
        this.physics.add.collider(this.birds, this.oneWayPlatforms)
        this.physics.add.collider(this.birds, this.oneWayPlatforms2)


        // THEN add player collisions
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.leaf)
        this.physics.add.collider(this.player, this.reverse_leaf)
        this.physics.add.collider(this.player, this.cherries, this.hitPlayer, null, this)
        this.physics.add.collider(this.player, this.birds, this.hitPlayer, null, this)
        this.physics.add.collider(this.player, this.oneWayPlatforms);
        this.physics.add.collider(this.player, this.oneWayPlatforms2);
        this.physics.add.overlap(this.player, this.oneWayPlatforms, this.handleOneWayPlatformCollision, null, this)
        this.physics.add.overlap(this.player, this.oneWayPlatforms2, this.handleOneWayPlatformCollision, null, this)
        
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
                repeat: 0,
                frames: this.anims.generateFrameNumbers('character', {
                    frames: [4, 4, 4, 4]
                })
            })
        }

        if (!this.anims.exists('left-shoot')) {
            this.anims.create({
                key: 'left-shoot',
                frameRate: 5,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('character', { start: 22, end: 22 })
            })
        }

        if (!this.anims.exists('right-crouch')) {
            this.anims.create({
                key: 'right-crouch',
                frameRate: 5,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('character', { start: 5, end: 5 })
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
                repeat: 0,
                frames: this.anims.generateFrameNumbers('character', { start: 23, end: 23 })
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
            let cherry = this.cherries.create(pos.x, pos.y, 'cherry').setScale(0.25).setOffset(0, -15).setSize(100, 80)
            if (cherry.body) {
                cherry.body.setVelocityX(50) // Move right
                cherry.setBounce(0)
                cherry.setCollideWorldBounds(true)

                cherry.play('cherry-right') // Play animation
                cherry.body.setGravityY(500)

            }
        })
        this.physics.add.collider(this.cherries, this.platforms)
        //this.physics.add.overlap(this.projectile, this.cherries, this.hitCherry, null, this)


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
                        if (bird.y >= 630){
                            bird.y = 250
                            bird.x = 350
                        }
                        if (bird.y >= 550 && bird.x <= 300) {
                            bird.y = 250
                            bird.x = 350
                        }
                    }
                })
            }
           
        })

        // lives
        this.lives = 5  // Track player lives
        this.ammo = 5
        this.lifeIcons = []
        this.ammoIcons = []
        
        
        for (let i = 0; i < this.lives; i++) {
            let life = this.add.image(340 + i * 10, 265, 'heads')
                .setScale(0.25) // Scale it properly
                .setOrigin(0, 0)
                .setScrollFactor(0) // Keeps it fixed in place
        
            this.lifeIcons.push(life)
        }

        for (let i = 0; i < this.ammo; i++) {
            let ammo = this.add.image(340 + i * 10, 278, 'projectile')
                .setScale(0.25) // Scale it properly
                .setOrigin(0, 0)
                .setScrollFactor(0) // Keeps it fixed in place
        
            this.ammoIcons.push(ammo)
        }

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                if (this.ammo < 5) {
                    this.ammo++;
                    this.updateAmmoDisplay()
                }
            }
        })
        

        this.gameOverFlag = false
        this.invincible = false // Set player invincibility state to false at the start

        this.num_enemies = 33
            // Assuming the ammo count is already displayed, place this text right below it
        this.enemyText = this.add.text(340, 280, `Enemies: ${this.num_enemies}`, {
            fontSize: '8px',
            fill: '#fff'
        }).setScrollFactor(0) // Ensures it stays fixed on the screen
        .setResolution(5)

    }


    update() {
        if (this.lives <= 0 && !this.gameOverFlag) {
            this.gameOver()
            return
        }
    
        this.clouds.tilePositionX += 0.25
    
        if (this.player.y >= 650) {
            this.lives--    
            this.lifeIcons[this.lives].destroy()        
            this.player.y = 300
            this.player.x = 0
            this.randomNum = Math.floor(Math.random() * 3)
            if (this.randomNum == 0) {
                this.sound.play('player_hurt_1')
            }
            if (this.randomNum == 1) {
                this.sound.play('player_hurt_2')
            }
            if (this.randomNum == 2) {
                this.sound.play('player_hurt_1')
            }
            if (this.randomNum == 3) {
                this.sound.play('player_hurt_2')
            }
        }
    
        let isMoving = false
        let isJumping = !this.player.body.touching.down
        let isCrouching = this.cursors.down.isDown
        let isShooting = this.input.keyboard.checkDown(
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            250
        )
        this.isCrouching = false
    
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
    
        // CROUCHING LOGIC (preesing 'Down Arrow)
        if (this.cursors.down.isDown && !this.isJumping && !this.isShooting) {
            this.isCrouching = true;
            this.player.setVelocityX(0); // Stop movement when crouching
            this.player.play(this.lastDirection === 'left' ? 'left-crouch' : 'right-crouch', true);

            // Allow the player to drop through one-way platforms
            if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                this.player.body.checkCollision.down = false; // Temporarily disable collision
                this.time.delayedCall(250, () => {
                    this.player.body.checkCollision.down = true; // Re-enable collision after delay
                });
            }
        } else {
            this.isCrouching = false;
        }

        // Ensure other animations don't override crouching
        if (this.isCrouching) {
            return; // Prevents any other animation from playing while crouching
        }


        // JUMPING LOGIC
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250)
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        } else if (isJumping && !isShooting) {
            this.player.play(this.lastDirection === 'left' ? 'left-jump' : 'right-jump', true)
        }
    
        // SHOOTING LOGIC
        if (!this.gameOverFlag && isShooting && this.ammo > 0) { // Only shoot if ammo > 0
            this.sound.play('shoot', { 
                volume: 0.5 
            })
            this.player.play(this.lastDirection === 'left' ? 'left-shoot' : 'right-shoot', true)
        
            let bullet = this.projectile.get(this.player.x + (this.lastDirection === 'left' ? 2 : 7), this.player.y + 4)
            if (bullet) {
                bullet.setActive(true).setVisible(true)
                bullet.setScale(0.5)
                bullet.setVelocityX(this.lastDirection === 'left' ? -140 : 140)
        
                bullet.setCollideWorldBounds(true)
                bullet.body.onWorldBounds = true
                this.physics.world.on('worldbounds', (body) => {
                    if (body.gameObject === bullet) {
                        bullet.destroy()
                    }
                })
        
                this.ammo-- // Reduce ammo count
                this.updateAmmoDisplay() // Update UI
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
                bird.body.setVelocityX(50)
            } else {
                bird.play('bird-left', true)
                bird.body.setVelocityX(-50)
            }
        })

        //allows for cherries to stay on platforms
        this.cherries.children.iterate(cherry => {
            if (cherry.body) {
                let touchingGround = cherry.body.blocked.down // Check if on platform

                // Raycasting to detect platform edge
                let aheadX = cherry.x + (cherry.body.velocity.x > 0 ? 10 : -10) // Check a little ahead
                let aheadY = cherry.y + cherry.body.height / 2 + 2 // Slightly below the cherry

                let onPlatform = this.platforms.getChildren().some(platform =>
                    platform.getBounds().contains(aheadX, aheadY)
                )

                let onLeaf = this.leaf.getChildren().some(leafs =>
                    leafs.getBounds().contains(aheadX, aheadY)
                )

                let onReverseLeaf = this.reverse_leaf.getChildren().some(reverse_leafs =>
                    reverse_leafs.getBounds().contains(aheadX, aheadY)
                )

                let onOneWay = this.oneWayPlatforms.getChildren().some(oneWays =>
                    oneWays.getBounds().contains(aheadX, aheadY)
                )

                if (touchingGround && !onPlatform && !onLeaf && !onReverseLeaf && !onOneWay) {
                    cherry.setVelocityX(-cherry.body.velocity.x) // Reverse direction
                    cherry.play(cherry.body.velocity.x > 0 ? 'cherry-right' : 'cherry-left')
                }
            }
        })


        if (this.num_enemies == 0) {
            this.gameWin()
        }
        this.enemyText.setText(`Enemies: ${this.num_enemies}`)

    }

    hitPlayer(player, enemy) {
        if (!enemy || !enemy.body || this.invincible) return // Prevent further hits if invincible
    
        // Start invincibility period
        this.invincible = true
    
        // Play damage animation (Flash red)
        this.randomNum = Math.floor(Math.random() * 3)
        if (this.randomNum == 0) {
            this.sound.play('player_hurt_1')
        }
        if (this.randomNum == 1) {
            this.sound.play('player_hurt_2')
        }
        if (this.randomNum == 2) {
            this.sound.play('player_hurt_1')
        }
        if (this.randomNum == 3) {
            this.sound.play('player_hurt_2')
        }

        this.player.setTint(0xff0000)
        this.time.delayedCall(250, () => {
            this.player.clearTint()
            this.player.setTint(0x00ff00) // Green tint for invincibility
            this.time.delayedCall(2000, () => {
                this.invincible = false
                this.player.clearTint()
            })
        })
        this.player.setVelocityY(-100) // Optional: Slight upward push for effect
        // Reduce lives
        if (this.lives > 0) {
            this.lives-- // Reduce lives count
            this.lifeIcons[this.lives].destroy() // Remove last life icon
        }
    
        if (this.lives <= 0) {
            this.gameOver()
        }
    }
    
    hitEnemy(projectile, enemy) {
        if (!enemy || !enemy.body) return;
    
        if (enemy.texture.key === 'bird') {
            this.sound.play('bird_hurt')    
            enemy.destroy();  // Birds die instantly
            this.num_enemies = this.num_enemies - 1
        } else if (enemy.texture.key === 'cherry') {
            this.randomNum = Math.floor(Math.random() * 3)
                if (this.randomNum == 0) {
                    this.sound.play('cherry_hurt_1')
                }
                if (this.randomNum == 1) {
                    this.sound.play('cherry_hurt_2')
                }
                if (this.randomNum == 2) {
                    this.sound.play('cherry_hurt_3')
                }
                if (this.randomNum == 3) {
                    this.sound.play('cherry_hurt_4')
                }
            enemy.hitCount = (enemy.hitCount || 0) + 1;  // Track hits
            enemy.setTint(0xff0000);  // Flash red
    
            this.time.delayedCall(200, () => {
                enemy.clearTint();  // Remove red tint after 200ms
            });
    
            if (enemy.hitCount >= 3) {
                enemy.destroy();  // Destroy cherry after 3 hits
                this.num_enemies = this.num_enemies - 1
            }
        }
        // Ensure projectile does not affect enemy velocity
        projectile.destroy();  // Destroy projectile on hit
    }
    
    gameOver() {
        if (!this.gameOverFlag) {  // Prevent multiple triggers
            this.gameOverFlag = true
            this.physics.pause()
            //console.log("Game Over!")
    
            // Stop player movement
            this.player.setVelocity(0, 0)
            this.player.setActive(false).setVisible(false)
    
            // Stop all enemy movements
            this.cherries.children.iterate(cherry => cherry.setVelocityX(0))
            this.birds.children.iterate(bird => bird.setVelocityX(0))
    
            // Get the camera's center position
            const camera = this.cameras.main
            const cameraCenterX = camera.worldView.centerX
            const cameraCenterY = camera.worldView.centerY
    
            // Display a "Game Over" message at the center of the camera
            this.add.text(cameraCenterX, cameraCenterY - 15, 'GAME OVER', 
                { fontSize: '32px', fill: '#FF0000' })
                .setOrigin(0.5)
                .setResolution(5)
            this.add.text(cameraCenterX, cameraCenterY + 25, 'R to Restart', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5)
            this.add.text(cameraCenterX, cameraCenterY + 35, 'M to go to Menu', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5)
    
            // Restart the game when 'R' is pressed
            this.input.keyboard.once('keydown-R', () => {
                this.scene.restart()
            })
    
            // Go to menu when 'M' is pressed
            this.input.keyboard.once('keydown-M', () => {
                this.scene.start('menuScene')
            })
        }
    }

    gameWin() {
        if (!this.gameOverFlag) {  // Prevent multiple triggers
            this.gameOverFlag = true
            this.physics.pause()
            //console.log("You Win!")
    
            // Stop player movement
            this.player.setVelocity(0, 0)
            this.player.setActive(false).setVisible(false)
    
            // Stop all enemy movements
            this.cherries.children.iterate(cherry => cherry.setVelocityX(0))
            this.birds.children.iterate(bird => bird.setVelocityX(0))
    
            // Get the camera's center position
            const camera = this.cameras.main
            const cameraCenterX = camera.worldView.centerX
            const cameraCenterY = camera.worldView.centerY
    
            // Display a "Game Over" message at the center of the camera
            this.add.text(cameraCenterX, cameraCenterY - 15, 'You Win', 
                { fontSize: '32px', fill: '#008000' })
                .setOrigin(0.5)
                .setResolution(5)
            this.add.text(cameraCenterX, cameraCenterY + 25, 'R to Restart', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5)
            this.add.text(cameraCenterX, cameraCenterY + 35, 'M to go to Menu', 
                { fontSize: '10px', fill: '#fff' })
                .setOrigin(0.5)
                .setResolution(5)
    
            // Restart the game when 'R' is pressed
            this.input.keyboard.once('keydown-R', () => {
                this.scene.restart()
            })
    
            // Go to menu when 'M' is pressed
            this.input.keyboard.once('keydown-M', () => {
                this.scene.start('menuScene')
            })
        }
    }

    updateAmmoDisplay() {
        this.ammoIcons.forEach((icon, index) => {
            icon.setVisible(index < this.ammo) // Show only available ammo
        })
    }

    handleOneWayPlatformCollision(player, platform) {
        // If player is crouching and pressing down, allow passing through
        if (this.isCrouching && this.cursors.down.isDown) {
            // Reset the player's position above the platform and disable collision temporarily
            player.setVelocityY(0); // Prevents sudden drop
            player.y = player.y +4//platform.y + 15//platform.height; // Position player just below the platform
            player.body.checkCollision.down = false; // Allow passing through
        } else if (player.body.touching.down && !this.isCrouching) {
            player.body.checkCollision.down = true; // Normal collision behavior when not crouching
        }
    }
    

    handlePlatformCollision(player, platform) {
        if (player.body.y < platform.body.top) {
            player.y = platform.body.top;
            player.body.velocity.y = 0;
        }
    }

}
