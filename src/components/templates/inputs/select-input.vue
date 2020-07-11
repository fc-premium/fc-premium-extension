<template>
<div>
	<v-input :label="option.title"
		:hint="option.description"
		:hide-details="option.description == undefined"
		persistent-hint
		append-icon="mdi-backup-restore"
		@click:append="reset()">
	</v-input>

	<v-select v-on="$listeners"
		v-model="option.value"
		:items="items"
		item-text="text"
		item-value="index"
		dense></v-select>
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
export default class SelectInput extends Vue {
	@Prop() private option!: any;
	private isVisible: boolean = false;

	get items() {
		return this.option.items.map((text: string, index: number) => {
			return {
				index,
				text
			}
		});
	}

	reset() {
		this.option.value = this.option.default;
		this.$forceUpdate()
	}
}
</script>
