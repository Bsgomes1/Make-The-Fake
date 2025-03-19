// Name: Ben Gomes
// Title: Jump and Duck
// Time: 

// Sources: ChatGPT for when I was stuck


let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    zoom: 1,
    scene: [ Menu, Play, Credits ]
  }

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3