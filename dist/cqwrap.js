// Copyright Joyent, Inc. and other Node contributors.

// distribute, sublicense, and/or sell copies of the Software, and to permit

// The above copyright notice and this permission notice shall be included

/** @license MIT License (c) copyright 2011-2013 original author or authors */

/**
 * A lightweight CommonJS Promises/A and when() implementation
 * when is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Brian Cavalier
 * @author John Hann
 * @version 2.1.0
 */

(function(e){define("cqwrap/base",["require","exports","module"],function(t,n,r){function a(e,t,n,r,s,o){return i?setTimeout(function(){cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(e,t,n/1e3,r,s,o)},0):(cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(e,t),cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(e,t,n/1e3,r,s,o)),u.push(t),u.length-1}function f(e,t){var n=u[t];n!=null&&(cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(e,n),u[t]=null)}function l(e){cc.Director.getInstance().getScheduler().unscheduleAllCallbacksForTarget(e)}function h(e){return Array.isArray(e)}function p(e){return typeof e=="boolean"}function d(e){return e===null}function v(e){return e==null}function m(e){return typeof e=="number"}function g(e){return typeof e=="string"}function y(e){return typeof e=="symbol"}function b(e){return e===void 0}function w(e){return E(e)&&objectToString(e)==="[object RegExp]"}function E(e){return typeof e=="object"&&e!==null}function S(e){return E(e)&&objectToString(e)==="[object Date]"}function x(e){return E(e)&&(objectToString(e)==="[object Error]"||e instanceof Error)}function T(e){return typeof e=="function"}function N(e){if(typeof e!="string")return e;var t,n,r;e=e.trim();var i=[0,0,0];if(e[0]==="#")return e=e.slice(1),e.length===3&&(e=e.replace(/(\w)/g,"$1$1")),i=e.match(/\w\w/g).map(function(e){return parseInt(e,16)}),t=cc.c3b.apply(null,i),n=cc.c4b.apply(null,i.concat([255])),r=cc.c4f(n.r/255,n.g/255,n.b/255,n.a/255),{c3b:t,c4b:n,c4f:r};if(e.slice(0,4)==="rgb(")return e=e.slice(4,-1),i=cc.strToArray(e),t=cc.c3b.apply(null,i),n=cc.c4b.apply(null,i.concat([255])),r=cc.c4f(n.r/255,n.g/255,n.b/255,n.a/255),{c3b:t,c4b:n,c4f:r};if(e.slice(0,5)==="rgba(")return e=e.slice(5,-1),i=cc.strToArray(e),t=cc.c3b.apply(null,i.slice(-1)),n=cc.c4b.apply(null,i),r=cc.c4f(n.r/255,n.g/255,n.b/255,n.a/255),{c3b:t,c4b:n,c4f:r};if(T(cc[e])){var s=cc[e]();cc.Assert(s instanceof cc.Color3B);if(s instanceof cc.Color3B)return cc.color(s)}}e.console||(e.console={log:cc.log,error:cc.log,trace:cc.log,warn:cc.log}),cc.Assert||(cc.Assert=function(e,t){if(!e)throw new Error(t)});var i=navigator.userAgent.indexOf("Cocos2dx")<0,s=navigator.userAgent.indexOf("Android")>=0,o=navigator.userAgent.indexOf("iOS")>=0;cc.isHtml5=i,cc.isAndroid=s,cc.isIOS=o,cc.isOpenGL=o||s||cc.Browser&&cc.Browser.supportWebGL,cc.isOpenGL||(cc.TransitionCrossFade=cc.TransitionFadeBL=cc.TransitionFadeTR=cc.TransitionFade);var u=[null];cc.Node.prototype.setTimeout=function(t,n){return a(this||e,t,n||0,0,0,!1)},cc.Node.prototype.setInterval=function(t,n){return a(this||e,t,n||0,cc.REPEAT_FOREVER,0,!1)},cc.Node.prototype.clearAllTimers=function(){return l(this||e)},cc.Node.prototype.clearInterval=cc.Node.prototype.clearTimeout=function(t){return f(this||e,t)},e.setTimeout==undefined&&(e.setTimeout=cc.Node.prototype.setTimeout,e.setInterval=cc.Node.prototype.setInterval,e.clearTimeout=cc.Node.prototype.clearTimeout,e.clearInterval=cc.Node.prototype.clearInterval);if(i){var c=cc.MenuItemSprite.create;cc.MenuItemSprite.create=function(){var e=arguments[0],t=[].slice.call(arguments).map(function(t,n){return n&&t===e&&(t=null),t});return c.apply(c,t)}}cc.mixin=function(e,t,n){n=n||function(e,t){if(typeof e=="undefined")return t},n==1&&(n=function(e,t){return t});for(var r in t){var i=n(e[r],t[r],r,e,t);typeof i!="undefined"&&(e[r]=i)}return e},cc.isArray=h,cc.isBoolean=p,cc.isNull=d,cc.isNullOrUndefined=v,cc.isNumber=m,cc.isString=g,cc.isSymbol=y,cc.isUndefined=b,cc.isRegExp=w,cc.isObject=E,cc.isDate=S,cc.isError=x,cc.isFunction=T,Object.defineProperty(e,"director",{get:function(){return cc.Director.getInstance()},enumerable:!0,configurable:!1}),Object.defineProperty(e,"scene",{get:function(){return cc.Director.getInstance().getRunningScene()},enumerable:!0,configurable:!1}),cc.random=function(e,t){if(typeof e=="number")return t=t||0,0|e+Math.random()*(t-e);if(e instanceof Array){var n=e.length;if(t==null)return e[0|Math.random()*n];var r=cc.arrayShuffle(e.slice(0));return r.slice(0,t)}return Math.random()},cc.tmpl=function(e,t,n){return e=e.replace(/\{([^\{\}]*)\}/g,function(e,r){if(!r)return"";try{var i=(new Function("data","with(data){return ("+r+");}"))(t);return n?n(i,r):i}catch(s){return e}}),e},cc.arrayShuffle=function(e){for(var t=e.length-1;t>0;t--){var n=0|Math.random()*(t+1),r=e[t];e[t]=e[n],e[n]=r}return e},cc.strToArray=function(e){return e.trim().split(/\s*,\s*/).map(function(e){return parseInt(e)})},i||(cc.Color3B=function(e,t,n){this.r=e,this.g=t,this.b=n},cc.Color4B=function(e,t,n,r){this.r=e,this.g=t,this.b=n,this.a=r},cc.Color4F=function(e,t,n,r){this.r=e,this.g=t,this.b=n,this.a=r},cc.c3b__=cc.c3b,cc.c4b__=cc.c4b,cc.c4f__=cc.c4f,cc.c3b=function(e,t,n){return new cc.Color3B(e,t,n)},cc.c4b=function(e,t,n,r){return new cc.Color4B(e,t,n,r)},cc.c4f=function(e,t,n,r){return new cc.Color4F(e,t,n,r)}),cc.color=function(e,t,n,r){if(typeof e=="string")return N(e);if(e instanceof cc.Color3B)return cc.color(e.r,e.g,e.b);if(e instanceof cc.Color4B)return cc.color(e.r,e.g,e.b,e.a);if(e instanceof cc.Color4F)return cc.color(255*e.r,255*e.g,255*e.b,255*e.a);r=r||255;var i,s,o;return i=cc.c3b(e,t,n),s=cc.c4b(e,t,n,r),o=cc.c4f(s.r/255,s.g/255,s.b/255,s.a/255),{c3b:i,c4b:s,c4f:o}},i?(cc.Director.prototype.pauseAllActions=function(){var e=director.getActionManager();return e.pauseAllRunningActions()},cc.Director.prototype.resumeActions=function(e){var t=director.getActionManager();return t.resumeTargets(e)},cc.Director.prototype.end=function(){}):(cc.Director.prototype.pauseAllActions=function(){var e=[],t=director.getActionManager(),n=director.getActionManager().pauseAllRunningActions(),r=n.count();for(var i=0;i<r;i++){var s=n.anyObject();e.push(s),n.removeObject(s)}return e},cc.Director.prototype.resumeActions=function(e){var t=director.getActionManager();for(var n=0;n<e.length;n++)t.resumeTarget(e[n])},cc.RESOLUTION_POLICY.EXACT_FIT==null&&(cc.RESOLUTION_POLICY.EXACT_FIT=cc.RESOLUTION_POLICY.EXACTFIT,cc.RESOLUTION_POLICY.NO_BORDER=cc.RESOLUTION_POLICY.NOBORDER,cc.RESOLUTION_POLICY.FIXED_HEIGHT=cc.RESOLUTION_POLICY.HEIGHT,cc.RESOLUTION_POLICY.FIXED_WIDTH=cc.RESOLUTION_POLICY.WIDTH)),cc.showMessage=function(e,t,n,r){n=n||250,r=r||80;var i=cc.LayerColor.create(cc.c4b(0,0,0,192)),s=director.getWinSize();i.setContentSize(n,r),i.setPosition(s.width/2-n/2,s.height/2-r/2),e.addChild(i,9999);var o=cc.createSprite("@"+t,{xy:[n/2,r/2],fontSize:26});return i.addChild(o),i},cc.getSpriteFrame=function(e,t){var n=cc.SpriteFrameCache.getInstance(),r=n.getSpriteFrame(e);if(!t&&!r){var i=cc.TextureCache.getInstance().addImage(e);if(i&&i._textureLoaded){var s=i.getContentSize(),r=new cc.SpriteFrame;r.initWithTexture(i,cc.rect(0,0,s.width,s.height))}}return r}})})(this),define("cqwrap/events",["require","exports","module","cqwrap/base"],function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||undefined}r.EventEmitter=r,r.prototype._events=undefined,r.prototype._maxListeners=undefined,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!cc.isNumber(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,s,o;this._events||(this._events={});if(e==="error"&&!this._events.error)throw t=arguments[1],t instanceof Error?t:Error('Uncaught, unspecified "error" event.');n=this._events[e];if(cc.isUndefined(n))return!1;if(cc.isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:r=arguments.length,i=new Array(r-1);for(s=1;s<r;s++)i[s-1]=arguments[s];n.apply(this,i)}else if(cc.isObject(n)){r=arguments.length,i=new Array(r-1);for(s=1;s<r;s++)i[s-1]=arguments[s];o=n.slice(),r=o.length;for(s=0;s<r;s++)o[s].apply(this,i)}return!0},r.prototype.addListener=function(e,t){var n;if(!cc.isFunction(t))throw TypeError("listener must be a function");this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,cc.isFunction(t.listener)?t.listener:t),this._events[e]?cc.isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t;if(cc.isObject(this._events[e])&&!this._events[e].warned){var n;cc.isUndefined(this._maxListeners)?n=r.defaultMaxListeners:n=this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function r(){this.removeListener(e,r),n||(n=!0,t.apply(this,arguments))}if(!cc.isFunction(t))throw TypeError("listener must be a function");var n=!1;return r.listener=t,this.on(e,r),this},r.prototype.removeListener=function(e,t){var n,r,i,s;if(!cc.isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;n=this._events[e],i=n.length,r=-1;if(n===t||cc.isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(cc.isObject(n)){for(s=i;s-->0;)if(n[s]===t||n[s].listener&&n[s].listener===t){r=s;break}if(r<0)return this;n.length===1?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return arguments.length===0?this._events={}:this._events[e]&&delete this._events[e],this;if(arguments.length===0){for(t in this._events){if(t==="removeListener")continue;this.removeAllListeners(t)}return this.removeAllListeners("removeListener"),this._events={},this}n=this._events[e];if(cc.isFunction(n))this.removeListener(e,n);else if(Array.isArray(n))while(n.length)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return!this._events||!this._events[e]?t=[]:cc.isFunction(this._events[e])?t=[this._events[e]]:t=this._events[e].slice(),t},r.listenerCount=function(e,t){var n;return!e._events||!e._events[t]?n=0:cc.isFunction(e._events[t])?n=1:n=e._events[t].length,n},e("cqwrap/base"),cc.mixin(cc.Director.prototype,new r),n.exports={EventEmitter:r}}),function(e){define("cqwrap/when",["require","exports","module"],function(t,n,r){function i(e,t,n,r){return o(e).then(t,n,r)}function s(e,t){this.then=e,this.inspect=t}function o(e){return f(function(t){t(e)})}function u(e){return i(e,h)}function a(){function r(r,i,s){e.resolve=e.resolver.resolve=function(e){return n?o(e):(n=!0,r(e),t)},e.reject=e.resolver.reject=function(e){return n?o(h(e)):(n=!0,i(e),t)},e.notify=e.resolver.notify=function(e){return s(e),e}}var e,t,n;return e={promise:B,resolve:B,reject:B,notify:B,resolver:{resolve:B,reject:B,notify:B}},e.promise=t=f(r),e}function f(e){function r(e,r,i){return f(function(s,o,u){n?n.push(function(t){t.then(e,r,i).then(s,o,u)}):j(function(){t.then(e,r,i).then(s,o,u)})})}function i(){return t?t.inspect():C()}function o(e){if(!n)return;t=l(e),d(n,t),n=B}function u(e){o(h(e))}function a(e){n&&d(n,p(e))}var t,n=[];return e(o,u,a),new s(r,i)}function l(e){return e instanceof s?e:!(e===Object(e)&&"then"in e)||"act"in e?c(e):f(function(t,n,r){j(function(){try{var i=e.then;typeof i=="function"?A(i,e,t,n,r):t(c(e))}catch(s){n(s)}})})}function c(e){var t=new s(function(n){try{return typeof n=="function"?l(n(e)):t}catch(r){return h(r)}},function(){return T(e)});return t}function h(e){var t=new s(function(n,r){try{return typeof r=="function"?l(r(e)):t}catch(i){return h(i)}},function(){return N(e)});return t}function p(e){var t=new s(function(n,r,i){try{return typeof i=="function"?p(i(e)):t}catch(s){return p(s)}});return t}function d(e,t){j(function(){var n,r=0;while(n=e[r++])n(t)})}function v(e){return e&&typeof e.then=="function"}function m(e,t,n,r,s){return i(e,function(e){function o(n,r,s){function d(e){c(e)}function v(e){l(e)}var o,u,a,f,l,c,h,p;h=e.length>>>0,o=Math.max(0,Math.min(t,h)),a=[],u=h-o+1,f=[];if(!o)n(a);else{c=function(e){f.push(e),--u||(l=c=q,r(f))},l=function(e){a.push(e),--o||(l=c=q,n(a))};for(p=0;p<h;++p)p in e&&i(e[p],v,d,s)}}return f(o).then(n,r,s)})}function g(e,t,n,r){function i(e){return t?t(e[0]):e[0]}return m(e,1,i,n,r)}function y(e,t,n,r){return S(e,q).then(t,n,r)}function b(){return S(arguments,q)}function w(e){return S(e,T,N)}function E(e,t){return S(e,t)}function S(e,t,n){return i(e,function(e){function r(r,s,o){var u,a,f,l,c;f=a=e.length>>>0,u=[];if(!f){r(u);return}l=function(e,a){i(e,t,n).then(function(e){u[a]=e,--f||r(u)},s,o)};for(c=0;c<a;c++)c in e?l(e[c],c):--f}return f(r)})}function x(e,t){var n=A(L,arguments,1);return i(e,function(e){var r;return r=e.length,n[0]=function(e,n,s){return i(e,function(e){return i(n,function(n){return t(e,n,s,r)})})},k.apply(e,n)})}function T(e){return{state:"fulfilled",value:e}}function N(e){return{state:"rejected",reason:e}}function C(){return{state:"pending"}}function j(e){M.push(e)===1&&F()}function F(){O(I)}function I(){var e,t=0;while(e=M[t++])e();M=[]}function q(e){return e}i.defer=a,i.resolve=o,i.reject=u,i.join=b,i.all=y,i.map=E,i.reduce=x,i.settle=w,i.any=g,i.some=m,i.isPromise=v,i.promise=f,s.prototype={otherwise:function(e){return this.then(B,e)},ensure:function(e){function t(){return o(e())}return this.then(t,t).yield(this)},yield:function(e){return this.then(function(){return e})},spread:function(e){return this.then(function(t){return y(t,function(t){return e.apply(B,t)})})},always:function(e,t){return this.then(e,e,t)}};var k,L,A,O,M,_,D,P,H,B;return M=[],_=e.setTimeout,O=typeof setImmediate=="function"?setImmediate.bind(e):typeof process=="object"&&process.nextTick?process.nextTick:typeof vertx=="object"?vertx.runOnLoop:function(e){_(e,0)},D=Function.prototype,P=D.call,A=D.bind?P.bind(P):function(e,t){return e.apply(t,L.call(arguments,2))},H=[],L=H.slice,k=H.reduce||function(e){var t,n,r,i,s;s=0,t=Object(this),i=t.length>>>0,n=arguments;if(n.length<=1)for(;;){if(s in t){r=t[s++];break}if(++s>=i)throw new TypeError}else r=n[1];for(;s<i;++s)s in t&&(r=e(r,t[s],s,t));return r},i})}(this),define("cqwrap/audio",["require","exports","module"],function(e,t,n){var r=cc.AudioEngine.getInstance(),i={effect:!0,music:!0},s={preloadEffect:function(e){r.preloadEffect(e)},preloadMusic:function(e){r.preloadMusic(e)},playEffect:function(e){i.effect&&r.playEffect(e,!1)},playMusic:function(e){i.music&&r.playMusic(e,!0),this._music=e},pauseMusic:function(){i.music&&r.pauseMusic()},resumeMusic:function(){i.music&&r.resumeMusic()},stopMusic:function(){i.music&&r.stopMusic()},isMusicPlaying:function(){return r.isMusicPlaying()},setEnable:function(e){typeof e!="object"&&(e={effect:e,music:e}),i.music==1&&e.music==0?r.stopMusic():i.music==0&&e.music==1&&this._music&&r.playMusic(this._music),i={effect:e.effect,music:e.music}},getEnable:function(){return{effect:i.effect,music:i.music}}};n.exports=s}),define("cqwrap/data",["require","exports","module"],function(e,t,n){var r="weizoo",i=cc.Class.extend({ctor:function(e,t){this.name=e,this.salt=t||r},getRootKey:function(){return[this.salt,this.name].join("::")},get:function(e,t){var n=sys.localStorage.getItem(this.getRootKey())||"{}";return n=JSON.parse(n),e==null?n:n[e]!=null?n[e]:t},set:function(e,t){var n=this.get();n[e]=t,sys.localStorage.setItem(this.getRootKey(),JSON.stringify(n))}}),s=new i("gameSettings"),o=new i("userData");n.exports={SimpleStorage:i,GameSettings:s,UserData:o}}),define("cqwrap/style",["require","exports","module"],function(e,t,n){function i(e){return e.replace(/\-(\w)/ig,function(e,t){return t.toUpperCase()})}var r=cc.strToArray,s={};cc.registerTTF=function(e,t){s[e]=t};var o={anchor:{set:function(e,t){return e&&e.setAnchorPoint?(typeof t=="string"&&(t=r(t)),typeof t=="number"&&(t=[t,t]),t instanceof Array&&(t=cc.p.apply(null,t)),e.setAnchorPoint(t),!0):!1},get:function(e){if(e&&e.getAnchorPoint)return e.getAnchorPoint()}},texture:{set:function(e,t){if(t instanceof cc.Texture2D){var n=t.getContentSize();e.setTextureRect(cc.rect(0,0,n.width,n.height)),e.setTexture(t)}t=t.trim();var i=t.match(/(.*)\s*(?:rect\((.*)\))/),s=null;i&&(t=i[1].trim(),s=r(i[2]),s=cc.rect.apply(null,s));var o=t&&cc.SpriteFrameCache.getInstance().getSpriteFrame(t);if(o)return e.setDisplayFrame(o),s&&e.setTextureRect(s),!0;var u=cc.TextureCache.getInstance().addImage(t),a=e.getTextureRect().width;return a<=0?s?e.initWithTexture(u,s):e.initWithTexture(u):(s&&e.setTextureRect(s),e.setTexture(u)),!0},get:function(e){return e.getTexture()}},position:{set:function(e,t){return e&&e.setPosition?(typeof t=="string"&&(t=r(t)),t instanceof Array&&(t=cc.p.apply(null,t)),e.setPosition(t),!0):!1},get:function(e){if(e&&e.getPosition){var t=e.getPosition();return cc.p(t.x,t.y)}}},positionX:{set:function(e,t){var n=e.getPosition();return a.setStyle(e,"position",cc.p(t,n.y))},get:function(){if(node&&node.getPosition)return node.getPosition().x}},positionY:{set:function(e,t){var n=e.getPosition();return a.setStyle(e,"position",cc.p(n.x,t))},get:function(){if(node&&node.getPosition)return node.getPosition().y}},size:{set:function(e,t){return e&&e.setContentSize?(typeof t=="string"&&(t=r(t)),t instanceof Array&&(t=cc.size.apply(null,t)),e.setContentSize(t),e.setDimensions&&e.setDimensions(t),!0):!1},get:function(e){if(e&&e.getContentSize)return e.getContentSize()}},width:{set:function(e,t){var n=e.getContentSize();return a.setStyle(e,"size",cc.size(t,n.height))},get:function(e){if(e&&e.getContentSize)return e.getContentSize().width}},height:{set:function(e,t){var n=e.getContentSize();return a.setStyle(e,"size",cc.size(n.width,t))},get:function(e){if(e&&e.getContentSize)return e.getContentSize().height}},zOrder:{set:function(e,t){return e&&e.setZOrder?(e.setZOrder(t),!0):!1},get:function(e){if(e&&e.getZOrder)return e.getZOrder()}},color:{set:function(e,t){return e&&e.setColor?(t=cc.color(t).c4b,e.setColor(t),!0):!1},get:function(e){if(e&&e.getColor)return e.getColor()}},backgroundColor:{set:function(e,t){if(e){t=cc.color(t).c4b;var n=cc.LayerColor.create(t);return n.setZOrder(-1),n.setContentSize(e.getContentSize()),e.addChild(n),!0}return!1}},fontFamily:{set:function(e,t){return cc.isIOS||(t=s[t]||t),e&&e.setFontName?(e.setFontName(t),!0):!1},get:function(e){if(e&&e.getFontName)return e.getFontName()}},fontSize:{set:function(e,t){return e&&e.setFontSize?(e.setFontSize(t),!0):!1},get:function(e){if(e&&e.getFontSize)return e.getFontSize()}},textAlign:{set:function(e,t){if(e&&e.setHorizontalAlignment){var n={center:cc.TEXT_ALIGNMENT_CENTER,left:cc.TEXT_ALIGNMENT_LEFT,right:cc.TEXT_ALIGNMENT_RIGHT};return typeof t=="string"&&(t=n[t]),e.setHorizontalAlignment(t),!0}return!1},get:function(e){if(e&&e.getHorizontalAlignment)return e.getHorizontalAlignment()}},vAlign:{set:function(e,t){if(e&&e.setVerticalAlignment){var n={middle:cc.VERTICAL_TEXT_ALIGNMENT_CENTER,top:cc.VERTICAL_TEXT_ALIGNMENT_TOP,bottom:cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM};return typeof t=="string"&&(t=n[t]),e.setVerticalAlignment(t),!0}return!1},get:function(e){if(e&&e.getVerticalAlignment)return e.getVerticalAlignment()}},opacity:{set:function(e,t){return e&&e.setOpacity?(e.setOpacity(t),!0):!1},get:function(e){if(e&&e.getOpacity)return e.getOpacity()}},scale:{set:function(e,t){return e&&e.setScale?(typeof t=="string"&&(t=r(t)),t instanceof Array?e.setScale.apply(e,t):e.setScale(t),!0):!1},get:function(e){if(e&&e.getScale)return e.getScale()}},scaleX:{set:function(e,t){return e&&e.setScaleX?(e.setScaleX(t),!0):!1},get:function(e,t){if(e&&e.getScaleX)return e.getScaleX()}},scaleY:{set:function(e,t){return e&&e.setScaleY?(e.setScaleY(t),!0):!1},get:function(e,t){if(e&&e.getScaleY)return e.getScaleY()}},flipX:{set:function(e,t){return e&&e.setFlipX?(e.setFlipX(t),!0):e&&e.setFlippedX?(e.setFlippedX(t),!0):!1},get:function(e,t){if(e&&e.getFlipX)return e.getFlipX();if(e&&e.getFlippedX)return e.getFlippedX()}},flipY:{set:function(e,t){return e&&e.setFlipY?(e.setFlipY(t),!0):e&&e.setFlippedY?(e.setFlippedY(t),!0):!1},get:function(e,t){if(e&&e.getFlipY)return e.getFlipY();if(e&&e.getFlippedY)return e.getFlippedY()}},rotate:{set:function(e,t){if(e&&e.setRotation)return e.setRotation(t),!0},get:function(e){if(e&&e.getRotation)return e.getRotation()}}},u={zIndex:"zOrder",xy:"position",x:"positionX",y:"positionY",wh:"size",w:"width",h:"height"},a={setStyle:function(e,t,n){if(typeof t!="object"){t=i(t),t=u[t]||t;if(!o[t]){var s=e[i("set-"+t)];if(s)try{return s.call(e,n),!0}catch(a){return!1}return!1}return o[t].set(e,n)}"texture"in t&&this.setStyle(e,"texture",t.texture),"cascadeOpacityEnabled"in t&&this.setStyle(e,"cascadeOpacityEnabled",t.cascadeOpacityEnabled),"anchor"in t&&this.setStyle(e,"anchor",t.anchor);for(var r in t){if(["texture","cascadeOpacityEnabled","anchor"].indexOf(r)>=0)continue;this.setStyle(e,r,t[r])}},getStyle:function(e,t){t=i(t),t=u[t]||t;if(!o[t]){var n=e[i("get-"+t)];if(n)try{return n.call(e)}catch(r){return null}return null}return o[t].get(e)}};cc.Node.prototype.setStyle=function(e,t){a.setStyle(this,e,t)},cc.Node.prototype.getStyle=function(e,t){return a.getStyle(this,e)},n.exports={StyleManager:a}}),define("cqwrap/nodes",["require","exports","module"],function(e,t,n){var r=cc.Node.extend({ctor:function(){this._super(),this.init.apply(this,arguments),cc.associateWithNative(this,cc.Sprite)},init:function(){this._super()}});n.exports={BaseNode:r}}),define("cqwrap/labels",["require","exports","module","cqwrap/sprites"],function(e,t,n){var r=e("cqwrap/sprites").BaseSprite;cc.LabelTTF.extend=cc.Sprite.extend;var i=cc.LabelTTF.extend({ctor:function(e){this._super.apply(this,arguments),this.init.apply(this,arguments),cc.associateWithNative(this,cc.LabelTTF)},init:function(e){this.initWithString(e,"Arial",16),this.setCascadeOpacityEnabled(!0),this.setCascadeColorEnabled(!0)}});n.exports={BaseLabel:i}}),define("cqwrap/sprites",["require","exports","module","cqwrap/labels"],function(e,t,n){var r=cc.Sprite.extend({ctor:function(){this._super(),this.init.apply(this,arguments),cc.associateWithNative(this,cc.Sprite)},init:function(e,t){if(e instanceof cc.Texture2D)this.initWithTexture(e,t);else{var n=e&&cc.SpriteFrameCache.getInstance().getSpriteFrame(e);n?(this.initWithSpriteFrame(n),t&&this.setTextureRect(t)):this._super.apply(this,arguments)}this.setCascadeOpacityEnabled(!0),this.setCascadeColorEnabled(!0)}});cc.createSprite=function(t,n){typeof t=="object"&&!(t instanceof cc.Sprite)&&n==null&&(n=t,t=new r),n=n||{};if(typeof t=="string")if(t[0]==="@"){var i=e("cqwrap/labels").BaseLabel;t=new i(t.slice(1))}else/\.(plist|json|css)$/.test(t)?t=cc.ParticleSystem.create(t):t=new r(t);return t.setStyle(n),t},n.exports={BaseSprite:r}}),define("cqwrap/fonts",["require","exports","module","cqwrap/sprites"],function(e,t,n){var r=e("cqwrap/sprites").BaseSprite,i=r.extend({init:function(e,t){t=t||{},this._super(),this._prefix=t.prefix||"",this.setString(e),this.setStyle(t)},setPrefix:function(e){this._prefix=e},setString:function(e){e=e.toString();var t=this.getChildren()||[];for(var n=0;n<t.length;n++)t[n].removeFromParent(!0);var r=0,i=0;for(var n=0;n<e.length;n++){var s=this._prefix+e[n]+".png",o=cc.createSprite(s,{anchor:[0,0],xy:[r,0]});this.addChild(o);var u=o.getContentSize();r+=u.width,heigth=Math.max(u.height,i)}this.setContentSize(r,heigth)}});n.exports={LabelFontFC:i}}),define("cqwrap/animate",["require","exports","module","cqwrap/sprites"],function(e,t,n){function u(){}var r={},i=e("cqwrap/sprites").BaseSprite,s=function(e,t,n){var r=[],i=0,t=t||0,s=!1,o=!1;n==null&&(n=99999,o=!0);if(t>n){var u=n;n=t,t=u,s=!0}var a=n-t+1;do{var f=e.replace("%d",t+i),l=cc.getSpriteFrame(f,o);if(!l)break;r.push(l)}while(++i<a);return s&&r.reverse(),r};r.createAnimFromPng=function(e,t){var n=s(e),r=cc.Animation.create(n,t);return cc.Animate.create(r)},r.createRFAnimFromPng=function(e,t){return cc.RepeatForever.create(r.createAnimFromPng(e,t))};var o=i.extend({init:function(e){return this._super(),this.img=e,this.animate=null,!0},animate:function(e,t){if(!this.animate){var n=this.img;/%d/.test(this.img)||(n=this.img.replace(/\./,"%d."));var i=t?"createRFAnimFromPng":"createAnimFromPng";this.animate=r[i](n,e)}this.runAction(this.animate)}});cc.mixin(u.prototype,{getActions:function(){return this._animSeq=this._animSeq||[],this._animSeq},getActionSequence:function(){return cc.Sequence.create.apply(cc.Sequence,this.getActions())},addAction:function(e,t,n,r){var i;if(e instanceof cc.Action)r=n,n=t,i=[e];else{for(var s=t.length-1;s>=0;s--)if(t[s]!==undefined)break;t.length=s+1,i=[e.create.apply(e,t)]}if(n){var o=[].slice.call(arguments,3);for(var s=o.length-1;s>=0;s--)if(o[s]!==undefined)break;o.length=s+1,i[0]=n.create.apply(n,[i[0]].concat(o))}var u=this.getActions();return u.push.apply(u,i),this},clearActions:function(){return this.getActions().length=0,this},delay:function(e){return this.addAction(cc.DelayTime,[e])},repeat:function(e,t){e=e||9999999,t=t||0;var n=this.getActions();if(n.length>0){var r=cc.Sequence.create.apply(cc.Sequence,n.slice(-t));r=cc.Repeat.create(r,e),t==0?n.length=0:n.length=n.length-t,n.push(r)}return this},reverse:function(){var e=this.getActions();if(e.length>0){var t=e[e.length-1];e.push(t.reverse())}return this},reverseAll:function(){var e=this.getActions();if(e.length>0){var t=cc.Sequence.create.apply(cc.Sequence,e);e.push(t.reverse())}return this},then:function(e){return e=cc.CallFunc.create(e,this),this.getActions().push(e),this},animate:function(e){var t=[].slice.call(arguments,1);/%d/.test(t[0])?t=s.apply(null,t):t=t.map(function(e){return cc.getSpriteFrame(e)});var n=cc.Animation.create(t,e/t.length);return this.getActions().push(cc.Animate.create(n)),this},bezierBy:function(e,t,n,r){return this.addAction(cc.BezierBy,[e,t],n,r)},bezierTo:function(e,t,n,r){return this.addAction(cc.BezierTo,[e,t],n,r)},blink:function(e,t,n,r){return this.addAction(cc.Blink,[e,t],n,r)},fadeIn:function(e,t,n){return this.addAction(cc.FadeIn,[e],t,n)},fadeOut:function(e,t,n){return this.addAction(cc.FadeOut,[e],t,n)},fadeTo:function(e,t,n,r){return this.addAction(cc.FadeTo,[e,t],n,r)},jumpBy:function(e,t,n,r,i,s){return this.addAction(cc.JumpBy,[e,t,n,r||1],i,s)},jumpTo:function(e,t,n,r,i,s){return this.addAction(cc.JumpTo,[e,t,n,r||1],i,s)},moveBy:function(e,t,n,r){return this.addAction(cc.MoveBy,[e,t],n,r)},moveTo:function(e,t,n,r){return this.addAction(cc.MoveTo,[e,t],n,r)},rotateBy:function(e,t,n,r,i){return this.addAction(cc.RotateBy,[e,t,n],r,i)},rotateTo:function(e,t,n,r,i){return this.addAction(cc.RotateTo,[e,t,n],r,i)},scaleBy:function(e,t,n,r,i){return this.addAction(cc.ScaleBy,[e,t,n],r,i)},scaleTo:function(e,t,n,r,i){return this.addAction(cc.ScaleTo,[e,t,n],r,i)},skewBy:function(e,t,n,r,i){return this.addAction(cc.SkewBy,[e,t,n],r,i)},skewTo:function(e,t,n,r,i){return this.addAction(cc.SkewTo,[e,t,n],r,i)},tineBy:function(e,t,n,r,i,s){return this.addAction(cc.TineBy,[e,t,n,r],i,s)},tineTo:function(e,t,n,r,i,s){return this.addAction(cc.TineTo,[e,t,n,r],i,s)}}),cc.Node.prototype.act=function(e){return e?(e instanceof u&&e.getActions().length>0&&(e=e.getActionSequence()),this.runAction(e)):this.getActions().length>0&&(e=this.getActionSequence(),this.runAction(e),this.clearActions()),this},cc.Node.prototype.stop=function(e){return e?(e instanceof u&&e.getActions().length>0&&(e=e.getActionSequence()),this.stopAction(e)):this.stopAllActions(),this},cc.mixin(cc.Node.prototype,new u),n.exports={AnimationTool:r,FrameAnimSprite:o,AnimationTask:u}}),define("cqwrap/layers",["require","exports","module","cqwrap/events","cqwrap/sprites","cqwrap/when"],function(e,t,n){function a(e,t,n){var r=t.getLocation(),i=e._touchTargets;t.returnValue=!0;for(var s=0;s<i.length;s++){var o=i[s],u=o.convertToNodeSpace(r),a=o.getContentSize(),f=cc.rect(0,0,a.width,a.height);if(cc.rectContainsPoint(f,u))return t.returnValue=!0,t.preventDefault=function(){t.returnValue=!1},n==="touchstart"&&(e._touchedTarget=o,e._currentTarget=o),n==="mousemove"&&(e._mouseoverTarget!==o&&(e._mouseoverTarget&&e._mouseoverTarget.emit("mouseleave",t,e._mouseoverTarget,e),o.emit("mouseenter",t,o,e)),e._mouseoverTarget=o,o.emit("mousemove",t,o,e)),n==="touchmove"&&o!==e._currentTarget&&(e._currentTarget&&e._currentTarget.emit("touchleave",t,e._currentTarget,e),o.emit("touchenter",t,o,e),e._currentTarget=o),e._touchedTarget&&n==="touchmove"&&o!==e._touchedTarget&&(e._touchedTarget.emit("touchend",t,e._touchedTarget,e),e._moved=!0,delete e._touchedTarget),o.emit(n,t,o,e),t.returnValue}return e._touchedTarget&&(n==="touchmove"||n==="touchend")&&(e._touchedTarget.emit("touchend",t,e._touchedTarget,e),e._currentTarget&&(e._currentTarget.emit("touchleave",t,e._currentTarget,e),delete e._currentTarget),e._moved=!0,delete e._touchedTarget),e._mouseoverTarget&&(e._mouseoverTarget.emit("mouseleave",t,e._mouseoverTarget,e),delete e._mouseoverTarget),!1}var r=e("cqwrap/events").EventEmitter,i=e("cqwrap/sprites").BaseSprite,s=e("cqwrap/when"),o=cc.Layer.extend({ctor:function(){this._super(),this._contextDefer=s.defer(),this.init.apply(this,arguments),cc.associateWithNative(this,cc.Layer)},getContext:function(){var e=this._contextDefer;return e.promise},publish:function(){var e=[].slice.apply(arguments);this.getContext().then(function(t){t.__pubsubEmitter||(t.__pubsubEmitter=new r),t.setTimeout(function(){t.__pubsubEmitter.emit.apply(t,e)},0)})},subscribe:function(){var e=[].slice.apply(arguments);this.getContext().then(function(t){t.__pubsubEmitter||(t.__pubsubEmitter=new r),t.__pubsubEmitter.on.apply(t,e)})},unsubscribe:function(){var e=[].slice.apply(arguments);this.getContext().then(function(t){t.__pubsubEmitter||(t.__pubsubEmitter=new r),t.__pubsubEmitter.removeListener.apply(t,e)})},onEnter:function(){this._super(),this._contextDefer.resolve(this.getParent())},onExit:function(){this.clearAllTimers(),this._super()}}),u=o.extend({init:function(e){this._super();var t=cc.color(e);if(t){var n=cc.LayerColor.create(t.c4b);this.addChild(n)}else{var r=director.getWinSize(),s=new i(e);s.setPosition(cc.p(r.width/2,r.height/2)),this.addChild(s)}return!0}}),f=o.extend({init:function(){this._super(),this._touchTargets=[],this._batches={},this._clickAndMove=!0,this._autoDelegate=!0,this._retainNodes=[],this.backClicked&&this.setKeypadEnabled&&this.setKeypadEnabled(!0)},onEnter:function(){this._super(),this.registerDelegate();if(this.getParent()instanceof cc.Scene){var e=director.offsetY||0,t=this.getPosition();this.setPosition(cc.p(t.x,t.y+e))}if(this.backClicked&&typeof history!="undefined"){var n=this;history.pushState({},"");var r=function(e){n.backClicked()};this._pushState=r,window.addEventListener("popstate",r)}},retainNode:function(){for(var e=0;e<arguments.length;e++){var t=arguments[e];this._retainNodes.indexOf(t)<0&&(t.retain(),this._retainNodes.push(t))}},onExit:function(){for(var e=0;e<this._retainNodes.length;e++)this._retainNodes[e].release();this.unregisterDelegate(),this.backClicked&&typeof history!="undefined"&&this._pushState&&(window.removeEventListener("popstate",this._pushState),this._pushState=null),this._batches={},this._super()},addChild:function(e){if(cc.isArray(e)){var t=[].slice.call(arguments);for(var n=0;n<e.length;n++)t[0]=e[n],this.addChild.apply(this,t)}else this._super.apply(this,arguments),this._autoDelegate&&e.on&&this.delegate(e)},addChildToBatch:function(e,t){if(cc.isArray(e)){var n=[].slice.call(arguments);for(var r=0;r<e.length;r++)n[0]=e[r],this.addChildToBatch.apply(this,n)}else{var i;this._batches[t]?i=this._batches[t]:(i=cc.SpriteBatchNode.create(t),this._batches[t]=i,i.setZOrder(10),f.prototype.addChild.call(this,i)),i.addChild(e),this._autoDelegate&&e.on&&this.delegate(e)}},setTouchRect:function(e){this._touchRect=e},setClickAndMove:function(e){this._clickAndMove=e},setAutoDelegate:function(e){this._autoDelegate=e},addSprite:function(e,t,n){var n=n||this;e=cc.createSprite(e,t),n.addChild(e)},delegate:function(e,t,n){this._touchTargets.indexOf(e)<0&&(e.on||cc.mixin(e,new r),this._touchTargets.unshift(e),this._touchTargets.sort(function(e,t){return t.getZOrder()-e.getZOrder()})),t&&e.on(t,n)},undelegate:function(e,t){var n=this._touchTargets.indexOf(e);n>=0&&(t?e.removeAllListeners(t):(this._touchTargets.splice(n,1),e.removeAllListeners()))},getAbsoulteZOrder:function(){var e=this,t=0;while(e)t+=e.getZOrder(),e=e.getParent();return t},registerDelegate:function(){cc.registerTargetedDelegate(parseInt(-this.getZOrder()),!0,this),"mouse"in sys.capabilities&&director.getMouseDispatcher().addMouseDelegate(this,0)},unregisterDelegate:function(){cc.unregisterTouchDelegate(this),"mouse"in sys.capabilities&&director.getMouseDispatcher().removeMouseDelegate(this)},onTouchBegan:function(e,t){return this._touchRect&&!cc.rectContainsPoint(this._touchRect,e.getLocation())?!1:(this._touchPoint=e.getLocation(),a(this,e,"touchstart"))},onTouchMoved:function(e,t){var n=e.getLocation(),r=director.getWinSize();return!this._clickAndMove&&(Math.abs(this._touchPoint.x-n.x)>=r.width/30||Math.abs(this._touchPoint.y-n.y)>=r.height/30)&&(this._moved=!0),a(this,e,"touchmove")},onTouchEnded:function(e,t){return a(this,e,"touchend"),this._moved||a(this,e,"click"),this._moved=!1,e.returnValue},onTouchCancelled:function(e,t){return a(this,e,"touchcancel")},onMouseMoved:function(e){return a(this,e,"mousemove")},onMouseDragged:function(e){return a(this,e,"mousemove")}}),l=o.extend({init:function(e){e=e||128,this._super();var t=cc.LayerColor.create(cc.c4b(0,0,0,e));this.addChild(t)},onEnter:function(){this._super(),this.getParent().delegate(this)},onExit:function(){this.getParent().undelegate(this),this._super()}}),c=f.extend({init:function(e,t){this._super();var n=[new l(t),new l(t),new l(t),new l(t)];this.addChild(n),this._masks=n,this.setRect(e)},setRect:function(e){var t=this._masks,n=director.getWinSize();t[0].setPosition(cc.p(e.x-n.width,e.y)),t[1].setPosition(cc.p(e.x,e.y+e.height)),t[2].setPosition(cc.p(e.x+e.width,e.y+e.height-n.height)),t[3].setPosition(cc.p(e.x+e.width-n.width,e.y-n.height))}});n.exports={BaseLayer:o,BgLayer:u,GameLayer:f,MaskLayer:l,MaskWithRectLayer:c}}),define("cqwrap/scenes",["require","exports","module","cqwrap/layers","cqwrap/audio","cqwrap/when"],function(e,t,n){function f(e,t,n){t(e);if(e.length<=0)return;setTimeout(function(){f(e.slice(1),t,n)},n)}var r=e("cqwrap/layers"),i=r.BaseLayer,s=r.BgLayer,o=e("cqwrap/audio"),u=e("cqwrap/when"),a=cc.Scene.extend({ctor:function(){this._super(),this._autoReload=!1,this.init.apply(this,arguments),cc.associateWithNative(this,cc.Scene)},reload:function(){var e=new this.constructor;director.replaceScene(e)},onEnter:function(){this._super(),this._autoReload&&this._needReload&&this.reload()},onExit:function(){this._autoReload&&(this._needReload=!0),this._super()},setAutoReload:function(e){this._autoReload=e}}),l=i.extend({init:function(e,t,n,r){function a(){var e=u.defer();return setTimeout(function(){f(t,function(n){i.getParent().onProgressChange((t.length-n.length)/s),n.length<=0?e.resolve():o.preloadEffect(n[0])},r)},r),e.promise}function l(){var e=u.defer();return setTimeout(function(){f(n,function(r){i.getParent().onProgressChange((t.length+n.length-r.length)/s),r.length<=0?e.resolve():o.preloadMusic(r[0])},r)},r),e.promise}function c(){var t=u.defer();return setTimeout(function(){var n=cc.SpriteFrameCache.getInstance();f(e,function(e){i.getParent().onProgressChange(1-e.length/s),e.length<=0?setTimeout(function(){t.resolve()},r):n.addSpriteFrames(e[0][0],e[0][1])},r)},r),t.promise}this._super();var i=this;t=t||[],n=n||[],r=r||10;var s=e.length+t.length+n.length;a().then(function(){return l()}).then(function(){return c()}).then(function(){i.getParent().onLoaded()}),this.setKeypadEnabled&&this.setKeypadEnabled(!0)},backClicked:function(){this.getParent().backClicked()}}),c=a.extend({init:function(e,t,n,r){this._super();var i=new l(e,t,n,r);this.addChild(i)},onProgressChange:function(){},onLoaded:function(){},backClicked:function(){director.end()}});n.exports={BaseScene:a,LoadingScene:c}}),define("cqwrap/buttons",["require","exports","module","cqwrap/sprites","cqwrap/events"],function(e,t,n){var r=e("cqwrap/sprites").BaseSprite,i=e("cqwrap/events").EventEmitter,s=r.extend({init:function(e,t,n){function u(){s.setAnchorPoint(cc.p(0,0)),s.setPosition(cc.p(0,0)),r.addChild(s),r.setContentSize(s.getContentSize())}var r=this,s=this;this.enabled=!0,typeof t=="function"&&(n=t,t="click"),typeof e=="string"?(this._super(e),e=null):typeof e!="object"||e instanceof cc.Sprite?(s=e,this._super()):(!!e.texture&&this._super(e.texture),delete e.texture),cc.mixin(this,new i);var o=!1;this.on("touchstart",function(){if(!r.isEnabled()||o)return;if(!r.activated){var e=r.getScaleY();r.setScale(e*.95),r.activated=!0}}),this.on("touchend",function(){if(r.activated){var e=r.getScaleY();r.setScale(e/.95),r.activated=!1}}),this.on(t,function(){if(!r.isEnabled()||o)return;n&&n.apply(this,arguments),o=!0,setTimeout(function(){o=!1},300)}),cc.canvas&&cc.canvas.style&&(this.on("mouseenter",function(){r.isEnabled()&&(cc.canvas.style.cursor="pointer")}),this.on("mouseleave",function(){r.isEnabled&&(cc.canvas.style.cursor="")})),s!=this&&u(),e&&this.setStyle(e),this.setContentSprite=function(e){s!=r&&s.removeFromParent(!0),s=e,u()},this.getContentSprite=function(){return s},this.isEnabled=function(){return this.enabled&&n!=null}}});n.exports={Button:s}}),define("cqwrap/transitions",["require","exports","module","cqwrap/sprites"],function(e,t,n){var r=e("cqwrap/sprites").BaseSprite,i={create:function(e,t,n){if(t instanceof r){n=n||255,t.setOpacity(0);var i=cc.FadeTo.create(e,n);return t.runAction(i),t}return cc.TransitionFade.create(e,t,n)}};n.exports={TransitionFade:i}}),define("cqwrap/index",["require","exports","module","cqwrap/base","cqwrap/events","cqwrap/when","cqwrap/audio","cqwrap/data","cqwrap/style","cqwrap/nodes","cqwrap/sprites","cqwrap/fonts","cqwrap/animate","cqwrap/labels","cqwrap/scenes","cqwrap/layers","cqwrap/buttons","cqwrap/transitions"],function(e,t,n){e("cqwrap/base"),e("cqwrap/events"),e("cqwrap/when"),e("cqwrap/audio"),e("cqwrap/data"),e("cqwrap/style"),e("cqwrap/nodes"),e("cqwrap/sprites"),e("cqwrap/fonts"),e("cqwrap/animate"),e("cqwrap/labels"),e("cqwrap/scenes"),e("cqwrap/layers"),e("cqwrap/buttons"),e("cqwrap/transitions")});