define(function(require, exports, module){
	var appConfig = require('src/config');
	var common = require('src/view/common');
	var BgLayer = require('cqwrap/layers').BgLayer,
		audio = require('cqwrap/audio'),
		BaseScene = require('cqwrap/scenes').BaseScene;

	var scene = BaseScene.extend({
		ctor: function(bgPath) {
			this.bgPath = bgPath;
			this._super();
		},
		init: function () {
			this._super();

			if (this.plistRes instanceof Array) {
				this.plistRes.push({
					plist: appConfig.g_resources['other'][0].src,
					png: appConfig.g_resources['other'][1].src
				});

				var cache = cc.SpriteFrameCache.getInstance();
				this.plistRes.forEach(function(item){
					cache._plist = cache._plist || [];
					if (cache._plist[item.plist]) {return;}

					cache._plist[item.plist] = true;
					cache.addSpriteFrames(item.plist, item.png);
				});
			}

			if (!!this.bgPath) {
				var bgLayer = new BgLayer(this.bgPath);
				this.addChild(bgLayer);
			}

			if (this.SheepLayer) {
				var layer = new this.SheepLayer();
				this.addChild(layer);

				if (this.audioRes.length > 0) {
					this.audioRes.forEach(function(item){
						audio.preloadEffect(item);
					});

					var size = global.director.getWinSize();
					var audioBtn = common.audioBtn.create();
					audioBtn.setStyle('xy', [size.width - 45, size.height - 20]);

					audioBtn.on('click', function(touch, target, self){
						appConfig.subscribe.triggerHandler('click', {target: 'audioBtn'});
					});

					layer.addChild(audioBtn);
				}
			}

		},
		SheepLayer: null,
		plistRes: [],
		audioRes: []
	});

	module.exports = scene;
});