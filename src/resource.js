// 修改资源src需同步修改weather.tpl里的url
(function(){
	var resPath = So.onebox.weather.appConf.resPath;
	var resPathMap = So.onebox.weather.appConf.resPathMap;
	So.onebox.weather.g_resources = {
		'other': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/other.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/other.png'}
		],
		'sunday': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/sunday.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/sunday.png'}
		],
		'sunnight': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/sunnight.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/sunnight.png'}
		],
		'overcastday': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/overcastday.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/overcastday.png'}
		],
		'rainday': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/rainday.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/rainday.png'}
		],
		'cloudyday': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/cloudyday.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/cloudyday.png'}
		],
		'warnScene': [
			{src: 'http://s0.qhimg.com/!eacc05ef/plist/warn.css'},
			{src: 'http://p0.qhimg.com/d/inn/eacc05ef/plist/warn.png'}
		]

		//plist
		
		//fnt

		//tmx

		//bgm

		//effect
	};
})();