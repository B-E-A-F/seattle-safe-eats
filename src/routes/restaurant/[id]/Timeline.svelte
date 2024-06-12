<script lang="ts">
	import CircleCheck from '$lib/components/icons/CircleCheck.svelte';
	import type { Inspection } from '../lookup/[id]/+server';

	export let inspections: Inspection[];

	inspections = structuredClone(inspections)
		.reverse()
		.filter((inspection) => inspection.type === 'Routine Inspection/Field Review')
		.slice(-4);

	const red = 'oklch(0.627955 0.257683 29.2339)';
	const green = 'oklch(0.519752 0.176858 142.495)';
</script>

<ul class="timeline">
	{#each inspections as inspection, i}
		<li>
			{#if i !== 0}
				<hr />
			{/if}
			<div class="timeline-start">{new Date(inspection.date).toLocaleDateString()}</div>
			<div class="timeline-middle">
				<CircleCheck fill={inspection.result === 'Satisfactory' ? green : red} />
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
