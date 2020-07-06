import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},

	theme: {
		dark: true,
		themes: {
			light: {
				alert: '#ffff00',
			},

			dark: {
				alert: '#ffff00',
			},


		},
		options: {
			customProperties: true
		}
	}
});
