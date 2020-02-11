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
	}
}
