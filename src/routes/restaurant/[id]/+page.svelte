<script lang="ts">
	import BackArrow from '$lib/components/icons/BackArrow.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	let backDisabled = false;

	function navigateBack() {
		backDisabled = true;
		window.history.back();
	}

	function calculateInspectionResultClass(result: string) {
		switch (result) {
			case 'Satisfactory':
				return 'text-success';
			case 'Unsatisfactory':
				return 'text-error';
			case 'Complete':
			default:
				return '';
		}
	}
</script>

<div class="flex flex-col flex-1">
	<div>
		<button class="btn btn-ghost" on:click={navigateBack} disabled={backDisabled}>
			<BackArrow />
		</button>
	</div>
	<div class="flex flex-col flex-1 p-4">
		<h2 class="text-2xl">{data.businesses.name}</h2>
		<h2 class="text-2xl">{data.businesses.city}</h2>
		{#if data.businesses.phone}
			<h2 class="text-2xl">{data.businesses.phone}</h2>
		{/if}
		<div class="divider md:max-w-80">Inspections</div>
		<ul class="flex flex-col gap-6 md:max-w-80">
			{#each data.businesses.inspections as inspection}
				<li class="flex flex-col gap-2 p-2 border border-primary">
					<div class="flex justify-between">
						<span class={calculateInspectionResultClass(inspection.result)}
							>{inspection.result}</span
						>
						<span class="text-secondary">{new Date(inspection.date).toLocaleDateString()}</span>
					</div>
					{#if inspection.score > 0}
						<span class="font-semibold">Score: {inspection.score}</span>
					{/if}
					<span>{inspection.type}</span>

					{#if inspection.violations.length > 0}
						<div class="collapse collapse-arrow bg-base-200">
							<input type="checkbox" class="peer" />
							<div class="collapse-title text-primary-content peer-checked:text-secondary-content">
								Violations
							</div>
							<div
								class="collapse-content text-primary-content peer-checked:text-secondary-content"
							>
								<ul>
									{#each inspection.violations as violation, i}
										<li class="flex flex-col gap-2">
											<span class="font-semibold">{violation.record_id}</span>
											<span>
												{violation.description}
												<span class="text-error">
													(+{violation.points})
												</span>
											</span>
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
	</div>
</div>
