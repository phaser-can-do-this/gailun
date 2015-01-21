'use strict';

function Hero(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'roles');

  this.scale.setTo(0.8);
  this.anchor.setTo(0.5);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(150, 150);

  this.animations.add('attack',
    Phaser.Animation.generateFrameNames('role', 2, 9, '.png', 4), 15,
    true, false);
  this.animations.add('die',
    Phaser.Animation.generateFrameNames('role', 10, 42, '.png', 4), 15,
    false, false);

  this.animations.play('attack');
  this.checkWorldBounds = true;
  this.canAttack = true;

  this.targets = [];
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.die = function() {
  this.animations.play('die');
  this.canAttack = false;

};

Hero.prototype.update = function() {

  var pos = this.position;

  if (this.targets.length > 0 && this.canAttack) {
    var p = this.targets[0];
    var dis = pos.distance(p, true);
    if (dis <= 6) {
      this.targets.shift();
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      return;
    } else {
      this.game.physics.arcade.moveToXY(this, p.x, p.y, 300);
    }
  }
};