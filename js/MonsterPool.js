'use strict';

function MonsterPool(game,config) {
  var types = config.types;
  var bloods = config.bloods;

  Phaser.Group.call(this, game);
  for (var i = 0; i < 30; i++) {
    var type = types[i%2];
    this.add(new Monster(game, type, bloods,config.scaleX||1,1));
  }
}
MonsterPool.prototype = Object.create(Phaser.Group.prototype);
MonsterPool.prototype.constructor = MonsterPool;
