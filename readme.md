天气羊基于cocos2d和cqwrap开发。同时，对cocos2d有相应的修改。可作为开发web端动画的一个模板

开发涉及到几个相关的编译：
1. cocos2d的编译
	若需要对cocos2d进行修改，则需要进行重新编译。编译依赖ant，搭建好ant后，在cocos2d文件夹（即含有build.xml的文件夹）运行ant命令进行编辑即可，编译后的文件在lib目录。
2. cqwrap的编译
	若需要对cqwrap进行修改编译。首先需要安装r.js。然后再项目根目录运行`r.js -o build_cqwrap.js`即可（ps:windows下使用r.js.cmd -o build_cqwrap.js）。编译后的文件在dist目录。
3. view的编译
	开发的各个场景，最终需要编译成一个scene文件。编译同样依赖r.js，运行`r.js -o build_view.js`即可。编译后的文件在dist目录。
4. plist的合并
	为了解决跨域加载有一部分用户会失败的问题，采用了将plist的文本合并后通过hack以inline的方式引入进行解决。所以就有了将plist进行combo处理的一步。combo依赖nodejs，直接在根目录运行`node node_combo_plist.js`即可。编译后的文件在dist目录。
