class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Credits', {
            fontFamily: 'Ink Free',
            fontSize: '50px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

        let creditsText = `
        Game Developer: Ben Gomes
        Characters and Ideas from Phineas and Ferb 
        Sound Effects: kenny.nl, Custom, FreeSoundEffectsForEditing
        Background Music: See You Soon - Otis McDonald on Soundcloud and Youtube
        Game Engine: Phaser 3
        `

        this.add.text(game.config.width / 2, game.config.height / 2, creditsText, {
            fontFamily: 'Ink Free',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)

        this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Spacebar to return to menu', {
            fontFamily: 'Ink Free',
            fontSize: '28px',
            color: '#FF0000'
        }).setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('menuScene')
        })
    }
}
