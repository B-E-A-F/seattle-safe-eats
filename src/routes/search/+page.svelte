<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Grade from '$lib/components/Grade.svelte';
	import type { PageData } from './$types';
	import SearchGrade from './SearchGrade.svelte';
	import Building from '$lib/components/icons/Building.svelte';
	import MapPinned from '$lib/components/icons/MapPinned.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Seattle Safe Eats</title>
	<meta
		name="description"
		content="Explore Seattle's restaurant food safety inspections with ease. Get detailed insights into violations, inspection dates, and safety ratings to make informed dining decisions."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={`https://www.seattlesafeeats.com/`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Seattle Safe Eats" />
	<meta
		property="og:description"
		content="Explore Seattle's restaurant food safety inspections with ease"
	/>
	<meta
		property="og:image"
		content={`https://www.seattlesafeeats.com/og-undefined.png?version=${new Date().toLocaleDateString()}`}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.seattlesafeeats.com/" />
	<meta property="twitter:domain" content="seattlesafeeats.com" />
	<meta property="twitter:title" content="Seattle Safe Eats" />
	<meta
		property="twitter:description"
		content="Explore Seattle's restaurant food safety inspections with ease"
	/>
	<meta
		property="twitter:image"
		content={`https://www.seattlesafeeats.com/og-undefined.png?version=${new Date().toLocaleDateString()}`}
	/>
</svelte:head>

<div class="flex flex-col flex-grow">
	<div
		class="flex flex-col gap-2 border-b-2 border-b-base-200 justify-center items-center py-4 md:flex-row md:justify-normal md:p-4"
	>
		<a href="/">
			<h1 class="text-2xl">Seattle Safe Eats</h1>
		</a>
		<Search className="w-full px-4 md:w-auto" />
	</div>
	{#if data.businesses.length === 0}
		<div class="flex flex-1 flex-col items-center justify-center gap-4 md:text-2xl">
			<p class="px-8 text-center">No results found</p>
			<Grade grade="4" />
		</div>
	{:else}
		<ul class="flex flex-col gap-4 items-center p-4">
			{#each data.businesses as business}
				<li class="flex border border-base-200 w-full md:max-w-[450px] hover:bg-zinc-950">
					<a class="flex gap-4 w-full h-full p-4" href={`/restaurant/${business.business_id}`}>
						<SearchGrade grade={business.grade} />
						<div class="flex flex-col gap-2">
							<div class="flex flex-col">
								<!-- <a class="link" href={`/restaurant/${business.business_id}`}>{business.name}</a> -->
								<span class="font-bold text-xl text-nowrap text-ellipsis line-clamp-1"
									>{business.name}</span
								>
								<div class="flex flex-col mt-2 gap-2">
									<span class="flex gap-2"><Building /> {business.city}</span>
									<span class="flex gap-2"><MapPinned />{business.address}</span>
								</div>
							</div>
						</div>
						<!-- <span class="text-info-content">
						{`Last inspection: ${business.last_inspection ? business.last_inspection : 'No inspections'}`}
					</span>
					<span class="text-info-content">
						{`Last violation: ${business.last_violation ? business.last_violation : 'No violations'}`}
					</span>  -->
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
