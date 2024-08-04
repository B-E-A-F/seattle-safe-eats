<script lang="ts">
	import SearchHeader from '$lib/components/SearchHeader.svelte';
</script>

<div class="flex flex-col justify-center w-full h-full">
	<SearchHeader />
	<slot />
</div>
