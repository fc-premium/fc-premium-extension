const path = require('path');
const prefixer = require('postcss-prefix-selector');

module.exports = {
	chainWebpack: (config) => {
		config.module.rule('js').use('babel-loader');
	},

	configureWebpack: {
		resolve: {
			alias: {
				'@assets': path.resolve(__dirname, 'src/assets')
			}
		},
	},

	pages: {},

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
		loaderOptions: {
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
	}
}
