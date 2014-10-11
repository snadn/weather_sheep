define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var layers = require('cqwrap/layers'),
		// audio = require('cqwrap/audio'),
		BaseScene = require('cqwrap/scenes').BaseScene,
		AnimationTask = require('cqwrap/animate').AnimationTask;

	var GameLayer = layers.GameLayer, BgLayer = layers.BgLayer;

	// var resPath = appConfig.resPath + 'dustday/';

	var SheepLayer = GameLayer.extend({
		init: function(){
			this._super();

			var size = global.director.getWinSize();

			// tips
			var tipsConf = appConfig.tips['dustday'];
			var tips = common.tipsSprite.create(tipsConf);
			if (!tips || (!tipsConf || !tipsConf[0])) {
				return;
			}

			var bubble1 = tips.getChildren()[1],
				label = bubble1.getChildren()[1];

			label.setString(tipsConf[0].text.replace(/\\n/g,'\n'));

			tips.setStyle('xy', [size.width*0.62|0, size.height*0.5|0]);

			// var sheep = cc.createSprite({
			// 	anchor: [0.5, 0],
			// 	xy: [size.width*0.84, 50],
			// 	width: 70,
			// 	height: 100,
			// 	opacity: 0
			// });

			// point
			// var point = common.pointSprite.create();
			// point.setStyle('xy', [size.width*0.83, size.height*0.2]);

			// this.addChild(sheep);
			this.addChild(tips);
			// this.addChild(point);

			// point.act();

			// this.delegate(sheep);
			this.delegate(tips);

			// sheep.on('click', function(touch, target, self){
			// 	point.stopAllActions();
			// 	point.setStyle('opacity', 0);

			// 	this.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', {target: 'sheep'});
			// }).on('mouseenter', function(touch, target, self){
			// 	this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseenter', {target: 'sheep'});
			// }).on('mouseleave', function(touch, target, self){
			// 	this.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseleave', {target: 'sheep'});
			// });

			tips.on('click', function(touch, target, self){
				bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('click', {target: 'tips'});
			}).on('mouseenter', function(touch, target, self){
				bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseenter', {target: 'tips'});
			}).on('mouseleave', function(touch, target, self){
				bubble1.getStyle('opacity') && appConfig.subscribe.triggerHandler('mouseleave', {target: 'tips'});
			});

		}
	});

	var scene = BaseScene.extend({
		ctor: function(bgPath) {
			this.bgPath = bgPath;
			this._super();
		},
		init: function () {
			this._super();
			var bgLayer;
			if (!!this.bgPath) {
				bgLayer = new BgLayer(this.bgPath);
			} else {
				bgLayer = new BgLayer(appConf.bgScenePath + '1-29.png');
			}
			this.addChild(bgLayer);

			var layer = new SheepLayer();
			this.addChild(layer);
		}
	});

	module.exports = scene;
});