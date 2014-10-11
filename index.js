require(['main.js'], function(initCocos2dApp){
	initCocos2dApp({
		COCOS2D_DEBUG: 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
		box2d: false,
		chipmunk: false,
		showFPS: true,
		frameRate: 30,
		loadExtension: false,
		renderMode: 1,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
		tag: 'gameCanvas', //the dom element to run cocos2d on
		// tagWrap:'mh-weather-canvas-wrap',
		crossOrigin: true
	},
	So.onebox.weather.appConf,
	So.onebox.weather.g_resources)
	.then(function(sceneClassMap){
		// 扩展自定义动画。需要放在 then里处理。
		var AnimationTask = require('cqwrap/animate').AnimationTask;
		cc.mixin(AnimationTask.prototype, {
			slideTo: function(dur, height, easing, rate){
				return this.addAction(cc.SlideTo, [dur, height], easing, rate);
			}
		});
		cc.mixin(cc.Node.prototype, {
			slideTo: AnimationTask.prototype.slideTo
		});

		/**
		 * 根据场景字符串获取场景实例
		 * @param  {string} sceneStr sunday|1-1
		 * @return {scene}          场景实例
		 */
		function getSceneByStr(sceneStr){
			var scene;
			if (!!sceneClassMap[sceneStr]) {
				scene = new sceneClassMap[sceneStr];
			} else {
				var tmp = sceneStr.split('|');
				if (tmp[1]) {
					scene = new sceneClassMap[tmp[0]](myApp.appConfig.bgScenePath + tmp[1] + '.png');
				} else {
					scene = new sceneClassMap[tmp[0]]();
				}
				
			}
			scene.onEnterTransitionDidFinish = function(){
				scene.scheduleOnce(function(){
					myApp.onChangeEnd && myApp.onChangeEnd();
				}, 0);
			};

			return scene;
		}


		var MyApp = cc.Cocos2dApp.extend({
			initWithScene: function(sceneStr, callback){
				var app = this, director = cc.Director.getInstance();

				if (app.inited) {
					director.replaceScene(getSceneByStr(sceneStr));
				} else {
					app.preLoad(sceneStr, function (sceneStr) {
						director.runWithScene(getSceneByStr(sceneStr));
						app.inited = true;
						callback && callback.call(app, sceneStr);
					}, app);
				}
			},
			changeScene: function(sceneStr, LR){
				var s = getSceneByStr(sceneStr);
				var dur = 0.5;

				if (LR == 'L') {
					var t = cc.TransitionSlideInL.create(dur, s);
				} else {
					var t = cc.TransitionSlideInR.create(dur, s);
				}

				cc.Director.getInstance().replaceScene(t);

				return t;
			}
		});

		var myApp = window.myApp = So.onebox.weather.app = new MyApp();
		myApp.initWithScene('sunday|1-0');

	}, function(){

		var d = document;
		var s = d.createElement('div');
		s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
			'<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
			'<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
		var tag = d.getElementById('gameCanvas')
		var p = tag.parentNode;
		p.style.background = 'none';
		p.style.border = 'none';
		p.insertBefore(s,tag);

		d.body.style.background = '#ffffff';
		return;

	});
})