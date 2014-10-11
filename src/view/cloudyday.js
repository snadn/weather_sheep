define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['cloudyday'] || appConfig.resPath + 'cloudyday/';
	var resPath = 'cloudyday/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			var cloud0 = cc.createSprite({
				texture: resPath+'cloud-0.png',
				anchor: [0.5, 0.5],
				xy: [size.width*0.7, size.height*0.74]
			});
			var cloud1 = cc.createSprite({
				texture: resPath+'cloud-1.png',
				anchor: [0.5, 0.5],
				xy: [size.width*0.9, size.height*0.75]
			});
			var cloud2 = cc.createSprite({
				texture: resPath+'cloud-2.png',
				anchor: [0.5, 0.4],
				xy: [0,0]
			});
			var cloud3 = cc.createSprite({
				texture: resPath+'cloud-4.png rect(0,0,85,24)',
				anchor: [0, 1],
				xy: [0, cloud2.getStyle('height')]
			});

			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'flow-0.png',
				anchor: [0.5, 0.32],
				xy: [2,0],
			});

			var flowWrap = cc.createSprite({
				anchor: [0.5, 0.5],
				xy: [size.width*0.8, size.height*0.8]
			});

			var bird = cc.createSprite({
				texture: resPath+'bird-0.png',
				anchor: [0.20,0.60],
				xy: [size.width+50, size.height*0.7],
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.80, size.height*0.7]);

			// Task
			var birdflyTask = new AnimationTask().animate(0.2, resPath+'bird-0.png', resPath+'bird-1.png').repeat();
			var birdmoveTask = new AnimationTask()
				.moveTo(0.5, flowWrap.getStyle('xy'))
				.then(function(sprite){
					sprite.stop(birdflyTask);
				})
				.animate(0.3, resPath+'bird-2.png', resPath+'bird-3.png').repeat(2,1)
				.then(function(sprite){
					sprite.act(birdflyTask);
					sheep.act(sheepdownTask);
				})
				.moveTo(0.5, cc.p(size.width*0.6, size.height+50))
				.then(function(sprite){
					sprite.setStyle('xy', [size.width+50, size.height*0.7]);
				});

			var sheepdownTask = new AnimationTask()
				.then(function(sprite){
					sprite.setStyle('y', -15);
				})
				.animate(0.2,resPath+'click-%d.png',0,1).repeat(6,1)
				.then(function(sprite){
					sprite.setStyle('texture', resPath+'click-2.png');
					sprite.setStyle('y', -18);
					cloud2.moveBy(3, cc.p(0,-30), cc.EaseIn, 2).act();
					cloud3.delay(2).slideTo(1, 40).fadeOut(3).then(function(cloud3){
						cloud3.setTextureRect(cc.rect(0,0,85,24));
						cloud3.setStyle('opacity', 255);
					}).act();
					// audio.playEffect('http://s0.qhimg.com/share/audio/onebox/down.mp3');
				})
				.moveBy(3, cc.p(0,-50), cc.EaseIn, 2)
				.delay(0.2)
				.then(function(sprite){
					sprite.setStyle('texture', resPath+'click-3.png');
				})
				.moveBy(0.4, cc.p(0,-60), cc.EaseIn, 2)
				.animate(0.9,resPath+'click-%d.png',4,6)
				.delay(0.4)
				.animate(1,resPath+'click-%d.png',7,7)
				.animate(0.4,resPath+'click-%d.png',8,9).repeat(5,1)
				.animate(0.9,resPath+'click-%d.png',10,12)
				.delay(0.3)
				.then(function(sprite){
					sprite.setStyle('texture', resPath+'click-13.png');
				})
				.delay(0.5)
				.then(function(sprite){
					sprite.moveBy(0.2, cc.p(0,75), cc.EaseIn, 2).act();
				})
				.animate(0.2,resPath+'click-%d.png',14,15)
				.delay(0.4)
				.then(function(sprite){
					cloud2.moveBy(0.1, cc.p(0,-5)).act();
					sprite.setStyle('texture', resPath+'click-16.png')
				})
				.moveBy(0.1, cc.p(0,10), cc.EaseOut, 2)
				.delay(0.2)
				.then(function(sprite){
					cloud2.moveBy(1, cc.p(0,35)).act();
				})
				.moveBy(1, cc.p(0,35))
				.delay(0.5)
				.then(function(sprite){
					sprite.setStyle('texture', resPath+'flow-0.png');
					sprite.setStyle('y', 0);
					flowWrap.resumeSchedulerAndActions();
				});


			// add sprite
			this.addChild(cloud0);
			this.addChild(cloud1);
			cloud2.addChild(cloud3);

			flowWrap.addChild(cloud2);
			flowWrap.addChild(sheep);
			this.addChild(flowWrap);

			this.addChild(bird);
			this.addChild(point);

			// act
			cloud0.moveBy(6, cc.p(-14,0)).moveBy(6, cc.p(14,0)).repeat().act();
			cloud1.moveBy(4, cc.p(12,0)).moveBy(4, cc.p(-12,0)).repeat().act();
			flowWrap.moveBy(3, cc.p(10,0)).moveBy(3, cc.p(-10,0)).repeat().act();
			bird.act(birdflyTask);
			point.act();


			this.delegate(sheep);
			sheep.on('click', function(touch, target, self){

				// init
				flowWrap.pauseSchedulerAndActions();
				flowWrap.setStyle('y', size.height*0.8);

				sheep.stopAllActions();
				sheep.setStyle('xy', [2,0]);
				sheep.setStyle('texture', resPath+'flow-0.png');

				cloud2.stopAllActions();
				cloud2.setStyle('xy', [0,0])

				bird.stopAllActions();
				bird.act(birdflyTask);
				bird.act(birdmoveTask);

				point.stopAllActions();
				point.removeFromParent(true);

				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', {target: 'sheep'});
			}).on('mouseenter', function(touch, target, self){
				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseenter', {target: 'sheep'});
			}).on('mouseleave', function(touch, target, self){
				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseleave', {target: 'sheep'});
			});

		}
	});

	var scene = base.extend({
		SheepLayer: SheepLayer,
		plistRes: [
			{
				plist: appConfig.g_resources['cloudyday'][0].src,
				png: appConfig.g_resources['cloudyday'][1].src
			}
		],
		audioRes: [
			// 'http://s0.qhimg.com/share/audio/onebox/down.mp3'
		]
	});

	module.exports = scene;
});