<script lang="ts">
	import GradeSummary from './GradeSummary.svelte';
	import Timeline from './Timeline.svelte';
	import PointSummary from './PointSummary.svelte';
	import Inspection from './Inspection.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { gradeToText } from '$lib/utils';
	import { ArrowDownToLine, Phone, Share, MapPinned, Building2, ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Alert from '$lib/components/Alert.svelte';

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

	const title = 'Seattle Safe Eats - ' + business.name;
	const description =
		business.name +
		' food safety inspections and violations in Seattle. Get detailed insights into our safety ratings, inspection dates, and violations to make informed dining decisions.';
	const url = 'https://www.seattlesafeeats.com/restaurant/' + business.business_id;
	const image = `https://pub-b8e099feb55c4c2798b6a2442f0c9f20.r2.dev/og-${business.grade}.png?version=${business.latest_inspection?.date ?? new Date().toLocaleDateString()}`;
	const ogTitle = `Seattle Safe Eats | ${business.name}`;
	const ogDescription = (grade: string, name: string) => {
		switch (grade) {
			case '1':
			case '2':
			case '3':
			case '4':
				return `Check out the "${gradeToText(grade)}" food safety rating at ${name} on Seattle Safe Eats.`;
			default:
				return `Check out ${name} food safety rating on Seattle Safe Eats`;
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

<div
	class="flex flex-col gap-8 w-full md:w-3/4 xl:w-1/2 h-full mx-auto flex-grow pb-16 md:pt-16 px-4 md:px-0"
>
	<div class="pt-4 lg:pt-0">
		<Alert riskLevel={business.risk_category} lastInspection={business.latest_inspection} />
	</div>

	<div>
		<div class="flex justify-between md:pb-8">
			<button class="btn btn-ghost" on:click={navigateBack} disabled={backDisabled}>
				<ArrowLeft />
			</button>
			<button class="btn btn-ghost" on:click={shareLink}>
				<Share />
			</button>
		</div>
		<div class="flex gap-4 items-center justify-evenly flex-row w-full overflow-hidden">
			<GradeSummary grade={business.grade} />
			<div class="flex flex-col justify-between h-full gap-4">
				<h1 class="text-xl lg:text-4xl">{business.name}</h1>
				<div class="flex flex-col justify-evenly h-full gap-4">
					<span class="flex gap-2 truncate">
						<Building2 class="text-accent" />
						{business.city}, WA {business.zip_code}
					</span>
					<span class="flex gap-2 truncate">
						<MapPinned class="text-accent w-6" />
						{business.address}
					</span>
					{#if business.phone}
						<span class="flex gap-2 truncate"
							><Phone class="text-accent" />
							{business.phone}
						</span>
					{/if}
				</div>
			</div>
		</div>
	</div>

	{#if business.inspections.length > 0}
		<div class="pt-4"><PointSummary inspections={business.inspections} /></div>
	{/if}
	<Timeline inspections={business.inspections} />
	<div class="flex w-full self-center divider">Inspections</div>
	{#if business.inspections.length === 0}
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
		<button on:click={() => (showFour = false)} class="btn btn-primary mx-auto"
			>Show All <ArrowDownToLine /></button
		>
	{:else}
		<ul class="flex flex-col items-center justify-center gap-6">
			{#each business.inspections as inspection}
				<Inspection {inspection} />
			{/each}
		</ul>
	{/if}
</div>
