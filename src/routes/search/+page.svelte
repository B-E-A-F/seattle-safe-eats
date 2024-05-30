<script lang="ts">
	import TimeAgo from 'javascript-time-ago';
	import en from 'javascript-time-ago/locale/en';
	import Search from '$lib/components/Search.svelte';
	import Grade from '$lib/components/Grade.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	TimeAgo.addDefaultLocale(en);

	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US');
</script>

<div class="flex flex-col flex-grow">
	<div
		class="flex flex-col gap-2 border-b-2 border-b-base-200 justify-center items-center py-4 md:flex-row md:justify-normal md:p-4"
	>
		<a href="/">
			<h1 class="text-2xl">Seattle Safe Eats</h1>
		</a>
		<Search className="w-full px-4 md:w-auto" />
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
