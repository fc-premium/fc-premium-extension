<template>
<div v-if="module != null">
	<v-row>
		<v-col>
			<v-breadcrumbs class="no-selection pa-0 mb-6"
				:items="breadcrumbs_items"></v-breadcrumbs>

			<v-card :class="(!module.enabled ? 'disabled-card ' : '' ) + ' no-selection'">
				<v-card-title>{{module.name}}</v-card-title>
				<v-card-subtitle>v {{module.info.version}}</v-card-subtitle>
				<v-card-text>{{module.info.description}}</v-card-text>
				<v-card-subtitle>
					{{module.info.author}}
					<div style="float: right;">
						<!-- <v-tooltip top>
                                                        <template v-slot:activator="{ on }">
                                                                <v-btn icon
                                                                        small
                                                                        :disabled="!module.isDeprecated()"
                                                                        class="no-text-transform caption .font-weight-light"
                                                                        v-on="on">
                                                                        <v-icon small
                                                                                color="alert">mdi-alert</v-icon>
                                                                </v-btn>
                                                        </template>
                                                        <span>Deprecated (??)</span>
                                                </v-tooltip> -->

						<v-btn text
							small
							@click.stop="uninstall(module)"
							class="no-text-transform caption .font-weight-light">
							<v-icon left
								color="primary">mdi-trash-can-outline</v-icon>
							<span>Uninstall</span>
						</v-btn>

						<v-btn text
							small
							@click="module.enabled = !module.enabled; $forceUpdate()"
							class="no-text-transform caption .font-weight-light">
							<v-icon left
								color="primary">mdi-{{module.enabled ? 'pause' : 'play' }}</v-icon>
							<span>{{module.enabled ? 'Disable' : 'Enable' }}</span>
						</v-btn>
					</div>
				</v-card-subtitle>
			</v-card>

		</v-col>


	</v-row>
	<div v-if="module.config.keys() !== 0">
		<v-row>
			<v-col>
				<div class="display-2 my-5 font-weight-thin no-selection">
					<v-icon class="display-2 mt-n2">mdi-settings</v-icon>
					Settings
				</div>
				<v-divider />
			</v-col>
		</v-row>

		<v-row v-for="([key, option], i) in module_settings"
			:key="i">
			<v-col class="headline no-selection"
				cols="8">
				<AutoInput :option="option"
					@change="set_option(key, option)" />
			</v-col>
		</v-row>

	</div>
</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator'

import {
	Core
} from 'fc-premium-core'

import AutoInput from '../templates/inputs/auto-input.vue';


@Component({
	components: {
		AutoInput
	}
})
export default class ModuleDisplay extends Vue {

	private module!: Core.Module;

	data() {
		return {
			module: Core.modules.get(this.$route.params.moduleName)
		}
	}

	set_option(key: any, option: any) {
		this.module.config.set(key, option.value);
	}

	get module_settings() {
		const module = this.module;

		return module.config.keys().map(key => {
			return [key, module.config.getMeta(key)]
		});
	}

	get breadcrumbs_items() {
		return [{
			text: 'Modules',
			to: '/modules',
		}, {
			text: this.module.name
		}]
	}

	uninstall(module: Core.Module) {
		Core.modules.uninstall(module.name);

		this.$router.push({
			path: '/modules'
		});

		this.$forceUpdate();
	}

	created() {
		if (module === undefined) {
			this.$router.push({
				path: '/'
			});
		}
	}
}
</script>

<style>
.no-text-transform {
	text-transform: unset;
}
</style>
