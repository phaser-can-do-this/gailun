'use strict';
var GameBoard = function(game) {};

GameBoard.prototype = {
  init: function() {
    //something before preload
  },

  preload: function() {
    this.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL; //resize your window to see the stage resize too\
    this.game.scale.setShowAll();
    this.game.scale.refresh();

  },

  create: function() {
    this.backgroud = this.add.image(
      this.world.centerX,
      this.world.centerY, 'backgroud');

    this.physics.startSystem(Phaser.Physics.ARCADE);


    this.backgroud.anchor.setTo(0.5);

    this.light = this.add.sprite(this.world.centerX, this.world.centerY,
      'light', 'ta0001.png');
    this.physics.enable(this.light, Phaser.Physics.ARCADE);
    this.light.anchor.setTo(0.5);
    this.light.scale.setTo(0.4);
    this.light.body.immovable = true;
    this.light.body.setSize(20, 20);

    this.circle = this.add.sprite(this.world.centerX, this.world.centerY,
      'ui',
      'quan.png'
    );
    this.circle.anchor.setTo(0.5);
    this.circle.scale.setTo(0.5);


    this.hero = this.add.sprite(100, 300, 'roles');
    this.hero.scale.setTo(0.8);
    this.hero.anchor.setTo(0.4);
    this.physics.enable(this.hero, Phaser.Physics.ARCADE);
    this.hero.body.setSize(150, 150);

    this.hero.animations.add('attack',
      Phaser.Animation.generateFrameNames('role', 2, 9, '.png', 4), 15,
      true, false);
    this.hero.animations.add('die',
      Phaser.Animation.generateFrameNames('role', 10, 42, '.png', 4), 15,
      true, false);

    this.hero.animations.play('attack');
    this.hero.checkWorldBounds = true;

    this.hero.targets = [];

    var self = this;
    this.hero.update = function() {

      var pos = self.hero.position;

      if (self.hero.targets.length > 0) {
        var p = self.hero.targets[0];
        var dis = pos.distance(p, true);
        if (dis <= 5) {
          console.log('pop', dis,self.hero.targets.length,p, pos);
          self.hero.targets.shift();
          self.hero.body.velocity.x = 0;
          self.hero.body.velocity.y = 0;
          return;
        } else {
          self.physics.arcade.moveToXY(self.hero, p.x, p.y, 300);
        }
      }
    };

  },

  update: function() {

    this.physics.arcade.collide(this.hero, this.light,
      function(hero, light) {
        var hp = hero.position;
        var lp = light.position;
        var target = hero.targets[0];
        var dx=0;
        var dy=0;
        hero.body.velocity.setTo(0,0);

        if(Math.abs(hp.x-lp.x)===85){
          dx = 0;
          var ydiff = target.y - hp.y;
          if(ydiff>0){
            dy = -hp.y +lp.y + (151+21)/2;
          }else{
            dy = -(151+21)/2 -hp.y+lp.y;
          }

        }

        var direct = new Phaser.Point(dx,dy);
        console.log('>',Math.abs(hp.x-lp.x),direct);

        if(hero.targets.length===1){
          hero.targets.unshift(Phaser.Point.add(direct,hp));
        }else{
          // hero.targets[0] = Phaser.Point.add(direct,hp);
        }
        // callback when overlaped

      }, null, this);
    if (this.input.mousePointer.isDown) {
      console.log('click');
      this.hero.targets[0] = this.input.activePointer.position.clone();
    }

  },
  render: function() {
    // Sprite debug info
    // this.game.debug.spriteInfo(this.hero, 32, 32);
    // body debug info
    this.game.debug.body(this.hero);
    this.game.debug.body(this.light);
    // input debug info
    this.game.debug.inputInfo(69, 60);
    // camera debug info
    // this.game.debug.cameraInfo(32,32);
  }

};