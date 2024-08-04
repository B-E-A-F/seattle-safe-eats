<script lang="ts">
	import GradeSummary from './GradeSummary.svelte';
	import Timeline from './Timeline.svelte';
	import PointSummary from './PointSummary.svelte';
	import Inspection from './Inspection.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { ArrowDownToLine, Phone, Share, MapPinned, Building2, ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { business } = data;

	let backDisabled = false;
	let showFour = business.inspections.length > 4;

	function navigateBack() {
		backDisabled = true;
		if (!document.referrer.includes(window.location.host)) {
			window.location.href = '/';
		}
		window.history.back();
	}

	function shareLink() {
		navigator.share({
			title: business.name,
			text: `Check out ${business.name} on Seattle Safe Eats!`,
			url: window.location.href
		});
	}

	function gradeToText(grade: string) {
		switch (grade) {
			case '1':
				return 'Excellent';
			case '2':
				return 'Good';
			case '3':
				return 'Okay';
			case '4':
				return 'Needs to improve';
			default:
				return 'N/A';
		}
	}

	const title = 'Seattle Safe Eats - ' + business.name;
	const description =
		business.name +
		' food safety inspections and violations in Seattle. Get detailed insights into our safety ratings, inspection dates, and violations to make informed dining decisions.';
	const url = 'https://www.seattlesafeeats.com/restaurant/' + business.business_id;
	const image = `https://www.seattlesafeeats.com/og-${business.grade}.png?version=${business.latest_inspection?.date ?? new Date().toLocaleDateString()}`;
	const ogTitle = `Seattle Safe Eats | ${business.name}`;
	const ogDescription = (grade: string, name: string) => {
		switch (grade) {
			case '1':
			case '2':
			case '3':
			case '4':
				return `Check out ${name}'s "${gradeToText(grade)}" food safety rating on Seattle Safe Eats`;
			default:
				return `Check out ${name}'s food safety rating on Seattle Safe Eats`;
		}
	};
</script>

<MetaTags
	{title}
	{description}
	{url}
	{image}
	{ogTitle}
	ogDescription={ogDescription(business.grade, business.name)}
/>

<div class="flex justify-between md:hidden">
	<button class="btn btn-ghost" on:click={navigateBack} disabled={backDisabled}>
		<ArrowLeft />
	</button>
	<button class="btn btn-ghost" on:click={shareLink}>
		<Share />
	</button>
</div>

<div class="flex flex-col gap-8 w-full lg:w-3/4 xl:w-1/2 h-full mx-auto flex-grow py-16">
	<div class="flex flex-grow gap-4 items-center justify-between flex-row w-full max-h-40">
		<GradeSummary grade={business.grade} />
		<div class="flex flex-col w-full justify-between h-full">
			<h1 class="text-4xl">{business.name}</h1>

			<div class="flex flex-col justify-evenly w-full overflow-hidden h-full">
				<span class="flex gap-2"
					><Building2 class="text-accent" /> {business.city}, WA {business.zip_code}</span
				>
				<span class="flex gap-2"><MapPinned class="text-accent" />{business.address}</span>
				<span class="flex gap-2"
					><Phone class="text-accent" />{business.phone != undefined
						? business.phone
						: 'no phone #'}</span
				>
			</div>
		</div>
	</div>

	{#if !(business.inspections.length === 1 && business.inspections[0].violations.length === 0)}
		<div class="pt-4"><PointSummary inspections={business.inspections} /></div>
	{/if}
	<Timeline inspections={business.inspections} />
	<div class="flex w-full self-center divider">Inspections</div>
	{#if business.inspections.length === 1 && business.inspections[0].violations.length === 0}
		<div class="flex flex-grow flex-col items-center justify-center gap-4">
			<p class="text-center">
				This restaurant has not received any inspections, or none could be found
			</p>
		</div>
	{:else if showFour}
		<ul class="flex flex-col items-center justify-center gap-6">
			{#each business.inspections.slice(0, 4) as inspection}
				<Inspection {inspection} />
			{/each}
		</ul>

		<div class="flex self-center items-center justify-center mb-8">
			<button on:click={() => (showFour = false)} class="btn btn-primary"
				>Show All <ArrowDownToLine /></button
			>
		</div>
	{:else}
		<ul class="flex flex-col items-center justify-center gap-6">
			{#each business.inspections as inspection}
				<Inspection {inspection} />
			{/each}
		</ul>
	{/if}
</div>
