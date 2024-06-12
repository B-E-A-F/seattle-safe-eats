<script lang="ts">
	export let grade: string | undefined;
</script>

{#if grade === '1'}
	<span>
		This restaurant has had no or minor unsafe food handling practices over the last four
		inspections.
	</span>
{:else if grade === '2'}
	<span>
		This restaurant has had a few unsafe food handling practices over the last four inspections.
	</span>
{:else if grade === '3'}
	<span>
		This restaurant has had several unsafe food handling practices over the last four inspections.
	</span>
{:else if grade === '4'}
	<span>
		This restaurant was closed by Public Health - Seattle & King County within the last year.
	</span>
{:else}
	<span> No description available. </span>
{/if}
