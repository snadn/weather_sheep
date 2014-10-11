define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['sunday'] || appConfig.resPath + 'sunday/';
	var resPath = 'sunday/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			// tips
			var tips = common.tipsSprite.create();
			var bubble0,bubble1,label,tipsIndex = 0;
			if (tips) {
				var temp = tips.getChildren();
				bubble0 = temp[0];
				bubble1 = temp[1];
				label = bubble1.getChildren()[1];

				bubble0.setStyle('opacity', 0);
				bubble1.setStyle('opacity', 0);
				tips.setStyle('xy', [size.width*0.58|0, size.height*0.44|0]);

			}

			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'eat-0.png',
				anchor: [0.5, 0.2],
				xy: [size.width*0.8, size.height*0.18]
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.80, size.height*0.2]);

			// Task
			var eatTask = new AnimationTask()
				.animate(0.8,resPath+'eat-%d.png',0,1).repeat(3,1)
				.animate(0.8,resPath+'eat-%d.png',2,3)
				.repeat();

			var laughTask = new AnimationTask()
				.animate(0.5,resPath+'laugh-%d.png',0,4)
				.then(function(sprite){
					bubble0 && bubble0.fadeIn(0.8).act();
					bubble1 && bubble1.delay(0.2).then(function(){
						tipsIndex = common.setTipsLabel('sunday', label, tipsIndex);
					}).fadeIn(0.6).act();
				})
				.animate(0.4,resPath+'laugh-%d.png',5,8).repeat(2, 1)
				.animate(0.6,resPath+'speak-%d.png',0,1).repeat(8, 1)
				.then(function(sprite){
					bubble0 && bubble0.fadeOut(0.8).act();
					bubble1 && bubble1.delay(0.2).fadeOut(0.6).act();
				})
				.animate(0.8,resPath+'eat-%d.png',4,5)
				.then(function(sprite){
					sprite.act(eatTask);
				});

			// add sprite
			this.addChild(sheep);

			this.addChild(point);

			sheep.act(eatTask);
			
			point.act();

			this.delegate(sheep);

			sheep.on('click', function(touch, target, self){
				bubble0 && bubble0.stopAllActions();
				bubble1 && bubble1.stopAllActions();

				sheep.stopAllActions();
				sheep.act(laughTask);

				point.stopAllActions();
				point.setStyle('opacity', 0);

				audio.playEffect(appConfig.resAudioPath+'m.mp3');

				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', {target: 'sheep'});
			}).on('mouseenter', function(touch, target, self){
				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseenter', {target: 'sheep'});
			}).on('mouseleave', function(touch, target, self){
				this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseleave', {target: 'sheep'});
			});

			if (tips) {
				this.addChild(tips);
				this.delegate(tips);
				tips.on('click', function(touch, target, self){
					bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', {target: 'tips'});
				}).on('mouseenter', function(touch, target, self){
					bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseenter', {target: 'tips'});
				}).on('mouseleave', function(touch, target, self){
					bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseleave', {target: 'tips'});
				});
			}

		}
	});

	var scene = base.extend({
		SheepLayer: SheepLayer,
		plistRes: [
			{
				plist: appConfig.g_resources['sunday'][0].src,
				png: appConfig.g_resources['sunday'][1].src
			}
		],
		audioRes: [
			appConfig.resAudioPath+'m.mp3'
		]
	});

	module.exports = scene;
});