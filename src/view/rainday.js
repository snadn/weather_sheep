define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['rainday'] || appConfig.resPath + 'rainday/';
	var resPath = 'rainday/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			// rain
			var rain = new cc.ParticleRain();
			// var rainSpriteFrame = cc.getSpriteFrame('rain.png');
			var rainTexture = cc.TextureCache.getInstance().addImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAASCAYAAACTvBTGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFMzNDOEU1M0EzMDExRTQ4MUY3RjIyN0Q1MzE3OEI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFMzNDOEU2M0EzMDExRTQ4MUY3RjIyN0Q1MzE3OEI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0UzM0M4RTMzQTMwMTFFNDgxRjdGMjI3RDUzMTc4QjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0UzM0M4RTQzQTMwMTFFNDgxRjdGMjI3RDUzMTc4QjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BSTuMAAAAh0lEQVR42mL8//8/w8FztxiAgAeIv9gbqTEwMUCAKBBPA2JWEAcmqAbE1kCsjCwoA8RKQCyHLCgJpaWQBSWgtDSyoBg2QREoLY5NUARZkAdK8yMLciFLwgTZoTQLsuAfKP0PWfAtMg0TvI9MwwTPINMwwT1AfBeId8FtA4KzQGwACmQQByDAAPeIFUeo+XddAAAAAElFTkSuQmCC');

			rain.initWithTotalParticles(500);

			rain.setDrawMode(cc.PARTICLE_TEXTURE_MODE);
			rain.setTexture(rainTexture);
			// 无跨域支持不能用该方法
			// rain.setTextureWithRect(rainSpriteFrame.getTexture(), rainSpriteFrame.getRect());

			rain.setSpeed(350);
			rain.setStartSize(5);
			rain.setStartSizeVar(3);
			rain.setGravity(cc.p(0, -10));
			rain.setAngleVar(0);
			rain.setLife(1);
			rain.setLifeVar(1);
			rain.setEmissionRate(50);
			// rain color
			rain.setStartColor(cc.c4b(192,205,217,1));
			rain.setStartColorVar(cc.c4b(0,0,0,0));
			rain.setEndColor(cc.c4b(192,205,217,0.7));
			rain.setEndColorVar(cc.c4b(0,0,0,0));

			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'normal-0.png',
				anchor: [0.5, 0],
				xy: [size.width*0.84, size.height*0.08]
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.85, size.height*0.2]);

			// task
			var normalTask = new AnimationTask()
				.animate(0.9,resPath+'normal-%d.png',0,2)
				.animate(1,resPath+'normal-%d.png',3,7).repeat(2,1)
				.repeat();

			var clickTask = new AnimationTask()
				.animate(0.2,resPath+'click-%d.png',0,1)
				.animate(0.2,resPath+'click-%d.png',2,3).repeat(5,1)
				.animate(0.4,resPath+'click-%d.png',4,5)
				.then(function(sprite){
					sprite.act(normalTask);
				});

			// add sprite
			this.addChild(rain);
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

				audio.playEffect(appConfig.resAudioPath+'a.mp3');

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
				plist: appConfig.g_resources['rainday'][0].src,
				png: appConfig.g_resources['rainday'][1].src
			}
		],
		audioRes: [
			appConfig.resAudioPath+'a.mp3'
		]
	});

	module.exports = scene;
});