define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var base = require('src/view/base'),
		GameLayer = require('cqwrap/layers').GameLayer,
		audio = require('cqwrap/audio'),
		AnimationTask = require('cqwrap/animate').AnimationTask;

	// var resPath = appConfig.resPathMap['sunday'] || appConfig.resPath + 'sunday/';
	var resPath = 'warn/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();
			var isUrl = false, url = 'http://www.weather.com.cn/alarm/newalarmlist.shtml';

			// tips
			var tips = common.tipsSprite.create();
			var bubble0,bubble1,label,tipsIndex = 0;
			if (tips) {
				var temp = tips.getChildren();
				bubble0 = temp[0];
				bubble1 = temp[1];
				label = bubble1.getChildren()[1];

				bubble0.setStyle('opacity', 0);
				// bubble1.setStyle('opacity', 0);
				tips.setStyle('xy', [size.width*0.68|0, size.height*0.40|0]);
				label.setStyle('color', 'white');

			}

			// 羊
			var sheep = cc.createSprite({
				texture: resPath+'speak-0.png',
				anchor: [0.5, 0.2],
				xy: [size.width*0.88, size.height*0.25]
			});

			// point
			var point = common.pointSprite.create();
			point.setStyle('xy', [size.width*0.88, size.height*0.2]);

			// Task
			var speakTask = new AnimationTask()
				.then(function(){
					label.setString(appConfig.alert.replace(/\\n/g,'\n'));
					isUrl = false;
				})
				.animate(0.5,resPath+'speak-%d.png',0,3)
				.repeat(10,1)
				.animate(0.4,resPath+'speak-%d.png',4,5)
				.repeat(10,1)
				.repeat();
			var clickTask = new AnimationTask()
				.then(function(){
					label.setString('    你“造”吗\n点这可以看全国\n    天气预警>>');
					isUrl = true;
				})
				.animate(0.4,resPath+'click-%d.png',0,1)
				.repeat(10,1)
				.then(function(sprite){
					sprite.act(speakTask);
				});

			// add sprite
			this.addChild(sheep);

			this.addChild(point);

			sheep.act(speakTask);
			point.act();

			this.delegate(sheep);

			sheep.on('click', function(touch, target, self){

				sheep.stopAllActions();
				if (isUrl) {
					sheep.act(speakTask);
				} else {
					sheep.act(clickTask);
				}

				point.removeFromParent();

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
					var e = {target: 'tips'};
					if (isUrl) {
						e.url = url;
					}
					bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', e);
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
				plist: appConfig.g_resources['warnScene'][0].src,
				png: appConfig.g_resources['warnScene'][1].src
			}
		],
		audioRes: []
	});

	module.exports = scene;
});