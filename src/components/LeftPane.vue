<template>
<v-navigation-drawer app
	permanent
	clipped
	overflow>
	<v-list class="mt-n2">
		<v-list-item-group active-class="deep-gray--text text--accent-4"
			v-model="tabindex">
			<v-list-item v-for="(item, i) in settingsTabs"
				:key="i">

				<v-list-item-icon>
					<v-icon>mdi-{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</v-navigation-drawer>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator';

import router from '../router'

@Component({})
export default class LeftPane extends Vue {
	private tabindexCache!: number;
	get tabindex(): number {
		const index = this.settingsTabs.findIndex((tab: any) =>
			this.$route.path.startsWith(tab.path)
		);

		this.tabindexCache = index;

		return index;
	}

	set tabindex(index: number) {
		const path = this.settingsTabs[index].path;

		router.push({
			path: path
		});
	}

	get settingsTabs() {
		return this.$store.state.settingsTabs;
	}

	setPath(path: string): void {
		router.push({
			path: path
		});
	}
}
</script>
