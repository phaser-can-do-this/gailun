'use strict';
var Boost = function(game) {};

Boost.prototype = {
  preload: function() {

    this.load.image('splash', 'res/thumb.png');
    this.load.image('barBack', 'res/pbback.png');
    this.load.image('barFront', 'res/pbfront.png');
  },

  create: function() {
    this.state.start('Preloader');
  }

};


module.exports = Boost;
