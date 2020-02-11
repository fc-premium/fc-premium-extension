<template>
<div>
        <div class="display-2 my-5 font-weight-light">
                <v-icon class="display-2 mt-n2">mdi-tune-vertical</v-icon>
                Core Settings
        </div>

        <v-divider class="mb-10" />
        <v-switch v-model="$vuetify.theme.dark"
                primary
                label="Dark Mode" />
</div>
</template>

<script lang="ts">
import {
        Component,
        Prop,
        Vue
} from 'vue-property-decorator';

@Component({})
export default class Core extends Vue {
        get selectedSetting() {
                return this.$store.getters.selectedSetting;
        }
}
</script>
