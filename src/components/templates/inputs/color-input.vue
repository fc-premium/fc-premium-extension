<template>
<div>
	<v-input :label="option.title"
		:hint="option.description"
		:hide-details="option.description == undefined"
		persistent-hint
		append-icon="mdi-backup-restore"
		@click:append="reset()">
		<v-icon slot="prepend"
			:color="option.value"
			@click="isVisible = !isVisible">
			mdi-eyedropper-variant
		</v-icon>
	</v-input>

	<v-dialog v-model="isVisible"
		width="fit-content">

		<v-color-picker @update:color="$listeners.change"
			mode="hexa"
			hide-mode-switch
			v-model="colorValue"
			:value="option.value">
		</v-color-picker>
	</v-dialog>
</div>

</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Watch,
	Vue
} from 'vue-property-decorator'

@Component({
	props: ['option']
})
export default class ColorInput extends Vue {
	@Prop() private option!: any;
	private isVisible: boolean = false;

	get colorValue() {
		return this.option.value;
	}

	set colorValue(value) {
		if (typeof(value) === 'object' && typeof(value.hex) === 'string')
			value = value.hex

		else if (typeof(value) !== 'string')
			value = '#ffffff'

		this.option.value = value;
	}
	reset() {
		this.option.value = this.option.default;
		this.$forceUpdate()
	}
}
</script>
