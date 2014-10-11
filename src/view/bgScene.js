define(function(require, exports, module){
	var BgLayer = require('cqwrap/layers').BgLayer,
		BaseScene = require('cqwrap/scenes').BaseScene;

	var scene = BaseScene.extend({
		ctor: function(bgPath) {
			this.bgPath = bgPath;
			this._super();
		},
		init:function (type) {
			this._super();

			if (!!this.bgPath) {
				bgLayer = new BgLayer(this.bgPath);
				this.addChild(bgLayer);
			}
			
		}
	});

	module.exports = scene;
});