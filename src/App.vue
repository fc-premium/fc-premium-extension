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

import LeftPane from './components/LeftPane.vue';
import RightPane from './components/RightPane.vue';

import Module from './module';

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

		document.body.style.display = !this.$store.state.appIsVisible ?
			'block' : 'none';

		document.getElementById('app') !.style.display = this.$store.state.appIsVisible ?
			'block' : 'none';

		// Toggle site css
		Array.from(document.getElementsByTagName('style')).slice(0, 12).forEach((element: HTMLStyleElement) => {
			const stylesheet = element.sheet;

			stylesheet!.disabled = this!.$store.state.appIsVisible;
		})

		// Toggle extension css
		Array.from(document.querySelectorAll < HTMLLinkElement > ('[tag="fc-premium-link"]')).slice(0, 12).forEach((element: HTMLLinkElement) => {
			element.disabled = !this!.$store.state.appIsVisible;
		})


	}
}
</script>

<style style="sass">
html {
	overflow-y: auto !important;
}

#app ::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

#app ::-webkit-scrollbar-button {
	width: 0px;
	height: 0px;
}

#app ::-webkit-scrollbar-thumb {
	background: var(--v-primary-base);
	border: 0px;
	border-radius: 0px;
}

#app ::-webkit-scrollbar-corner {
	background: transparent;
}

#app {
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
