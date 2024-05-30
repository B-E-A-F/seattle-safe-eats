<script lang="ts">
	import excellent from '$lib/assets/excellent.gif';
	import good from '$lib/assets/good.gif';
	import okay from '$lib/assets/okay.gif';

	export let grade: string | undefined;
	export let withLabel: boolean = false;
</script>

{#if grade === '1'}
	<div class="flex items-center gap-2 font-bold">
		<img class="rounded-full" alt="Smiley face representing excellent rating" src={excellent} />
		{#if withLabel}
			<span>Excellent</span>
		{/if}
	</div>
{:else if grade === '2'}
	<div class="flex items-center gap-2 font-bold">
		<img class="rounded-full" alt="Smiley face representing good rating" src={good} />
		{#if withLabel}
			<span>Good</span>
		{/if}
	</div>
{:else if grade === '3'}
	<div class="flex items-center gap-2 font-bold">
		<img class="rounded-full" alt="Smiley face representing okay rating" src={okay} />
		{#if withLabel}
			<span>Okay</span>
		{/if}
	</div>
{:else}
	<div
		class="bg-neutral w-[50px] h-[50px] rounded-full flex items-center justify-center text-xl font-semibold"
	>
		N/A
	</div>
{/if}
