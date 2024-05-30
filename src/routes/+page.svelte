<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<div class="flex flex-1 justify-center items-center flex-col gap-6">
	<h1 class="text-6xl text-center">Seattle<br />Safe<br />Eats</h1>
	<Search />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
