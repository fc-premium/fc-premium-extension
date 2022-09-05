<template>
<div>
	<v-input :label="option.title"
		:hint="option.description"
		:hide-details="option.description == undefined"
		persistent-hint
		append-icon="mdi-backup-restore"
		@click:append="reset()">
	</v-input>
	<v-text-field dense
		:type="passwordVisible ? 'text' : 'password'"
		:append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
		@click:append="passwordVisible = !passwordVisible"
		@change="$listeners.change"
		@blur="passwordVisible = false"
		placeholder="Password"
		counter
		v-model="option.value"></v-text-field>
</div>
</template>

<script lang="ts">
import {
Component,
Prop,
Vue
} from 'vue-property-decorator';

@Component({
	props: ['option']
})
export default class PasswordInput extends Vue {
	@Prop() public option!: any;

	private isFocused: boolean = false;
	public passwordVisible: boolean = false;
	reset() {
		this.option.value = this.option.default;
		this.$forceUpdate()
	}
}
</script>
