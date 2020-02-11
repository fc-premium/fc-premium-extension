<template>
<v-content>
        <div class="scrollable-content">
                <v-container>
                        <v-row>
                                <v-col cols="10">
                                        <keep-alive>
                                                <!-- <component :is="currentComponent" /> -->
                                                <router-view></router-view>
                                        </keep-alive>
                                </v-col>
                        </v-row>
                </v-container>
        </div>
</v-content>
</template>

<script lang="ts">
import {
        Component,
        Prop,
        Vue
} from 'vue-property-decorator';

@Component({})
export default class RightPane extends Vue {}
</script>


<style>
.v-content {
        flex: unset !important;
        overflow-y: auto;
}

.scrollable-content {
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 100%;
        max-width: 100%;
        height: 100%;
        box-sizing: content-box
}
</style>
