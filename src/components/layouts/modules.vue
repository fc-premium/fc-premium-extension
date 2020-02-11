<template>
<div>
        <div class="display-2 my-5 font-weight-light">
                <v-icon class="display-2 mt-n2">mdi-package-variant-closed</v-icon>
                Installed Modules
        </div>

        <v-divider class="mb-10" />

        <v-text-field label="Filter modules by name"
                single-line
                v-model="filterText"
                append-icon="mdi-magnify"
                @click:append=""
                @keydown.enter="" />

        <v-spacer />

        <v-row v-for="(module, i) in filterModules($store.state.modules)"
                :key="i">
                <v-col>
                        <v-card :class="(!module.enabled ? 'disabled-card'  : '') + ' no-selection'"
                                style="cursor: pointer"
                                @click="openModule(module)"
                                :ripple="false">
                                <v-card-title><span class="underline_on_hover">{{module.name}}</span></v-card-title>
                                <v-card-subtitle>v {{module.version}}</v-card-subtitle>
                                <v-card-text>{{module.description}}</v-card-text>
                                <v-card-subtitle>
                                        {{module.author}}
                                        <div style="float: right;">
                                                <v-tooltip top>
                                                        <template v-slot:activator="{ on }">
                                                                <v-btn icon
                                                                        small
                                                                        :disabled="!module.isDeprecated()"
                                                                        class="no-text-transform caption .font-weight-light"
                                                                        v-on="on"
                                                                        @click.stop>
                                                                        <v-icon small
                                                                                color="alert">mdi-alert</v-icon>
                                                                </v-btn>
                                                        </template>
                                                        <span>Deprecated (??)</span>
                                                </v-tooltip>

                                                <v-btn text
                                                        small
                                                        :disabled="module.settings == null"
                                                        class="no-text-transform caption .font-weight-light">
                                                        <v-icon left
                                                                color="primary">mdi-settings</v-icon>
                                                        <span>Settings</span>
                                                </v-btn>

                                                <v-btn text
                                                        small
                                                        class="no-text-transform caption .font-weight-light"
                                                        @click.stop>
                                                        <v-icon left
                                                                color="primary">mdi-trash-can-outline</v-icon>
                                                        <span>Uninstall</span>
                                                </v-btn>


                                                <v-btn text
                                                        small
                                                        class="no-text-transform caption .font-weight-light"
                                                        @click.stop="module.enabled = !module.enabled">
                                                        <v-icon left
                                                                color="primary">mdi-{{module.enabled ? 'pause' : 'play' }}</v-icon>
                                                        <span>{{module.enabled ? 'Disable' : 'Enable' }}</span>
                                                </v-btn>
                                        </div>
                                </v-card-subtitle>
                        </v-card>

                </v-col>
        </v-row>
</div>
</template>

<script lang="ts">
import {
        Component,
        Prop,
        Vue
} from 'vue-property-decorator'

import Module from '../../module'

@Component({})
export default class ModuleList extends Vue {

        private filterText!: string;

        public data() {
                return {
                        filterText: '',
                }
        }

        get selectedSetting() {
                return this.$store.getters.selectedSetting;
        }

        openModule(module: Module) {
                this.$router.push({
                        path: `/module/${module.name}`,
                });
        }

        filterModules(modules: Module[]) {
                const keywords = this.filterText.toLowerCase()
                        .split(' ').filter(k => k.length > 0);

                if (keywords.length === 0)
                        return modules;

                return this.$store.state.modules.filter((module: Module) =>
                        keywords.every(keyword => module.name.includes(keyword))
                );
        }
}
</script>

<style>
.disabled-card {
        opacity: 0.6;
}

.no-click:focus {
        opacity: 0.6;
}


.no-selection {
        user-select: none;
}

.underline_on_hover:hover {
        text-decoration: underline;
}
</style>
