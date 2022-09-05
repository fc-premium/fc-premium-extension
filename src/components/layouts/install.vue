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
		@keydown.enter="requestRepos"
		:loading="isLoading" />

	<v-tabs class="mb-5"
		grow
		@change="requestRepos"
		v-model="topicTab">
		<v-tab>Modules</v-tab>
		<v-tab>Themes</v-tab>
		<v-tab v-if="privateServerIsEnabled">Private server</v-tab>
	</v-tabs>

	<v-spacer />

	<v-file-input
		v-if="fileLoadingIsEnabled"
		v-model="local_file"
		label="File input"
		filled
		@change="on_file_change"
	></v-file-input>


	<v-alert v-if="currentError !== null"
		:value="currentError !== null"
		@input="currentError = null"
		type="error"
		text
		dismissible
		border="left">
		<b>{{currentError.name}}</b>: {{currentError.message}}
	</v-alert>

	<v-row v-for="(repo, i) in filterRepos(requestedRepos)"
		:key="i">
		<v-col>
			<v-lazy :options="{ threshold: 1 }">
				<v-card :class="((isInstalled(repo.name) && !isEnabled(repo.name)) ? 'disabled-card ' : '' ) + ' no-selection'"
					hover
					:loading="repo.isInstalling === true"
					:ripple="false"
					@click="openRepo(repo.name)">
					<v-card-title>{{repo.name}}</v-card-title>
					<v-card-subtitle>{{repo.lastRelease.tag_name}}</v-card-subtitle>
					<v-card-text>{{repo.description}}</v-card-text>
					<v-card-subtitle>
						<v-avatar tile
							size="28"
							class="mr-1">
							<v-img :src="repo.owner.avatar_url" />
						</v-avatar>
						{{repo.owner.login}}
						<div style="float: right;">

							<v-btn v-if="isInstalled(repo.name)"
								:disabled="!module_has_settings(repo.name)"
								text
								small
								class="no-text-transform caption .font-weight-light">
								<v-icon left
									color="primary">mdi-settings</v-icon>
								<span>Settings</span>
							</v-btn>

							<v-btn v-if="repo.has_issues"
								text
								small
								class = "no-text-transform caption .font-weight-light"
								@click="openIssues(repo)">
								<v-icon left
									color="primary">mdi-bug-outline</v-icon>
								<span>Issues</span>
							</v-btn>

							<v-btn text
								small
								:loading="repo.isInstalling"
								@click.stop="isInstalled(repo.name) ? uninstall(repo.name) : install(repo)"
								class="no-text-transform caption .font-weight-light">
								<v-icon left
									color="primary">{{isInstalled(repo.name) ? 'mdi-trash-can-outline' : 'mdi-download'}}</v-icon>
								<span>{{isInstalled(repo.name) ? 'Uninstall' : 'Install'}}</span>

							</v-btn>

							<v-btn v-if="isInstalled(repo.name)"
								text
								small
								@click.stop="toogleIsEnabled(repo.name)"
								class="no-text-transform caption .font-weight-light">
								<v-icon left
									color="primary">mdi-{{isEnabled(repo.name) ? 'pause' : 'play' }}</v-icon>
								<span>{{isEnabled(repo.name) ? 'Disable' : 'Enable' }}</span>
							</v-btn>
						</div>
					</v-card-subtitle>
				</v-card>
			</v-lazy>
		</v-col>
	</v-row>
</div>
</template>

<script lang="ts">
import {
Component, Vue
} from 'vue-property-decorator';

import {
Core
} from 'fc-premium-core';

const Octokit = require("@octokit/rest");
const octokit = new Octokit();

@Component({})
export default class Install extends Vue {

	private readonly privateServerIsEnabled: boolean = Core.ConfigHandler.get('core.enable-private-server');
	private readonly fileLoadingIsEnabled: boolean = Core.ConfigHandler.get('core.enable-file-loading');

	private filterText!: string;
	private requestedRepos!: any[];
	private currentPromise!: Promise < any > | null;
	private abortController!: AbortController;
	private currentError!: Error;
	private topicTab!: number;
	private local_file: File | null = null;

	public data() {
		return {
			filterText: '',
			requestedRepos: [],
			currentPromise: null,
			abortController: null,
			currentError: null,
			topicTab: 0
		}
	}

	get current_topic(): string {
		switch (this.topicTab) {
			default:
			case 0:
				return 'fc-premium-module';
			case 1:
				return 'fc-premium-theme';
		}
	}

	private get isLoading(): boolean {
		return this.currentPromise !== null;
	}

