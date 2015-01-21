'use strict';
var Boost = function(game) {};

Boost.prototype = {
  preload: function() {

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageVertically = true;
    this.game.scale.setScreenSize(true);
    this.game.scale.setShowAll();
    this.game.scale.refresh();


    this.load.image('splash', 'res/thumb.png');
    this.load.image('barBack', 'res/pbback.png');
    this.load.image('barFront', 'res/pbfront.png');
  },

  create: function() {
    this.state.start('Preloader');
  }

};