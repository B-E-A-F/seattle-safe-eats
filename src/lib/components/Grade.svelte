<script lang="ts">
	import excellent from '$lib/assets/excellent.gif';
	import good from '$lib/assets/good.gif';
	import okay from '$lib/assets/okay.gif';

	export let grade: string | undefined;
</script>

{#if grade === '1'}
	<img class="rounded-full" alt="Smiley face representing excellent rating" src={excellent} />
{:else if grade === '2'}
	<img class="rounded-full" alt="Smiley face representing good rating" src={good} />
{:else if grade === '3'}
	<img class="rounded-full" alt="Smiley face representing okay rating" src={okay} />
{:else}
	<div
		class="bg-neutral w-[50px] h-[50px] rounded-full flex items-center justify-center text-xl font-semibold"
	>
		N/A
	</div>
{/if}
