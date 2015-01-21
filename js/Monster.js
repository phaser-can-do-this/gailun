'use strict';

function Monster(game, type, bloods,scaleX,scaleY) {
  type = type || 1;
  scaleX = scaleX ||1;
  scaleY = scaleY ||1;
  this.bloods = bloods;
  Phaser.Sprite.call(this, game, 0, 0, 'roles');
  this.animations.add('walk',
    Phaser.Animation.generateFrameNames('npc' + type, 1, 6, '.png', 4),
    5, true, false);

  this.kill();
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(50, 50);
  this.anchor.setTo(0.5);
  this.scale.setTo(0.6*scaleX,0.6*scaleY);
  this.animations.play('walk');
}

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;


Monster.prototype.attackFrom = function(target,x,y) {
  this.reset(x,y,1);
  this.game.physics.arcade.moveToObject(this,target,100);
};

Monster.prototype.die = function() {
  this.kill();
  console.log('die');
  var blood = this.bloods.getFirstDead();
  blood.reset(this.x,this.y,1);
  blood.animations.play('play');
};