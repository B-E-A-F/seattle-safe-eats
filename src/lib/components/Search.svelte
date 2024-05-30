<script lang="ts">
	import { onMount } from 'svelte';

	export let className: string | undefined = undefined;
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search)}`;
	}

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		search = params.get('q') || '';
	});
</script>

<form class={className} on:submit|preventDefault={navigateSearch}>
	<label class="input input-bordered flex items-center gap-2">
		<input type="search" class="grow" placeholder="Search for a restaurant" bind:value={search} />

		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="w-4 h-4 opacity-70"
		>
			<path
				fill-rule="evenodd"
				d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
				clip-rule="evenodd"
			/>
		</svg>
	</label>
</form>
