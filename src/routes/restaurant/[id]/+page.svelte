<script lang="ts">
	import Grade from '$lib/components/Grade.svelte';
	import Search from '$lib/components/Search.svelte';
	import Share from '$lib/components/icons/Share.svelte';
	import Alert from '$lib/components/icons/Alert.svelte';
	import Hint from '$lib/components/icons/Hint.svelte';
	import BackArrow from '$lib/components/icons/BackArrow.svelte';
	import type { PageData } from './$types';
	import RiskCategoryInfo from './RiskCategoryInfo.svelte';

	export let data: PageData;
	const { business } = data;

	let backDisabled = false;

	function navigateBack() {
		backDisabled = true;
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
</script>

<svelte:head>
	<title>Seattle Safe Eats | {business.name}</title>
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
	<div class="flex flex-col p-4 gap-4">
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
				<span class="text-md font-bold text-red-600">{business.risk_category}</span>
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
						{#if parseInt(inspection.score) > 0}
							<span>Score: {inspection.score}</span>
						{/if}
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
												<span class="font-semibold">{violation.record_id}</span>
												<div class="flex flex-row items-center gap-4">
													<div class="w-6">
														<Alert className={calculateViolationTypeColorClass(violation.type)} />
													</div>
													<span>
														{violation.description}
														<span class="text-red-600">
															(+{violation.points})
														</span>
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
