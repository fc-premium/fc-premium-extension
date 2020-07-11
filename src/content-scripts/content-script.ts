import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import store from '../store'
import vuetify from '../plugins/vuetify';

import coreSettings from '@assets/config.json'

import 'chrome-extension-async'

import "./controller-handler"
import { Core } from 'fc-premium-core'

//
Array.from(document.scripts).forEach(script =>
	script.remove()
);

// Mark page css

Array.from(document.getElementsByTagName('style')).forEach((element: HTMLStyleElement) => {
	if (!element.innerHTML.includes('#app'))
		element.setAttribute('tag', 'page-style')
});

const requiredCssUrls = [
	"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
	"https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
	"https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css"
];

// window.addEventListener('DOMContentLoaded', function() {

requiredCssUrls.forEach((url: string) => {
	const preloadLink = document.createElement('link');
	const link = document.createElement('link');

	preloadLink.setAttribute('rel', 'preload');
	preloadLink.setAttribute('href', url);
	preloadLink.setAttribute('as', 'style');

	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('tag', 'fc-premium-link');
	link.setAttribute('href', url);
	link.disabled = true;

	document.head.appendChild(preloadLink)
	document.head.appendChild(link)
});

const appElement = document.createElement('app');
appElement.setAttribute('id', 'app');

document.documentElement.appendChild(appElement);


Core.onInstall = function() {
	// Register core settings
	Core.config.registerInStorage(<any>coreSettings, 'core');
}

if (Core.isInstalled() === true) {
	if (Core.config.get('core.reinstall') === true)
		Core.uninstall();
}

if (Core.isInstalled() === false)
	Core.install();

Core.config.register(<any>coreSettings, 'core');

const app: Vue = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')

// Handle app router logic
router.push({ path: '/' });

window.addEventListener('keydown', function(event: KeyboardEvent) {

	if (event.code === 'Escape' && document.body.contains(<Node>event.target))
		app.$store.state.appIsVisible = !app.$store.state.appIsVisible;
})

// if (Core.modules.listInstalledModules().includes('icon-autocomplete') === true) {
// 	console.log('Uninstalling icon-autocomplete');
// 	Core.modules.uninstall('icon-autocomplete');
// }

// if (Core.modules.listInstalledModules().includes('better-ignore-user') === true) {
// 	console.log('Uninstalling better-ignore-user');
// 	Core.modules.uninstall('better-ignore-user');
// }

// Core.modules.installModuleFromURL('https://pytness.ddns.net/github/fc-premium/modules/better-ignore-user/index.js').then(() => {
// 	console.log('Installed packages:', Core.modules.listInstalledModules());
// }).catch(err => {
// 	console.error(err)
// }).finally(() => {
// 	// debugger;
// });
Core.modules.loadInstalledModules();
app.$store.state.loaded = true;

// Core.uninstall();


// Core.modules.installModuleFromGithub
