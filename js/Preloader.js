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