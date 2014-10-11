define(function(){
	function initCocos2dApp(ccConfig, appConf, g_resources){
		var def = $.Deferred();
		if(!!document.createElement('canvas').getContext && !!appConf){

			g_resources = g_resources || {};
			appConf.g_resources = $.extend({}, g_resources);

			// Cocos2d 需要使用
			window.global = window;
			ccConfig = document.ccConfig = $.extend({
				COCOS2D_DEBUG: 0, //0 to turn debug off, 1 for basic debug, and 2 for full debug
				box2d: false,
				chipmunk: false,
				showFPS: false,
				frameRate: 24,
				loadExtension: false,
				renderMode: 0,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
				tag: 'gameCanvas', //the dom element to run cocos2d on
				// tagWrap:'mh-weather-canvas-wrap',
				crossOrigin: true
			}, ccConfig);


			require(['cocos2d'], function(){

				// hack
				cc.RESOURCE_TYPE["TEXT"].push('css');

				if (!ccConfig.crossOrigin) {
					cc.Browser.supportWebAudio = false;

					// hack inline文本资源 解决异步加载失败的情况
					var fileUtils = cc.FileUtils.getInstance();
					appConf.plist && $.each(appConf.plist, function(index, item){
						fileUtils._textFileCache[appConf.resPath+index] = item;
					});
					// hack 去除图片请求的跨域头
					var textureCache = cc.TextureCache.getInstance();
					textureCache._crossOrigin = false;
				}

				define('src/config', ['require', 'exports', 'module'], function(require, exports, module){
					module.exports = appConf;
				});

				var sceneList = $.map(appConf.sceneMap, function(item, key){
					return item;
				});

				var requireList = appConf.require;
				require(requireList, function(){

					require(sceneList, function(){
						// 场景构造器处理
						var sceneMap = appConf.sceneMap;
						var sceneClassMap = {};
						var sceneClassList = arguments;
						var i = 0; //requireList.length;
						$.each(sceneMap, function(key){
							sceneClassMap[key] = sceneClassList[i];
							i++;
						});

						/**
						 * 预加载资源
						 * @param  {场景字符串}   sceneStr sunday|1-1
						 * @param  {Function} callback 预加载完的回调
						 * @param  {cocos2d app}   app      应用的实例
						 * @return {undefined}            无返回
						 */
						function preLoad(sceneStr, callback, app){
							var sceneArr = sceneStr.split('|');
							var pre_resources = [];

							function getLoadResArr(resArr){
								if (ccConfig.crossOrigin) {
									return resArr;
								} else {
									var tmp = [];
									$.each(resArr, function(index, item){
										item.src.slice(-4) == '.png' && tmp.push(item);
									});
									return tmp;
								}
							}

							// 预加载指定scene的资源
							if (g_resources[sceneArr[0]]) {
								pre_resources = pre_resources.concat(getLoadResArr(g_resources[sceneArr[0]]));
								delete g_resources[sceneArr[0]];
							}
							// 预加载必要的资源
							if (appConf.preLoadRes) {
								$.each(appConf.preLoadRes.split(','), function(index, key){
									key = $.trim(key);
									var resArr = g_resources[key];

									!!g_resources[key] && (pre_resources = pre_resources.concat(getLoadResArr(resArr)));
									delete g_resources[key];
								});
							}
							// 预加载背景图
							sceneArr[1] && pre_resources.push({src:appConf.bgScenePath + sceneArr[1] + '.png'});

							g_resources = $.map(g_resources, function(item){
								return getLoadResArr(item);
							});

							cc.Loader.preload(pre_resources, function () {
								callback && callback.call(app, sceneStr);

								cc.Loader.preload(g_resources, function () {
									g_resources = [];
									app.isloaded = true;
								}, app);
							}, app);
						}

						cc.Cocos2dApp = cc.Application.extend({
							config: ccConfig,
							appConfig: appConf,
							ctor: function () {
								this._super();
								this.inited = false;

								cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
								cc.initDebugSetting();
								cc.setup(this.config['tag']);

								cc.AppController.shareAppController().didFinishLaunchingWithOptions();
							},
							applicationDidFinishLaunching: function () {
								if(cc.RenderDoesnotSupport()){
									//show Information to user
									// alert("Browser doesn't support WebGL");
									return false;
								}
								// initialize director
								var director = cc.Director.getInstance();

								cc.renderContext.canvas.style.backgroundColor = 'transparent';

								cc.EGLView.getInstance().resizeWithBrowserSize(true);
								// cc.EGLView.getInstance().setDesignResolutionSize(636, 261, cc.RESOLUTION_POLICY.SHOW_ALL);

								//director.offsetY = 0;
								// turn on display FPS
								director.setDisplayStats(this.config['showFPS']);

								// set FPS. the default value is 1.0/60 if you don't call this
								director.setAnimationInterval(1.0 / this.config['frameRate']);

								return true;
							},
							preLoad: preLoad
						});

						def.resolve(sceneClassMap);
					});

				});
			});

		} else {
			def.reject();
		}
		return def.promise();
	}

	return initCocos2dApp;
});