define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['overcastday'] || appConfig.resPath + 'overcastday/';
	var resPath = 'overcastday/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'normal-0.png',
				anchor: [0.5, 0.2],
				xy: [size.width*0.8, size.height*0.18]
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.76, size.height*0.2]);
			
			

			// task
			var normalTask = new AnimationTask()
				.animate(3.2,resPath+'normal-%d.png',0,7).repeat();

			var clickTask = new AnimationTask()
				.animate(0.8,resPath+'click-%d.png',0,0)
				.animate(0.5,resPath+'click-%d.png',1,5)
				.delay(0.6)
				.animate(0.6,resPath+'click-%d.png',6,8)
				.then(function(sprite){
					sprite.act(normalTask);
				});

			// add sprite
			this.addChild(sheep);
			this.addChild(point);
			// act
			sheep.act(normalTask);
			point.act();


			this.delegate(sheep);
			sheep.on('click', function(touch, target, self){

				sheep.stopAllActions();
				sheep.act(clickTask);

				point.stopAllActions();
				point.setStyle('opacity', 0);

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
				plist: appConfig.g_resources['overcastday'][0].src,
				png: appConfig.g_resources['overcastday'][1].src
			}
		],
		audioRes: [
		]
	});

	module.exports = scene;
});