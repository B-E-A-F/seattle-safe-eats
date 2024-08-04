<script lang="ts">
	import SearchHeader from '$lib/components/SearchHeader.svelte';
</script>

<div class="flex flex-col justify-center w-full">
	<SearchHeader />
	<slot />
</div>
