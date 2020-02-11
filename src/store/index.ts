import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import Core from '../components/layouts/core.vue'
import Modules from '../components/layouts/modules.vue'
import ModuleDisplay from '../components/layouts/module-display.vue'

import Install from '../components/layouts/install.vue'


import Module from '../module'
import settings from '../assets/config.json'

export default new Vuex.Store({
	state: {
		appIsVisible: false,

		settingsTabs: [
			{ title: 'Core', icon: 'tune-vertical', path: '/core' },
			{ title: 'Modules', icon: 'package-variant-closed', path: '/modules' },
			{ title: 'Themes', icon: 'palette-outline', path: '/themes' },
			{ title: 'Install', icon: 'plus', path: '/install' }, // github-circle loading?? idk wth is this
		],

		selectedSettingIndex: 0,

		modules: [
			new Module('module-test-with-settings', settings),
			new Module('module-test'),
		],

		displayModuleTarget: null,
	},

	getters: {
		selectedSetting(state) {
			return state.settingsTabs[state.selectedSettingIndex];
		},

		displayModuleTarget(state) {
			return state.displayModuleTarget;
		}
	},

})
