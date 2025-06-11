var snd_touch;
var sceneMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "sceneMenu" });
  },
  init: function () {},
  preload: function () {
    this.load.setBaseURL("assets/");
    // Change these lines:
    this.load.image("BGPlay", "BGPlay.png"); // Was: images/BGPlay.png
    this.load.image("Title", "Title.png");     // Was: images/Title.png
    this.load.image("ButtonPlay", "ButtonPlay.png"); // Was: images/ButtonPlay.png
    this.load.image("ButtonSoundOn", "ButtonSoundOn.png"); // Was: images/ButtonSoundOn.png
    this.load.image("ButtonSoundOff", "ButtonSoundOff.png"); // Was: images/ButtonSoundOff.png
    this.load.image("ButtonMusicOn", "ButtonMusicOn.png"); // Was: images/ButtonMusicOn.png
    this.load.image("ButtonMusicOff", "ButtonMusicOff.png"); // Was: images/ButtonMusicOff.png
    this.load.audio("snd_menu", "music_menu.mp3"); // Was: audio/music_menu.mp3
    this.load.audio("snd_touchshooter", "fx_touch.mp3"); // Was: audio/fx_touch.mp3
  },
  create: function () {
    // Initialize global variables for sound settings if they don't exist
    if (typeof gameSettings === 'undefined') {
      window.gameSettings = {
        isMusicOn: true,
        isSoundOn: true,
        currentMusic: null
      };
    }
    
    // Initialize touch sound if it doesn't exist
    if (snd_touch == null) {
      snd_touch = this.sound.add('snd_touchshooter');
    }
    
    // Create or manage menu music
    if (gameSettings.currentMusic) {
      // Stop any existing music when entering menu
      gameSettings.currentMusic.stop();
      gameSettings.currentMusic = null;
    }
    
    // Create new menu music
    gameSettings.currentMusic = this.sound.add('snd_menu', {
      volume: 0.5,
      loop: true
    });
    
    // Play music if enabled
    if (gameSettings.isMusicOn) {
      gameSettings.currentMusic.play();
    }

    X_POSITION = {
      LEFT: 0,
      CENTER: game.canvas.width / 2,
      RIGHT: game.canvas.width,
    };

    Y_POSITION = {
      TOP: 0,
      CENTER: game.canvas.height / 2,
      BOTTOM: game.canvas.height,
    };

    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, "BGPlay");
    var titleGame = this.add.image(
      X_POSITION.CENTER,
      Y_POSITION.CENTER - 150,
      "Title"
    );
    var buttonPlay = this.add.image(
      X_POSITION.CENTER,
      Y_POSITION.CENTER + 150,
      "ButtonPlay"
    );
    buttonPlay.setInteractive();
    
    // Add music toggle button
    var buttonMusic = this.add.image(
      X_POSITION.RIGHT - 50,
      Y_POSITION.TOP + 50,
      gameSettings.isMusicOn ? "ButtonMusicOn" : "ButtonMusicOff"
    );
    buttonMusic.setInteractive();
    
    // Add sound toggle button
    var buttonSound = this.add.image(
      X_POSITION.RIGHT - 120,
      Y_POSITION.TOP + 50,
      gameSettings.isSoundOn ? "ButtonSoundOn" : "ButtonSoundOff"
    );
    buttonSound.setInteractive();

    // Handle hover effects
    this.input.on(
      "gameobjectover",
      function (pointer, gameObject) {
        gameObject.setTint(0x999999);
      },
      this
    );
    
    this.input.on(
      "gameobjectout",
      function (pointer, gameObject) {
        gameObject.setTint(0xffffff);
      },
      this
    );
    
    // Handle button clicks
    this.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        gameObject.setTint(0xffffff);
        
        if (gameObject === buttonPlay) {
          if (gameSettings.isSoundOn) {
            snd_touch.play();
          }
          this.scene.start("scenePilihHero");
        } 
        else if (gameObject === buttonMusic) {
          gameSettings.isMusicOn = !gameSettings.isMusicOn;
          gameObject.setTexture(gameSettings.isMusicOn ? "ButtonMusicOn" : "ButtonMusicOff");
          
          if (gameSettings.isMusicOn) {
            gameSettings.currentMusic.play();
          } else {
            gameSettings.currentMusic.pause();
          }
          
          if (gameSettings.isSoundOn) {
            snd_touch.play();
          }
        }
        else if (gameObject === buttonSound) {
          gameSettings.isSoundOn = !gameSettings.isSoundOn;
          gameObject.setTexture(gameSettings.isSoundOn ? "ButtonSoundOn" : "ButtonSoundOff");
          
          if (gameSettings.isSoundOn) {
            snd_touch.play();
          }
        }
      },
      this
    );
  },
  update: function () {},
});