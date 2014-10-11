define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['sunnight'] || appConfig.resPath + 'sunnight/';
	var resPath = 'sunnight/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			// 星星
			var star0 = cc.createSprite({
				texture: resPath+'star-0.png',
				anchor: [1, 1],
				xy: [size.width*0.88, size.height*0.95]
			});
			var star1 = cc.createSprite({
				texture: resPath+'star-1.png',
				anchor: [1, 1],
				xy: [size.width*0.88, size.height*0.95]
			});

			star0.fadeIn(2).fadeOut(2).repeat().act();
			star1.fadeOut(2).fadeIn(2).repeat().act();

			// 气泡
			var bubble0 = cc.createSprite({
				anchor: [0.5, 0.5],
				xy: [size.width*0.86, size.height*0.48],
				opacity: 0
			});

			var bubble1 = cc.createSprite({
				anchor: [0.5, 0.5],
				xy: [size.width*0.78, size.height*0.56],
				opacity: 0
			});

			var ty0 = cc.DrawNode.create();
			ty0.setStyle('scaleY', 0.6);
			ty0.setStyle('rotate', -20);
			ty0.drawDot(cc.p(0, 0), 8, cc.c4f( 1, 1, 1, 0.2));

			var ty1 = cc.DrawNode.create();
			ty1.setStyle('scaleY', 0.6);
			ty1.drawDot(cc.p(0, 0), 50, cc.c4f( 1, 1, 1, 0.2));

			var tipsIndex = 0;
			var label = cc.createSprite('@', {
				anchor: [0.5, 0.5],
				xy: [0, 0],
				color: '#eee',
				fontSize: 12
			});

			bubble0.addChild(ty0);
			bubble1.addChild(ty1);
			bubble1.addChild(label);
			bubble1.setStyle('opacity', 0);


			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'sleep-0.png',
				anchor: [0.5, 0],
				xy: [size.width*0.85, size.height*0.22]
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.86, size.height*0.26]);

			// task
			var sleepTask = new AnimationTask()
				.animate(1.5,resPath+'sleep-%d.png',0,4)
				.delay(0.2)
				.animate(1.5,resPath+'sleep-%d.png',4,0)
				.delay(0.3)
				.repeat();

			// add sprite
			this.addChild(star0);
			this.addChild(star1);
			this.addChild(sheep);
			this.addChild(point);
			this.addChild(bubble0);
			this.addChild(bubble1);

			// act
			sheep.act(sleepTask);
			point.act();


			this.delegate(sheep);
			sheep.on('click', function(touch, target, self){

				bubble0.stopAllActions();
				bubble1.stopAllActions();

				bubble0.fadeIn(1).delay(4).fadeOut(1).act();
				bubble1.delay(0.5).then(function(){
					tipsIndex = common.setTipsLabel('sunnight', label, tipsIndex);
				}).fadeIn(0.5).delay(4).fadeOut(0.5).act();

				point.stopAllActions();
				point.setStyle('opacity', 0);

				audio.playEffect(appConfig.resAudioPath+'zzz.mp3');

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
				plist: appConfig.g_resources['sunnight'][0].src,
				png: appConfig.g_resources['sunnight'][1].src
			}
		],
		audioRes: [
			appConfig.resAudioPath+'zzz.mp3'
		]
	});

	module.exports = scene;
});