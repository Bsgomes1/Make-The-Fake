// Name: Ben Gomes
// Title: 
// Time: 

// Sources: ChatGPT for when I was stuck, 
// kenney.nl for sounds, 


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
        debug: true,
      }
    },
    zoom: 1,
    scene: [ Menu, Play ]
    //, Play, Credits ]
  }

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3