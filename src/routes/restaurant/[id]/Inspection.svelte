<script lang="ts">
	import Alert from '$lib/components/icons/Alert.svelte';
	import type { Inspection } from '../lookup/[id]/+server';

	export let inspection: Inspection;

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

<li class="w-[300px] md:w-[400px] flex flex-col gap-2 p-2 border border-primary w-full">
	<div class="flex justify-between">
		<span class={calculateInspectionResultClass(inspection.result)}>{inspection.result}</span>
		<span>{new Date(inspection.date).toLocaleDateString()}</span>
	</div>
	<span>{inspection.type}</span>

	{#if inspection.violations.length > 0}
		<div class="collapse collapse-arrow bg-base-200">
			<input type="checkbox" class="peer" />
			<div class="collapse-title text-primary-content peer-checked:text-secondary-content">
				Violations
			</div>
			<div class="collapse-content text-primary-content peer-checked:text-secondary-content">
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
