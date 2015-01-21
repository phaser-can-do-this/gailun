'use strict';
var Intro = function(game) {};

Intro.prototype = {
  init: function() {
    //something before preload
  },

  preload: function() {

    this.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too\
    this.game.scale.setShowAll();
    this.game.scale.refresh();

  },

  create: function() {

    this.intro = this.add.sprite(
      this.world.centerX,
      this.world.centerY - 80, 'ui', 'gameintro.png');
    this.intro.anchor.setTo(0.5, 0.5);
    this.intro.scale.setTo(0.4);

    var onCLick = function() {
      this.state.start('GameBoard');
      console.log('onclick ', this.rnd.integerInRange(100, 200));
    };

    this.startButton =
      this.add.button(this.world.centerX, this.world.centerY + 80, 'ui',
        onCLick, this, 'start.png', 'start.png', 'start.png');
    this.startButton.anchor.setTo(0.5);
    this.startButton.scale.setTo(0.4);
  },

  update: function() {}
};