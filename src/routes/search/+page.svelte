<script lang="ts">
	import SearchHeader from '$lib/components/SearchHeader.svelte';
	import Grade from '$lib/components/Grade.svelte';
	import type { PageData } from './$types';
	import SearchGrade from './SearchGrade.svelte';
	import Building from '$lib/components/icons/Building.svelte';
	import MapPinned from '$lib/components/icons/MapPinned.svelte';
	import { Phone } from 'lucide-svelte';

	export let data: PageData;

	function gradeToText(grade: string | undefined) {
		switch (grade) {
			case '1':
				return 'Excellent';
			case '2':
				return 'Good';
			case '3':
				return 'Okay';
			case '4':
				return 'Needs To Improve';
			default:
				return 'No Grade Available';
		}
	}
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

<div class="flex flex-col justify-center w-full h-full">
	<SearchHeader />
	{#if data.businesses.length === 0}
		<div class="flex flex-1 flex-col items-center justify-center gap-4 md:text-2xl">
			<p class="px-8 text-center">No results found</p>
			<Grade grade="4" />
		</div>
	{:else}
		<ul
			class="w-full lg:w-3/4 xl:w-1/2 h-full flex flex-col gap-8 items-center py-4 max-w-4xl justify-center mx-auto px-4"
		>
			{#each data.businesses as business}
				<li
					class="card bg-base-100 py-4 w-full shadow-xl border border-base-content/20 shadow-gray-900/10"
				>
					<a
						class="flex flex-col gap-4 w-full h-full p-2 justify-evenly"
						href={`/restaurant/${business.business_id}`}
					>
						<span class="font-bold text-xl truncate mx-auto">{business.name}</span>
						<div class="flex w-full">
							<div class="flex flex-col items-center justify-center w-1/2">
								<SearchGrade grade={business.grade} />
								<span class="text-center">{gradeToText(business.grade)}</span>
							</div>
							<div class="flex flex-col justify-evenly w-1/2 overflow-hidden">
								<span class="flex gap-2"><Building class="text-accent" /> {business.city}</span>
								<span class="flex gap-2"><MapPinned class="text-accent" />{business.address}</span>
								<span class="flex gap-2"
									><Phone class="text-accent" />{business.phone != undefined
										? business.phone
										: 'no phone #'}</span
								>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
