<template>
<div>
	<div class="display-2 my-5 font-weight-light">
		<v-icon class="display-2 mt-n2">mdi-palette-outline</v-icon>
		Choose a Theme
	</div>

	<v-divider class="mb-10" />

	<v-switch v-model="$vuetify.theme.dark"
		primary
		label="Dark Mode" />

	<v-row v-for="(color, i) in currentTheme"
		:key="i">
		<v-col class="headline no-selection"
			cols="8">
			<ColorInput :option="getOptionFromColor(i)" />
		</v-col>
	</v-row>

</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator'

import StringInput from '../templates/inputs/string-input.vue';
import PasswordInput from '../templates/inputs/password-input.vue';
import EmailInput from '../templates/inputs/email-input.vue';
import ColorInput from '../templates/inputs/color-input.vue';
import SelectInput from '../templates/inputs/select-input.vue';

@Component({
	components: {
		StringInput,
		PasswordInput,
		EmailInput,
		ColorInput,
		SelectInput,
	}
})
export default class Themes extends Vue {

	private defaultThemes!: any;

	data() {
		return {
			defaultThemes: {
				light: Object.assign({}, this.$vuetify.theme.themes.light),
				dark: Object.assign({}, this.$vuetify.theme.themes.light)
			}
		}
	}

	get currentTheme(): any {
		return this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light'];
	}

	get currentDefaultTheme(): any {
		return this.defaultThemes[this.$vuetify.theme.dark ? 'dark' : 'light'];
	}

	private getOptionFromColor(i: string): any {
		const self = this;

		return {
			title: i,
			default: self.currentDefaultTheme[i],

			get value() {
				return self.currentTheme[i]
			},

			set value(value: any) {
				self.currentTheme[i] = value
			}
		}
	}
}
</script>
