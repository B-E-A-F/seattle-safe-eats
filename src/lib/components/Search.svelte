<script lang="ts">
	import { onMount } from 'svelte';
	import MagnifyingGlass from './icons/MagnifyingGlass.svelte';

	export let className: string | undefined = undefined;
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search.replace(/[^a-zA-Z0-9 ]/g, ''))}`;
	}
</script>

<form class={className} on:submit|preventDefault={navigateSearch} action=".">
	<label class="input input-bordered flex items-center gap-2">
		<input type="search" class="grow" placeholder="Search for a restaurant" bind:value={search} />
		{#if search.length === 0}
			<MagnifyingGlass />
		{/if}
	</label>
</form>
