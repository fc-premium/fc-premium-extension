<template>
<v-app :style="$store.state.appIsVisible && $store.state.loaded ? '' : 'display: none'">
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

@Component({
	components: {
		LeftPane,
		RightPane,
	}
})
export default class App extends Vue {

	private lastBodyScrollPosition: [number, number] = [0, 0];

	private toogleVisibility() {
		if (this.$store.state.appIsVisible === true) {

			// Save scroll position
			this.lastBodyScrollPosition[0] = document.documentElement.scrollLeft;
			this.lastBodyScrollPosition[1] = document.documentElement.scrollTop;

			console.log('Saved', this.lastBodyScrollPosition)

			document.body.style.display = 'none';
			( < HTMLElement > this.$el).style.display = 'block';

		} else {

			document.body.style.display = 'block';
			( < HTMLElement > this.$el).style.display = 'none';

			// Delayed apply saved scroll position
			setTimeout(() => {
				document.documentElement.scrollLeft = this.lastBodyScrollPosition[0];
				document.documentElement.scrollTop = this.lastBodyScrollPosition[1];
			})
		}
	}

	private toggleStyleTags() {

		Array.from(document.querySelectorAll < HTMLStyleElement > ('style[tag="page-style"], style[tag="fc-premium-module"]')).forEach((element) => {
			const stylesheet = element.sheet;
			stylesheet!.disabled = this.$store.state.appIsVisible;
		});

		// Toggle extension css
		Array.from(document.querySelectorAll < HTMLLinkElement > ('link[tag="fc-premium-link"]')).forEach((element: HTMLLinkElement) => {
			// const stylesheet = element.sheet;
			element!.disabled = !this.$store.state.appIsVisible;
		});
	}

	@Watch("$store.state.appIsVisible")
	appVisibilityChanged() {
		this.toggleStyleTags();
		this.toogleVisibility();
	}

	mounted() {
		this.toggleStyleTags();
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
