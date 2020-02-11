<template>
<div>
        <v-input :label="option.title"
                :hint="option.description"
                :hide-details="option.description == undefined"
                persistent-hint
                append-icon="mdi-backup-restore"
                @click:append="option.value = option.default">
                <v-icon slot="prepend"
                        :color="option.value"
                        @click="isVisible = !isVisible">
                        mdi-eyedropper-variant
                </v-icon>
        </v-input>

        <v-dialog v-model="isVisible"
                width="fit-content">

                <v-color-picker mode="hexa"
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

        // // disable alpha channel
        // @Watch('option.value')
        // onColorChange(value) {
        // 	console.log('Changed', value)
        // 	if (value.toString().match(/#[a-zA-Z0-9]{8}/)) {
        // 		this.option.value = value.substr(0, 7);
        // 	}
        // }
}
</script>
