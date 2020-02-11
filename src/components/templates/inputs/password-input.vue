<template>
<div>
        <v-input :label="option.title"
                :hint="option.description"
                :hide-details="option.description == undefined"
                persistent-hint>
        </v-input>
        <v-text-field dense
                :type="passwordVisible ? 'text' : 'password'"
                :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordVisible = !passwordVisible"
                placeholder="Password"
                counter
                v-model="option.value"></v-text-field>
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
export default class PasswordInput extends Vue {
        @Prop() private option!: any;

        private isFocused: boolean = false;
        private passwordVisible: boolean = false;
}
</script>
