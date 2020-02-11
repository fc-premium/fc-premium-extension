<template>
<div>
        <v-input :label="option.title"
                :hint="option.description"
                :hide-details="option.description == undefined"
                persistent-hint
                append-icon="mdi-backup-restore"
                @click:append="option.value = option.default">
        </v-input>
        <v-text-field dense
                @focus="isFocused = true"
                @blur="isFocused = false"
                :placeholder="`Default: ${option.default}`"
                v-model="value"></v-text-field>
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
export default class StringInput extends Vue {
        @Prop() private option!: any;
        private isFocused: boolean = false;

        set value(v: string) {
                this.option.value = v
        }

        get value() {
                return (this.isFocused == false && this.option.value == this.option.default || !this.option.value) ?
                        '' : this.option.value;
        }
}
</script>
