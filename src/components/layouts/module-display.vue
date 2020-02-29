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

		<v-row v-for="(option, i) in module_settings"
			:key="i">
			<v-col class="headline no-selection"
				cols="8">
				<StringInput v-if="option.type == 'string'"
					:option="option" />

				<PasswordInput v-else-if="option.type == 'password'"
					:option="option" />

				<EmailInput v-else-if="option.type == 'email'"
					:option="option" />

				<ColorInput v-else-if="option.type == 'color'"
					:option="option" />

				<SelectInput v-else-if="option.type == 'select'"
					:option="option" />

				<div v-else-if="option.type == 'number'">

					<v-input :hint="option.description"
						:label="option.title"
						:hide-details="option.description == undefined"
						persistent-hint>
					</v-input>
					<v-text-field type="number"
						dense
						:value="option.value"></v-text-field>
				</div>

				<div v-else-if="option.type == 'boolean'">
					<v-checkbox :value="option.value"
						:hint="option.description"
						persistent-hint
						:label="option.title"></v-checkbox>
				</div>

				<!-- {{option}} -->
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

import StringInput from '../templates/inputs/string-input.vue';
import PasswordInput from '../templates/inputs/password-input.vue';
import EmailInput from '../templates/inputs/email-input.vue';
import ColorInput from '../templates/inputs/color-input.vue';
import SelectInput from '../templates/inputs/select-input.vue';

@Component({
	components: {
		StringInput,
		PasswordInput,
		EmailInput,
		ColorInput,
		SelectInput,
	}
})
export default class ModuleDisplay extends Vue {

	private module!: Core.Module;

	data() {
		return {
			module: Core.modules.get(this.$route.params.moduleName)
		}
	}

	get module_settings() {
		const module = this.module;

		return module.config.keys().map(key => {
			console.log(module.config.getMeta(key))
			return module.config.getMeta(key)
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

		// this.$router.push({
		// 	path: '/'
		// });

		this.$forceUpdate();
	}


	created() {

		console.log(this)

		// this.$destroy();
		// const module: Module = this.$store.state.modules.find((module: Module) =>
		// 	module.name == this.$route.params.moduleName
		// );
		if (module === undefined) {

			this.$router.push({
				path: '/'
			});


		}
	}

	// hide() {
	// 	this.$destroy();
	// }
}
</script>

<style>
.no-text-transform {
	text-transform: unset;
}
</style>
