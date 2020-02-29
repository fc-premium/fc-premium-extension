<template>
<v-app :style="$store.state.appIsVisible ? '' : 'display: none'">
	<v-app-bar app
		clipped-left>
		<v-toolbar-title>FC Premium</v-toolbar-title>
		<v-spacer />
		<v-btn icon
			@click="$store.state.appIsVisible = false">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-app-bar>
	<LeftPane />
	<RightPane />
</v-app>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Watch,
	Vue
} from 'vue-property-decorator';

import store from './store'

import LeftPane from './components/LeftPane.vue';
import RightPane from './components/RightPane.vue';

import Module from './module';


import {
	Core
} from 'fc-premium-core'

import {
	StorageEntries
} from 'fc-premium-core/src/definitions'

Core.controller.setControllerMethods({
	getter: (keys: string | string[]): any => {
		return JSON.parse( < string > localStorage.getItem( < string > keys));
	},
	setter: (key: string, value: any): void => {
		return localStorage.setItem(key, JSON.stringify(value));
	},
	deleter: (key: string): void => {
		localStorage.removeItem(key);
	},
	lister: (): string[] => {
		let list: string[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key: string = < string > localStorage.key(i);

			if (key.startsWith(StorageEntries.root))
				list.push(key)
		}

		return list;
	},
})


function toggleStyleTags() {

	document.body.style.display = !store.state.appIsVisible ?
		'block' : 'none';

	document.getElementById('app') !.style.display = store.state.appIsVisible ?
		'block' : 'none';

	// Toggle site css
	Array.from(document.querySelectorAll < HTMLStyleElement > ('style[tag="page-style"], style[tag="fc-premium-module"]')).forEach((element) => {
		const stylesheet = element.sheet;
		stylesheet!.disabled = store.state.appIsVisible;

		element.setAttribute('___disabled', stylesheet!.disabled.toString());
	})

	// Toggle vue css
	// Array.from(document.querySelectorAll < HTMLStyleElement > ('style:not([tag])')).forEach((element) => {
	// 	const stylesheet = element.sheet;
	// 	stylesheet!.disabled = !this!.$store.state.appIsVisible;
	//
	// 	element.setAttribute('___disabled', stylesheet!.disabled.toString());
	// })

	// Toggle extension css
	Array.from(document.querySelectorAll < HTMLLinkElement > ('link[tag="fc-premium-link"]')).forEach((element: HTMLLinkElement) => {
		// const stylesheet = element.sheet;
		element!.disabled = !store.state.appIsVisible;

		element.setAttribute('___disabled', element!.disabled.toString());
	})

}

@Component({
	components: {
		LeftPane,
		RightPane,
	},
	props: ['modules']
})
export default class App extends Vue {
	@Watch("$store.state.appIsVisible")
	appVisibilityChanged() {
		toggleStyleTags();
	}

	mounted() {
		toggleStyleTags();
	}
}
</script>

<style style="sass">
html {
	overflow-y: auto !important;
}

::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

::-webkit-scrollbar-button {
	width: 0px;
	height: 0px;
}

::-webkit-scrollbar-thumb {
	background: var(--v-primary-base);
	border: 0px;
	border-radius: 0px;
}

::-webkit-scrollbar-corner {
	background: transparent;
}

	{
	position: fixed;
	display: flex;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.v-card {
	box-sizing: border-box;
}
</style>
