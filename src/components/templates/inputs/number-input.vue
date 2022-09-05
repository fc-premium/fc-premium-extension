<template>
<div>
	<v-input :hint="option.description"
		:label="option.title"
		:hide-details="option.description == undefined"
		persistent-hint
		append-icon="mdi-backup-restore"
		@click:append="reset()">
	</v-input>
	<v-text-field type="number"
		:min="option.minimum"
		:max="option.maximum"
		dense
		@change="$listeners.change"
		@input="option.value=typeParser(option.value);"
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
export default class NumberInput extends Vue {
	@Prop() public option!: any;

	typeParser(value: string | number): number {
		let number = parseInt( < string > value);

		if (isNaN(number))
			number = this.option.default;

		this.$forceUpdate();

		return number;
	}

	reset() {
		console.log('reset', this.option)
		this.option.value = this.option.default;
		this.$forceUpdate()
	}
}
</script>
