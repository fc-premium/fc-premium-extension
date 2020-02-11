<template>
<div class="search-bar-container">
	<input type="text"
		class="search-bar"
		placeholder="Filter modules by name"
		@keyup="filterModules" />
</div>
</template>

<script lang="ts">
import {
	Component,
	Prop,
	Vue
} from 'vue-property-decorator'

import Module from '../module'

function matchKeywords(keywords: string[], name: string) {
	name = name.toLowerCase();
	return keywords.every(keyword => name.includes(keyword));
}

@Component({
	props: ['moduleNameList']
})
export default class SearchBar extends Vue {

	@Prop() private moduleNameList!: {
		[key: string]: boolean
	};

	filterModules(event: KeyboardEvent): void {

		const keywords = ( < HTMLInputElement > event.target).value.toLowerCase()
			.split(' ').filter(k => k.length > 0);

		if (keywords.length === 0)
			Object.keys(this.moduleNameList).forEach((name) =>
				this.moduleNameList[name] = true
			);
		else
			Object.keys(this.moduleNameList).forEach((name) =>
				this.moduleNameList[name] = matchKeywords(keywords, name)
			);
	}
}
</script>

<style>
.search-bar-container {
	width: 100%;
	height: 50px;
	position: relative;
	display: inline-block;
}

.search-bar-container:after {
	position: absolute;
	height: 3px;
	width: 0;
	left: 0%;
	content: '';
	background: #0092d1;
	transition: all 0.25s linear;
	bottom: 0;
}

.search-bar-container:focus-within:after {
	width: 100%;
}


input.search-bar {
	width: 100%;
	height: 100%;
	border: 0px;
	border-bottom: 1px solid gray;
	outline: none;
	box-sizing: border-box;
	font-size: larger;
	background-color: #f7f7f7;
}
</style>
