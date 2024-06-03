<script lang="ts">
	import Grade from '$lib/components/Grade.svelte';
	import Search from '$lib/components/Search.svelte';
	import Share from '$lib/components/icons/Share.svelte';
	import Alert from '$lib/components/icons/Alert.svelte';
	import BackArrow from '$lib/components/icons/BackArrow.svelte';
	import type { PageData } from './$types';
	import RiskCategoryInfo from './RiskCategoryInfo.svelte';

	export let data: PageData;
	const { business } = data;

	let backDisabled = false;

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

	function calculateInspectionResultClass(result: string) {
		switch (result) {
			case 'Satisfactory':
				return 'text-green-600';
			case 'Unsatisfactory':
				return 'text-red-600';
			case 'Complete':
			default:
				return '';
		}
	}

	function calculateViolationTypeColorClass(type: string) {
		switch (type) {
			case 'BLUE':
				return 'text-blue-600';
			case 'RED':
				return 'text-red-600';
		}
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

	function ogDescription(grade: string, name: string) {
		switch (grade) {
			case '1':
			case '2':
			case '3':
			case '4':
				return `Check out ${name}'s "${gradeToText(grade)}" food safety rating on Seattle Safe Eats`;
			default:
				return `Check out ${name}'s food safety rating on Seattle Safe Eats`;
		}
	}
</script>

<svelte:head>
	<title>Seattle Safe Eats - {business.name}</title>
	<meta
		name="description"
		content="{business.name} food safety inspections and violations in Seattle. Get detailed insights into our safety ratings, inspection dates, and violations to make informed dining decisions."
	/>

	<!-- Facebook Meta Tags -->
	<meta
		property="og:url"
		content={`https://www.seattlesafeeats.com/restaurant/${business.business_id}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`Seattle Safe Eats | ${business.name}`} />
	<meta property="og:description" content={`${ogDescription(business.grade, business.name)}`} />
	<meta
		property="og:image"
		content={`https://www.seattlesafeeats.com/og-${business.grade}.png?version=${business.latest_inspection?.date ?? new Date().toLocaleDateString()}`}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="seattlesafeeats.com" />
	<meta
		property="twitter:url"
		content={`https://www.seattlesafeeats.com/restaurant/${business.business_id}`}
	/>
	<meta name="twitter:title" content={`Seattle Safe Eats | ${business.name}`} />
	<meta name="twitter:description" content={`${ogDescription(business.grade, business.name)}`} />
	<meta
		property="twitter:image"
		content={`https://www.seattlesafeeats.com/og-${business.grade}.png?version=${business.latest_inspection?.date ?? new Date().toLocaleDateString()}`}
	/>
</svelte:head>

<div class="flex flex-col flex-grow">
	<div class="flex justify-between md:hidden">
		<button class="btn btn-ghost" on:click={navigateBack} disabled={backDisabled}>
			<BackArrow />
		</button>
		<button class="btn btn-ghost" on:click={shareLink}>
			<Share />
		</button>
	</div>
	<div
		class="hidden md:flex flex-col gap-2 border-b-2 border-b-base-200 justify-center items-center py-4 md:flex-row md:justify-normal md:p-4"
	>
		<a href="/">
			<h1 class="text-2xl">Seattle Safe Eats</h1>
		</a>
		<Search className="w-full px-4 md:w-auto" />
	</div>
	<div class="flex flex-col p-4 gap-2">
		<div class="flex flex-col">
			<strong class="text-md font-bold">Restaurant: </strong>
			<span class="text-2xl">{business.name}</span>
			<strong class="text-md font-bold">Address: </strong>
			<span class="text-md">{business.address}</span>
			<span class="text-md">{business.city}, WA {business.zip_code}</span>
			{#if business.phone}
				<strong class="text-md font-bold">Phone number: </strong>
				<h2 class="text-md">{business.phone}</h2>
			{/if}
			<div class="flex items-center gap-2">
				<span class="text-lg font-bold">{business.risk_category}</span>
				<RiskCategoryInfo />
			</div>
		</div>

		<div class="flex flex-col gap-2 md:max-w-96">
			<strong class="text-md font-bold">Grade: </strong>
			<Grade grade={business.grade} withLabel withDescription withDial />
		</div>
		<div class="divider md:max-w-96">Inspections</div>
		{#if business.inspections.length === 1 && business.inspections[0].violations.length === 0}
			<div
				class="flex flex-1 flex-col items-center justify-center gap-4 md:items-start md:justify-start md:max-w-96"
			>
				<p class="px-8 text-center">
					This restaurant has not received any inspections, or none could be found
				</p>
			</div>
		{:else}
			<ul class="flex flex-col gap-6 md:max-w-96">
				{#each business.inspections as inspection}
					<li class="flex flex-col gap-2 p-2 border border-primary">
						<div class="flex justify-between">
							<span class={calculateInspectionResultClass(inspection.result)}
								>{inspection.result}</span
							>
							<span>{new Date(inspection.date).toLocaleDateString()}</span>
						</div>
						<span>{inspection.type}</span>

						{#if inspection.violations.length > 0}
							<div class="collapse collapse-arrow bg-base-200">
								<input type="checkbox" class="peer" />
								<div
									class="collapse-title text-primary-content peer-checked:text-secondary-content"
								>
									Violations
								</div>
								<div
									class="collapse-content text-primary-content peer-checked:text-secondary-content"
								>
									<ul>
										{#each inspection.violations as violation, i}
											<li class="flex flex-col gap-2">
												<div class="flex flex-row items-center gap-4">
													<div class="w-6">
														<Alert className={calculateViolationTypeColorClass(violation.type)} />
													</div>
													<span>
														{violation.description}
													</span>
												</div>
												{#if i < inspection.violations.length - 1}
													<div class="divider m-4" />
												{/if}
											</li>
										{/each}
									</ul>
								</div>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
