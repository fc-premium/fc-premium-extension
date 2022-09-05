<template>
<component v-if="option !== undefined"
	:is="get_component(option.type)"
	:option="option"
	@change="on_change" />
</template>

<script lang="ts">
import {
Component,
Prop,
Vue
} from 'vue-property-decorator';

import BooleanInput from './boolean-input.vue';
import ColorInput from './color-input.vue';
import EmailInput from './email-input.vue';
import NumberInput from './number-input.vue';
import PasswordInput from './password-input.vue';
import SelectInput from './select-input.vue';
import StringInput from './string-input.vue';

@Component({
	props: ['option'],

})
export default class AutoInput extends Vue {
	@Prop() public option!: any;

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

	public get on_change()  {
		return this.$listeners.change as (payload: Event) => void;
	}
}
</script>
