<script lang="ts">
	import TimeAgo from 'javascript-time-ago';

	import Grade from '$lib/components/Grade.svelte';

	// English.
	import en from 'javascript-time-ago/locale/en';
	import { onMount } from 'svelte';

	TimeAgo.addDefaultLocale(en);

	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US');

	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search)}`;
	}

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		search = params.get('q') || '';
	});

	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);
</script>

<div class="flex flex-col flex-grow">
	<div
		class="flex flex-col gap-2 border-b-2 border-b-base-200 justify-center items-center py-4 md:flex-row md:justify-normal md:p-4"
	>
		<a href="/">
			<h1 class="text-2xl">Seattle Safe Eats</h1>
		</a>
		<form class="w-full px-4 md:w-auto" on:submit|preventDefault={navigateSearch}>
			<label class="input input-bordered flex items-center gap-2 md:w-96">
				<input
					type="search"
					class="grow"
					placeholder="Search for a restaurant"
					bind:value={search}
				/>

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
	</div>
	<ul>
		{#each data.businesses as business}
			<li class="flex flex-col p-4">
				<div class="flex items-center gap-4">
					<Grade grade={business.grade} />
					<div class="flex flex-col">
						<a class="link" href={`/restaurant/${business.business_id}`}>{business.name}</a>
						<span>{business.city}</span>
						<span>{business.address}</span>
					</div>
				</div>
				<span class="text-secondary">
					{`Last inspection: ${business.last_inspection ? timeAgo.format(new Date(business.last_inspection)) : 'No inspections'}`}
				</span>
				<span class="text-secondary">
					{`Last violation: ${business.last_violation ? timeAgo.format(new Date(business.last_violation)) : 'No violations'}`}
				</span>
			</li>
		{/each}
	</ul>
</div>
