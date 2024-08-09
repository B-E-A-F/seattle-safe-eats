<script lang="ts">
	import { Search } from 'lucide-svelte';

	export let className: string | undefined = undefined;
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search.replace(/[^a-zA-Z0-9 ]/g, ''))}`;
	}
</script>

<form class={className} on:submit|preventDefault={navigateSearch} action=".">
	<label class="input input-bordered border-2 flex items-center gap-2">
		<input type="search" class="grow" placeholder="Search for a restaurant" bind:value={search} />
		{#if search.length === 0}
			<Search size="24" />
		{/if}
	</label>
</form>

<style>
	input::placeholder {
		opacity: 0.9;
	}
</style>
