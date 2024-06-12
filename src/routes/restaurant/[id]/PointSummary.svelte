<script lang="ts">
	import Alert from '$lib/components/icons/Alert.svelte';
	import Sigma from '$lib/components/icons/Sigma.svelte';
	import type { Inspection } from '../lookup/[id]/+server';

	export let inspections: Inspection[];

	inspections = structuredClone(inspections)
		.reverse()
		.filter((inspection) => inspection.type === 'Routine Inspection/Field Review')
		.slice(-4);

	const redCount = inspections.reduce(
		(acc, inspection) =>
			acc + inspection.violations.filter((violation) => violation.type === 'RED').length,
		0
	);

	const blueCount = inspections.reduce(
		(acc, inspection) =>
			acc + inspection.violations.filter((violation) => violation.type === 'BLUE').length,
		0
	);

	const totalPoints = inspections.reduce(
		(acc, inspection) =>
			acc + inspection.violations.reduce((acc, violation) => acc + Number(violation.points), 0),
		0
	);
</script>

<div class="flex flex-1 md:max-w-[450px]">
	<div class="flex flex-1 gap-2 border-secondary border-r border-t border-b py-2 justify-center">
		<Alert className={'text-red-600'} />
		<span>{redCount}</span>
	</div>
	<div class="flex flex-1 gap-2 border-secondary border-r border-t border-b py-2 justify-center">
		<Alert className={'text-blue-600'} />
		<span>{blueCount}</span>
	</div>
	<div class="flex flex-1 gap-2 border-secondary border-t border-b py-2 justify-center">
		<Sigma />
		<span>{Math.floor(totalPoints / 4)} avg.</span>
	</div>
</div>
