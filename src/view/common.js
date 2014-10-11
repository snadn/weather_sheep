define(function(require, exports, module){
	var appConfig = require('src/config'),
		audio = require('cqwrap/audio'),
		Button = require('cqwrap/buttons').Button;

	module.exports = {
		pointSprite: {
			create: function(){
				// point
				var point = cc.createSprite({
					texture: 'point.png',
					anchor: [0.36, 1],
					opacity: 0,
					xy: [0, 0]
				});

				var xy = cc.p(0,0);
				point.delay(3)
					.then(function(){
						xy = this.getStyle('xy');
					})
					.fadeIn(0.1)
					.moveBy(0.5, cc.p(0, 8))
					.moveBy(0.5, cc.p(0, -8))
					.repeat(2,2)
					.moveBy(0.5, cc.p(0, 8))
					.moveBy(0.5, cc.p(0, -8))
					.fadeOut(0.2)
					.then(function(){
						this.setStyle('xy', xy);
					})
					.delay(3)
					.repeat(0,7);

				return point;
			}
		},
		tipsSprite: {
			create: function(){

				var tW = 100, tH = 60;

				var label = cc.createSprite('@', {
					anchor: [0.5, 0.5],
					xy: [0, 0],
					color: cc.c4f(1,1,1,1),
					fontSize: 12
				});

				// 气泡
				var bubble0 = cc.createSprite({
					anchor: [0.5, 0.5],
					xy: [tW-4, 4]
				});

				var bubble1 = cc.createSprite({
					anchor: [0.5, 0.5],
					xy: [tW*0.5, tH*0.5]
				});

				var ty0 = cc.DrawNode.create();
				ty0.setStyle('scaleY', 0.6);
				ty0.setStyle('rotate', -20);
				ty0.drawDot(cc.p(0, 0), 8, cc.c4f( 1, 1, 1, 0.2));

				var ty1 = cc.DrawNode.create();
				ty1.setStyle('scaleY', 0.6);
				ty1.drawDot(cc.p(0, 0), 50, cc.c4f( 1, 1, 1, 0.2));

				bubble0.addChild(ty0);
				bubble1.addChild(ty1);

				var tips = cc.createSprite({
					anchor: [0, 0],
					width: tW,
					height: tH,
					// cascadeOpacityEnabled: false,
					// opacity: 0
				});
				tips.addChild(bubble0);
				bubble1.addChild(label);
				tips.addChild(bubble1);

				return tips;
			}
		},
		audioBtn: {
			create: function(){
				var audioEnable = audio.getEnable().effect;

				function setAudioState (audioEnable) {
					if (!audioEnable) {
						label.setString('音效关闭');
						audioIcon.setStyle('texture', 'audio_close.png');
					} else {
						label.setString('音效开启');
						audioIcon.setStyle('texture', 'audio_open.png');
					}
				}

				var audioBtn = new Button({
					anchor: [0.5, 0.5],
					size: [70, 20]
				}, function(){
					audioEnable = !audioEnable;
					audio.setEnable(audioEnable);
					setAudioState(audioEnable);
				});

				var audioIcon = cc.createSprite('audio_open.png', {
					anchor: [0, 0],
					xy: [0, 0]
				});
				var label = cc.createSprite('@音效开启', {
					fontSize: 12,
					anchor: [0, 0.5],
					xy: [20, audioBtn.getStyle('height')/2]
				});

				setAudioState(audioEnable);
				audioBtn.addChild(audioIcon);
				audioBtn.addChild(label);

				return audioBtn;
			}
		},
		setTipsLabel: function(type, label, tipsIndex){
			var tipsConf = appConfig.tips[type];
			if (tipsConf && tipsConf.length > 0) {
				tipsIndex %= tipsConf.length;

				tip = tipsConf[tipsIndex];
				label.setString(tip.text.replace(/\\n/g,'\n'));

				appConfig.tipsIndex[type][1] = tip.qcmsdid;

				return ++tipsIndex;
			} else {
				label.setString("Hi!");
				return 0;
			}
		}
	};
});