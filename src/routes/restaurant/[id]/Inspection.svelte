<script lang="ts">
	import Alert from '$lib/components/icons/Alert.svelte';
	import type { Inspection } from '../lookup/[id]/+server';

	export let inspection: Inspection;

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

	function calculateViolationTypeColorClass(type: string) {
		switch (type) {
			case 'BLUE':
				return 'text-info';
			case 'RED':
				return 'text-error';
		}
	}
</script>

<li class="card bg-base-100 w-full flex flex-col gap-2 p-4 border border-base-content/20 shadow-lg">
	<div class="flex justify-between">
		<span class={calculateInspectionResultClass(inspection.result)}>{inspection.result}</span>
		<span>{new Date(inspection.date).toLocaleDateString()}</span>
	</div>
	<span>{inspection.type}</span>

	{#if inspection.violations.length > 0}
		<div class="collapse collapse-arrow card card-bordered border border-base-content/20">
			<input type="checkbox" class="peer" />
			<div class="collapse-title">Violations</div>
			<ul class="collapse-content">
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
	{/if}
</li>
