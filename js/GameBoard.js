'use strict';
var GameBoard = function(game) {};

GameBoard.prototype = {
  init: function() {
    //something before preload
  },

  preload: function() {


    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    // this.game.scale.pageAlignVertically = true;
    // this.game.scale.pageVertically = true;
    //             this.game.scale.setScreenSize(true);
    //             this.game.scale.setShowAll();
    //             this.game.scale.refresh();


    this.stage.maxWidth = 600;
    this.stage.maxHeight = 800;
    this.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too\
    this.game.scale.setShowAll();
    this.game.scale.refresh();

  },

  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.backgroud = this.add.image(
      this.world.centerX, this.world.centerY, 'backgroud');
    this.backgroud.anchor.setTo(0.5);

    this.bloods = this.add.group();

    for (var i = 0; i < 30; i++) {

      var blood = this.add.sprite(100, 100, 'blood');
      blood.animations.add('play',
        Phaser.Animation.generateFrameNames('blood', 1, 9, '.png', 4), 10,
        false, false).killOnComplete = true;
      blood.scale.setTo(0.5);
      blood.anchor.setTo(0, 0.5);
      blood.rotation = 0;
      blood.kill();
      this.bloods.add(blood);
    }

    this.topLeft = this.add.group();
    for (var i = 0; i < 20; i++) {
      var type = i % 2 ? 1 : 3;
      this.topLeft.add(new Monster(this.game, type, this.bloods));
    }

    this.topRight = this.add.group();
    for (i = 0; i < 20; i++) {
      var type = i % 2 ? 1 : 3;
      this.topRight.add(new Monster(this.game, type, this.bloods, -1, 1));
    }

    this.bottomLeft = this.add.group();
    for (i = 0; i < 20; i++) {
      var type = i % 2 ? 2 : 4;
      this.bottomLeft.add(new Monster(this.game, type, this.bloods));
    }

    this.bottomRight = this.add.group();
    for (i = 0; i < 20; i++) {
      var type = i % 2 ? 2 : 4;
      this.bottomRight.add(new Monster(this.game, type, this.bloods, -1, 1));
    }



    this.light = this.add.sprite(this.world.centerX, this.world.centerY,
      'light', 'ta0001.png');
    this.light.scale.setTo(0.4);
    this.light.anchor.setTo(0.5);
    this.physics.enable(this.light, Phaser.Physics.ARCADE);
    this.light.body.immovable = true;
    this.light.body.setSize(20, 20);

    this.circle = this.add.sprite(this.world.centerX, this.world.centerY,
      'ui',
      'quan.png'
    );
    this.circle.anchor.setTo(0.5);
    this.circle.scale.setTo(0.5);

    this.topLeft.getFirstDead().attackFrom(this.light, 10, 10, 1);
    this.topRight.getFirstDead().attackFrom(this.light, 300, 10, 1);
    this.bottomLeft.getFirstDead().attackFrom(this.light, 10, 490, 1);
    this.bottomRight.getFirstDead().attackFrom(this.light, 300, 490, 1);


    this.hero = new Hero(this.game, 100, 300);
    this.add.existing(this.hero);
  },

  update: function() {

    this.physics.arcade.collide(this.hero, this.light,
      function(hero, light) {
        var hp = hero.position;
        var lp = light.position;
        var target = hero.targets[0];
        var dx = 0;
        var dy = 0;
        var totalWidth = hero.body.width + light.body.width;
        var totalHeight = hero.body.height + light.body.height;

        if (Math.round(Math.abs(hp.x - lp.x) * 2) === totalWidth) {
          var ydiff = target.y - hp.y;
          dy = -hp.y + lp.y + ydiff / Math.abs(ydiff) * (totalWidth) /
            2;
          dy *= 1.10;
        } else if (Math.round(Math.abs(hp.y - lp.y) * 2) === totalHeight) {
          var xdiff = target.x - hp.x;
          dx = -hp.x + lp.x + xdiff / Math.abs(xdiff) * (totalHeight) /
            2;
          dx *= 1.10;
        }

        if (dx !== 0 || dy !== 0) {
          var direct = new Phaser.Point(dx, dy);
          if (hero.targets.length === 1) {
            hero.targets.unshift(Phaser.Point.add(direct, hp));
          }
        }

      }, null, this);

    this.physics.arcade.collide(this.monster, this.light,
      function(monster, obj2) {
        // callback  when overlaped
        monster.body.velocity.x = 0;
        monster.body.velocity.y = 0;

      }, null, this);

    this.physics.arcade.collide(this.light, this.topLeft, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.light, this.topRight, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.light, this.bottomLeft, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.light, this.bottomRight, this.onHitLight,
      null, this);

    this.physics.arcade.collide(this.hero, this.topLeft, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.hero, this.topRight, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.hero, this.bottomLeft, this.onHitLight,
      null, this);
    this.physics.arcade.collide(this.hero, this.bottomRight, this.onHitLight,
      null, this);



    if (this.input.mousePointer.isDown) {

      var center = new Phaser.Point(this.world.centerX, this.world.centerY);

      var p = this.input.activePointer.position.clone();

      var diff = Phaser.Point.subtract(p, center);

      if (diff.getMagnitude() < 110) {
        diff.setMagnitude(110);
        p = Phaser.Point.add(center, diff);
      }

      this.hero.targets = [p];
    }

  },

  onHitLight: function(light, monster) {
    monster.die();
    // this.hero.die();
  },

  render: function() {
    // Sprite debug info
    // this.game.debug.spriteInfo(this.hero, 32, 32);
    // body debug info
    // this.game.debug.body(this.monster);
    // this.game.debug.body(this.light);
    // input debug info
    // this.game.debug.inputInfo(69, 60);
    // camera debug info
    // this.game.debug.cameraInfo(32,32);
  }

};