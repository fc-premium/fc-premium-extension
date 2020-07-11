<template>
<component v-if="option !== undefined"
	:is="get_component(option.type)"
	:option="option"
	@change="$listeners.change" />
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator'

import StringInput from './string-input.vue';
import NumberInput from './number-input.vue';
import PasswordInput from './password-input.vue';
import EmailInput from './email-input.vue';
import ColorInput from './color-input.vue';
import SelectInput from './select-input.vue';
import BooleanInput from './boolean-input.vue';

@Component({
	props: ['option'],

})
export default class AutoInput extends Vue {
	@Prop() private option!: any;

	get_component(type: string) {
		switch (type) {
			case 'string':
				return StringInput;

			case 'number':
				return NumberInput;

			case 'password':
				return PasswordInput;

			case 'email':
				return EmailInput;

			case 'color':
				return ColorInput;

			case 'select':
				return SelectInput;

			case 'boolean':
				return BooleanInput;

			default:
				return null
		}
	}
}
</script>
