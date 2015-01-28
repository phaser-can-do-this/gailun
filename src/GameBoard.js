'use strict';

var MonsterPool = require('./MonsterPool.js');
var Hero = require('./Hero.js');
var GameBoard = function() {};

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

    // topLeft topRigh bottomLeft bottomRight
    this.poolConfigs = [{
        types: [1, 3],
        bloods: this.bloods,
        scaleX: 1,
      }, {
        types: [1, 3],
        bloods: this.bloods,
        scaleX: -1,
      },

      {
        types: [2, 4],
        bloods: this.bloods,
        scaleX: 1
      }, {
        types: [2, 4],
        bloods: this.bloods,
        scaleX: -1
      }
    ];
    var self = this;
    this.monsterGroups = this.poolConfigs.map(function(config) {
      return new MonsterPool(self.game, config);
    });


    // this.topRight = new MonsterPool(this.game, );

    // this.bottomLeft = new MonsterPool(this.game, );

    // this.bottomRight = new MonsterPool(this.game, );


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

    this.time.events.loop(
      Phaser.Timer.SECOND * 2,
      function() {
        var self = this;
        this.monsterGroups.forEach(function(group) {
          group.getFirstDead().attackFrom(self.light, 10, 10, 1);

        });
      }, this);

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
          // dy *= 1.10;
        } else if (Math.round(Math.abs(hp.y - lp.y) * 2) === totalHeight) {
          var xdiff = target.x - hp.x;
          dx = -hp.x + lp.x + xdiff / Math.abs(xdiff) * (totalHeight) /
            2;
          // dx *= 1.10;
        }

        if (dx !== 0 || dy !== 0) {
          console.log('collide', dx, dy);
          var direct = new Phaser.Point(dx, dy);
          if (hero.targets.length === 1) {
            hero.targets.unshift(Phaser.Point.add(direct, hp));
          }
        }

      }, null, this);

    this.physics.arcade.collide(this.monster, this.light,
      function(monster) {
        // callback  when overlaped
        monster.body.velocity.x = 0;
        monster.body.velocity.y = 0;

      }, null, this);

    var self = this;
    this.monsterGroups.forEach(function(group) {
      self.physics.arcade.collide(self.light, group, self.onHitLight,
        null, self);
    });

    this.monsterGroups.forEach(function(group) {
      self.physics.arcade.collide(self.hero, group, self.onHitLight,
        null, self);
    });

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
    this.game.debug.spriteInfo(this.hero, 32, 32);
    // body debug info
    this.game.debug.body(this.hero);
    // this.game.debug.body(this.light);
    // input debug info
    // this.game.debug.inputInfo(69, 60);
    // camera debug info
    // this.game.debug.cameraInfo(32,32);
  }

};


module.exports = GameBoard;