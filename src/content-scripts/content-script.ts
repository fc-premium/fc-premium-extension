import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import store from '../store'
import vuetify from '../plugins/vuetify';

Vue.config.productionTip = false;

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

const app: Vue = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')


window.addEventListener('keydown', function(event: KeyboardEvent) {
	if (event.code === 'Escape')
		app.$store.state.appIsVisible = !app.$store.state.appIsVisible;
})
