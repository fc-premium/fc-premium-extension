const prefixer = require('postcss-prefix-selector');

module.exports = {
	"transpileDependencies": [
		"vuetify"
	],

	pages: {},


	// css: {
	// 	loaderOptions: {
	// 		css: {
	// 			// data: '@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";'
	// 		}
	// 	}
	// },

	// configureWebpack: {
	// 	plugins: [
	// 		new MyAwesomeWebpackPlugin()
	// 	]
	// },

	pluginOptions: {
		browserExtension: {
			api: "browser",
			componentOptions: {
				background: {
					entry: 'src/background.ts'
				},
				contentScripts: {
					entries: {
						'content-script': [
							'src/content-scripts/content-script.ts'
						]
					}
				}
			}
		}
	},

	css: {
		requireModuleExtension: true,
		loaderOptions: {
			css: {
				modules: {
					modules: true,
					localIdentName: '[name]-[hash]'
				}
			},
			postcss: {
				plugins: [prefixer({
					prefix: '#app',

					// Optional transform callback for case-by-case overrides
					transform: (prefix, selector, prefixedSelector) => {

						return selector == 'html' ?
							'html' : `${prefix} ${selector}`;
					}
				})]
			}
		},
		modules: true
	}
}
