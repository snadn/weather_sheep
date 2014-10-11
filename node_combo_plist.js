"use strict";
var fs = require("fs");
var path = require("path");

var plistDir = path.resolve('res/pic/plist');

var obj = {};
fs.existsSync(plistDir) && fs.readdirSync(plistDir).forEach(function(item, index){
	if (path.extname(item) == '.css') {
		var cont = fs.readFileSync(path.resolve(plistDir, item)).toString();
		obj[item] = cont.trim();
	}
});

var distPath = path.resolve('dist/plist.json');
var outText = JSON.stringify(obj);
outText = outText.replace(/\\r\\n/g, '\r\n').replace(/\\t/g, '\t');
fs.writeFileSync(distPath, outText);

console.log("success write to dist/plist.json");

var tarPath = path.resolve('../../modules/inc/weather/plist.json');
if (fs.existsSync(tarPath)) {
	fs.writeFileSync(tarPath, outText);
	console.log("success write to "+tarPath);
}
