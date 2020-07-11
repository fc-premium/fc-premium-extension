<template>
<div>
	<v-checkbox :label="option.title"
		:hint="option.description"
		persistent-hint
		@change="$listeners.change"
		append-icon="mdi-backup-restore"
		@click:append="reset()"
		v-model="option.value"
		:value="option.value"></v-checkbox>
</div>

</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator'

@Component({
	props: ['option']
})
export default class BooleanInput extends Vue {
	@Prop() private option!: any;

	reset() {
		console.log('reset', this.option.value, this.option.default)
		this.option.value = this.option.default;
		this.$forceUpdate()

		let changeListeners: Function[] = [];

		if (typeof this.$listeners.change === 'object')
			changeListeners = < Function[] > this.$listeners.change;
		else
			changeListeners.push(this.$listeners.change)

		changeListeners.forEach((listener: Function) => {
			if (listener !== undefined)
				listener();
		})
	}
}
</script>

<style>
.mdi-backup-restore {
	color: white !important;
}
</style>
