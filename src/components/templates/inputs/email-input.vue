<template>
<div>
	<v-input :label="option.title"
		:hint="option.description"
		:hide-details="option.description == undefined"
		persistent-hint
		append-icon="mdi-backup-restore"
		@click:append="reset()">
	</v-input>
	<v-text-field v-on="$listeners"
		dense
		type="email"
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
export default class EmailInput extends Vue {
	@Prop() public option!: any;

	reset() {
		this.option.value = this.option.default;
		this.$forceUpdate()
	}
}
</script>
