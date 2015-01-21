'use strict';
window.onload = function() {


  var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game');
  // For Debug
  window.game = game;

  game.state.add('Boost', Boost);
  game.state.add('Preloader', Preloader);
  game.state.add('Intro', Intro);
  game.state.add('GameBoard', GameBoard);
  game.state.start('Boost');


};