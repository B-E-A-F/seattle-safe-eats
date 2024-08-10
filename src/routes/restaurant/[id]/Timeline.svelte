<script lang="ts">
	import CircleCheck from '$lib/components/icons/CircleCheck.svelte';
	import type { Inspection } from '../lookup/[id]/+server';

	export let inspections: Inspection[];

	inspections = structuredClone(inspections)
		.reverse()
		.filter((inspection) => inspection.type === 'Routine Inspection/Field Review')
		.slice(-4);
</script>

<div class="flex justify-center w-full">
	<ul class="timeline">
		{#each inspections as inspection, i}
			<li>
				{#if i !== 0}
					<hr />
				{/if}
				<div class="text-sm md:text-base timeline-start">
					{new Date(inspection.date).toLocaleDateString()}
				</div>
				<div class="timeline-middle">
					<CircleCheck
						fillColorClass={inspection.result === 'Satisfactory' ? 'fill-success' : 'fill-error'}
					/>
				</div>
				<div class="timeline-end timeline-box">
					{inspection.result === 'Satisfactory' ? 'PASS' : 'FAIL'}
				</div>
				{#if i !== inspections.length - 1}
					<hr />
				{/if}
			</li>
		{/each}
	</ul>
</div>
