// r.js -o build.js
{
	baseUrl: ".",
	name: "./src/weather_scene",
	out: "dist/weather_scene.js",
	removeCombined: true,
	exclude: [
		'src/config.js',
		'cqwrap/index.js',
		'cqwrap/base',
		'cqwrap/events',
		'cqwrap/when',
		'cqwrap/audio',
		'cqwrap/data',
		'cqwrap/style',
		'cqwrap/nodes',
		'cqwrap/sprites',
		'cqwrap/fonts',
		'cqwrap/animate',
		'cqwrap/labels',
		'cqwrap/scenes',
		'cqwrap/layers',
		'cqwrap/buttons',
		'cqwrap/transitions'
	]
}
