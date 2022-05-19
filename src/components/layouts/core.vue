<template>
<div>
	<div class="display-2 my-5 font-weight-light">
		<v-icon class="display-2 mt-n2">mdi-tune-vertical</v-icon>
		Core Settings
	</div>

	<v-divider class="mb-10" />

	<v-row v-for="([key, option], i) in core_settings"
		:key="i">
		<v-col class="headline no-selection"
			cols="8">
			<AutoInput :option="option"
				@change="set_option(key, option)" />
		</v-col>
	</v-row>
</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator';

import {
	Core
} from 'fc-premium-core';

import AutoInput from '../templates/inputs/auto-input.vue';

@Component({
	components: {
		AutoInput
	}
})
export default class CoreComponent extends Vue {
	get core_settings() {
		return Core.ConfigHandler.keys('core.').map((key: string) => {
			return [key, Core.ConfigHandler.getMeta(key)]
		});
	}

	set_option(key: any, option: any) {
		Core.ConfigHandler.set(key, option.value);
	}
}
</script>
