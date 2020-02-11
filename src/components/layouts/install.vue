<template>
<div>

	<div class="display-2 my-5 font-weight-light">
		<v-icon class="display-2 mt-n2">mdi-plus</v-icon>
		Install Modules
	</div>

	<v-divider class="mb-10" />

	<v-text-field label="Filter modules by name"
		single-line
		v-model="filterText"
		append-icon="mdi-magnify"
		@click:append="requestRepos"
		@keydown.enter="requestRepos" />

	<v-spacer />

	<v-row v-if="currentError !== null">
		<v-col>
			<v-card hover
				class="error">
				<v-card-title>Error</v-card-title>
				<v-card-subtitle>{{currentError.name}}</v-card-subtitle>
				<v-card-text>{{currentError.message}}</v-card-text>
			</v-card>

		</v-col>
	</v-row>

	<div class="text-center mt-10"
		v-if="isLoading">
		<v-progress-circular indeterminate
			size="48" />
	</div>

	<!-- <div class="display-2 my-5 font-weight-light">
                <v-icon class="display-2 mt-n2">mdi-star</v-icon>
                Featured
        </div> -->

	<v-row v-for="(repo, i) in requestedRepos"
		:key="i">
		<v-col>
			<v-lazy :options="{ threshold: 1 }">
				<v-card hover
					ripple
					@click="openLink('https://github.com/' + repo.full_name)">
					<v-card-title>{{repo.name}}</v-card-title>
					<v-card-text>{{repo.description}}</v-card-text>
					<v-card-subtitle>
						<v-avatar tile
							size="28"
							class="mr-1">
							<v-img :src="repo.owner.avatar_url" />
						</v-avatar>
						{{repo.owner.login}}
					</v-card-subtitle>
				</v-card>
			</v-lazy>
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


const Octokit = require("@octokit/rest");
const octokit = new Octokit();


// Compare: https://developer.github.com/v3/repos/#list-organization-repositories

// octokit.search.repos({
// 	q: 'topic:fc-premium-plugin'
// }).then(console.log);
//

@Component({})
export default class Install extends Vue {

	private filterText!: string;
	private requestedRepos!: any[];
	private currentPromise!: Promise < any > | null;
	private abortController!: AbortController;
	private currentError!: Error;


	public data() {
		return {
			filterText: '',
			requestedRepos: [],
			currentPromise: null,
			abortController: null,
			currentError: null
		}
	}

	private get isLoading(): boolean {
		console.log('Get is loading', this.currentPromise)
		return this.currentPromise !== null;
	}

	public async requestRepos() {

		console.log('requesting', this.currentPromise, this.isLoading);

		if (this.abortController !== null && this.isLoading)
			this.abortController.abort();

		this.abortController = new AbortController();
		const signal = this.abortController.signal;

		const request = this.currentPromise = octokit.search.repos({
			q: 'topic:atom ' + this.filterText,

			request: {
				signal: signal
			}
		}).catch((err: Error) => {

			if (signal.aborted !== true) {
				console.error('Error requesting: ', [err])

				this.currentError = err;
			}

			return null;
		});


		const response = await request;

		if (response === null)
			return;

		console.log('Requested: ', response.data.items);

		if (request === this.currentPromise)
			this.currentPromise = null;

		this.requestedRepos = response.data.items;
	}

	public openLink(url: string) {
		window.open(url);
	}

	created() {
		this.requestRepos();
	}

	// filterPackages(modules: Module[]) {
	// 	const keywords = this.filterText.toLowerCase()
	// 		.split(' ').filter(k => k.length > 0);
	//
	// 	if (keywords.length === 0)
	// 		return modules;
	// 	// else
	// 	// 	this.moduleNameList).forEach((name) =>
	// 	// 		this.moduleNameList[name] = matchKeywords(keywords, name)
	// 	// 	);
	//
	// 	return this.$store.state.modules.filter((module: Module) =>
	// 		keywords.every(keyword => module.name.includes(keyword))
	// 	);
	// }
}
</script>
