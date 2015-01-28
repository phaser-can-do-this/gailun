'use strict';
window.onload = function() {


  var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game');
  // For Debug
  window.game = game;

  game.state.add('Boost', require('./Boost.js'));
  game.state.add('Preloader', require('./Preloader.js'));
  game.state.add('Intro', require('./Intro.js'));
  game.state.add('GameBoard', require('./GameBoard.js'));
  game.state.start('Boost');
};