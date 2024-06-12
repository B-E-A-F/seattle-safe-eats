<script lang="ts">
	export let grade: string | undefined;
</script>

{#if grade === '1'}
	<span class="font-bold text-lg text-center">Excellent</span>
{:else if grade === '2'}
	<span class="font-bold text-lg text-center">Good</span>
{:else if grade === '3'}
	<span class="font-bold text-lg text-center">Okay</span>
{:else if grade === '4'}
	<span class="font-bold text-lg text-center">Needs To Improve</span>
{:else}
	<span class="font-bold text-lg text-center">No Grade Available</span>
{/if}
