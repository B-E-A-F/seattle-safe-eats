<script lang="ts">
	import Grade from '$lib/components/Grade.svelte';
	import type { PageData } from './$types';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { Phone, Building2, MapPinned } from 'lucide-svelte';

	export let data: PageData;
	let showNoGrade = false;

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

<MetaTags
	title="Seattle Safe Eats"
	description="Explore Seattle's restaurant food safety inspections with ease. Get detailed insights into violations, inspection dates, and safety ratings to make informed dining decisions."
	image={`https://www.seattlesafeeats.com/og-undefined.png?version=${new Date().toLocaleDateString()}`}
	url={`https://www.seattlesafeeats.com/`}
	ogDescription="Explore Seattle's restaurant food safety inspections with ease"
/>

{#if data.businesses.length === 0}
	<div class="flex flex-1 flex-col items-center justify-center gap-4 md:text-2xl">
		<p class="px-8 text-center">No results found</p>
		<Grade grade="4" />
	</div>
{:else}
	<ul
		class="w-full lg:w-3/4 xl:w-1/2 h-full flex flex-col gap-8 items-center py-4 max-w-4xl justify-center mx-auto px-4"
	>
		<li>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text pr-2">Show All </span>
					<input type="checkbox" class="checkbox checkbox-secondary" bind:checked={showNoGrade} />
				</label>
			</div>
		</li>
		{#each data.businesses as business}
			{#if business.grade !== undefined || showNoGrade}
				<li class="card bg-base-100 py-4 w-full shadow-lg border border-base-content/20">
					<a
						class="flex flex-col gap-4 w-full h-full p-2 justify-evenly"
						href={`/restaurant/${business.business_id}`}
					>
						<span class="font-bold text-xl truncate mx-auto">{business.name}</span>
						<div class="flex w-full">
							<div class="flex flex-col items-center justify-center w-1/2">
								<Grade grade={business.grade} />
								<span class="text-center">{gradeToText(business.grade)}</span>
							</div>
							<div class="flex flex-col justify-evenly w-1/2 overflow-hidden h-full">
								<span class="flex gap-2">
									<Building2 class="text-accent" />
									{business.city}, WA {business.zip_code}
								</span>
								<span class="flex gap-2">
									<MapPinned class="text-accent" />{business.address}
								</span>
								{#if business.phone}
									<span class="flex gap-2">
										<Phone class="text-accent" />{business.phone}
									</span>
								{/if}
							</div>
						</div>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
{/if}