	public async requestRepos() {
		if (this.topicTab !== 2)
			return this.requestReposFromGithub();

		const url = Core.ConfigHandler.get('core.private-server-url');

		const response = await fetch(url + '/list.php').then(r => r.text());

		this.requestedRepos = response.trim().split('\n').map((name: string) => {
			return {
				name: name,
				lastRelease: {
					tag_name: 'none',
					assets: [{
						browser_download_url: `${url}/${name}/index.js`
					}]
				},
				description: '',
				owner: {
					owner: 'private'
				}
			}
		});


		/*
		console.log('background page:', browser);
		const backgroundPage = await browser.runtime.getBackgroundPage();

		if (backgroundPage === null)
			return;

		backgroundPage.location = url;


		backgroundPage.addEventListener('DOMContentLoaded', () => {
			const doc = backgroundPage.document;

			this.requestedRepos = Array.from(doc.querySelectorAll < HTMLImageElement > ('img[alt="[DIR]"]')).map(image => {
				const tr = < HTMLTableRowElement > image!.parentElement!.parentElement

				const name = ( < HTMLTableColElement > tr.children[1]) !.innerText.trim().slice(0, -1);
				const time = ( < HTMLTableColElement > tr.children[2]) !.innerText.trim();

				return {
					name: name,
					lastRelease: {
						tag_name: time
					},
					description: '',
					owner: {
						owner: 'private'
					}
				}
			});

		})
		*/

		// console.log(this.requestedRepos)
	}

	private async on_file_change(e: File) {

		// read file
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent < FileReader > ) => {
			const data = e.target!.result;

			if (data === null)
				return;

			const blob = new Blob([data], {
				type: 'application/javascript'
			});

			const url = URL.createObjectURL(blob);

			try {
				debugger;
				Core.ModuleHandler.installModuleFromURL(url, true);
			} finally {
				URL.revokeObjectURL(url);
			}
		}

		reader.readAsText(e);
	}

	private async requestReposFromGithub() {
		// Truncate previous requested repos
		this.requestedRepos.length = 0;

		if (this.abortController !== null && this.isLoading)
			this.abortController.abort();

		this.abortController = new AbortController();
		const signal = this.abortController.signal;

		const request = this.currentPromise = octokit.search.repos({
			q: `topic:${this.current_topic} ${this.filterText}`,

			request: {
				signal: signal
			}
		}).catch((err: Error) => {
			if (signal.aborted === false)
				this.currentError = err;

			return null;
		});

		const response = await request;

		if (response === null)
			return;

		let releasesRequest = Promise.all(response.data.items.map(async function(repo: any) {

			const releases = await octokit.repos.listReleases({
				owner: repo.owner.login,
				repo: repo.name,
				per_page: 1,

				request: {
					signal: signal
				}
			});

			repo.lastRelease = releases.data[0];

			return repo;
		})).catch((err: Error) => {
			if (signal.aborted === false)
				this.currentError = err;

			return null;
		});

		const releasesResponse = await releasesRequest;

		if (releasesResponse === null)
			return;

		this.requestedRepos = releasesResponse.filter((repo: any) =>
			repo.lastRelease !== undefined
		);

		if (request === this.currentPromise)
			this.currentPromise = null;
	}

	public openRepo(name: string) {
		this.$router.push({
			path: `/module/${name}`,
		});
	}

	public openIssues(repo: any) {
		window.open(repo.html_url + '/issues');
	}

	filterRepos(__repos: any) {

		let repos: any = __repos.slice();

		const keywords = this.filterText.toLowerCase()
			.split(' ').filter(k => k.length > 0);

		if (keywords.length !== 0) {
			repos = repos.filter((repo: any) =>
				keywords.every(keyword => repo.name.includes(keyword))
			)
		}

		return repos.sort((repo_a: any, repo_b: any) => {
			return repo_a.name.localeCompare(repo_b.name)
		});
	}

	install(repo: any) {

		repo.isInstalling = true;
		this.$forceUpdate()

		Core.ModuleHandler.installModuleFromGithub(repo, true)
			.catch(err => {
				this.currentError = err;
				console.error(err, repo)

			}).finally(() => {
				repo.isInstalling = false;
				this.$forceUpdate();
			});
	}

	uninstall(repo_name: any) {
		Core.ModuleHandler.uninstall(repo_name);
		this.$forceUpdate();
	}

	isInstalled(repo_name: any) {
		// console.log(Core.ModuleHandler.getInstalledModules(), repo.name, Core.ModuleHandler.getInstalledModules().includes(repo.name))
		return Core.ModuleHandler.getInstalledModules().has(repo_name);
	}

	module_has_settings(module_name: string) {
		return Core.ConfigHandler.keys(`${module_name}.`).length > 0;
	}

	toogleIsEnabled(repo_name: string) {
		Core.ModuleHandler.setModuleIsEnabled(repo_name, !this.isEnabled(repo_name));
		this.$forceUpdate()
	}

	isEnabled(repo_name: string) {
		return Core.ModuleHandler.getModuleIsEnabled(repo_name);
	}

	created() {
		this.requestRepos();
	}
}
</script>
