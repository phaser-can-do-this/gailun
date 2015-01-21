'use strict';
var Preloader = function(game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

Preloader.prototype = {

  preload: function() {

    this.add.image(this.world.centerX, this.world.centerY-100, 'splash').anchor.setTo(0.5);
    this.add.image(this.world.centerX-128, this.world.centerY+20, 'barBack');
    this.bar = this.add.image(this.world.centerX-128, this.world.centerY+20, 'barFront');
    this.load.setPreloadSprite(this.bar);

    this.load.image('backgroud', 'res/gamebg.png');
    this.load.atlasJSONHash('blood', 'res/blood.png', 'res/blood.json');
    this.load.atlasJSONHash('roles', 'res/roles.png', 'res/roles.json');
    this.load.atlasJSONHash('ui', 'res/gameui.png', 'res/gameui.json');
    this.load.atlasJSONHash('light', 'res/light.png', 'res/light.json') ;
  },

  create: function() {
    console.log('createed ');
    console.log(this);
    this.stage.setBackgroundColor('#191919');

    this.blood = this.add.sprite(100, 100, 'blood');
    this.blood.animations.add('play',
      Phaser.Animation.generateFrameNames('blood', 1, 9, '.png', 4), 10,
      true, false);
    this.blood.scale.setTo(0.5);
    this.blood.anchor.setTo(0, 0.5);
    // this.state.start('Menu');
    console.log(this.blood);
    this.blood.rotation = 0;
    // this.blood.animations.play('play');

    this.blood2 = this.add.sprite(100, 100, 'blood');
    this.blood2.animations.add('play',
      Phaser.Animation.generateFrameNames('blood', 1, 9, '.png', 4), 10,
      true, false);
    this.blood2.scale.setTo(0.5);
    this.blood2.anchor.setTo(0, 0.5);
    // this.state.start('Menu');
    console.log(this.blood2);
    this.blood2.angle = 90;
    // this.blood2.animations.play('play');

    this.hero = this.add.sprite(100, 200, 'roles');
    this.hero.scale.setTo(0.8);
    this.hero.animations.add('attack',
      Phaser.Animation.generateFrameNames('role', 2, 9, '.png', 4), 15,
      true, false);
    this.hero.animations.add('die',
      Phaser.Animation.generateFrameNames('role', 10, 42, '.png', 4), 15,
      true, false);

    // this.hero.animations.play('die');
    var self = this;
    this.time.events.loop(
      Phaser.Timer.SECOND * 1,
      function() {
        console.log('runed');
        self.add.tween(self.camera.bounds).to({
          x: 10,
        }, 100, Phaser.Easing.Elastic.Out, true,0)
        .to({x:0},100, Phaser.Easing.In,true,0,true);
      }, this);

  },

  update: function (){
    this.state.start('GameBoard');
  },
  render: function() {
    // Sprite debug info
    this.game.debug.cameraInfo(this.camera, 32, 32);
    // body debug info
    // this.game.debug.cameraInfo(this.bar);
    // input debug info
    // this.game.debug.inputInfo(32, 32);
  }

};