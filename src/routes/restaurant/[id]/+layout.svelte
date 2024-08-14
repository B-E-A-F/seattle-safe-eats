<script lang="ts">
	import SearchHeaderMobile from '$lib/components/SearchHeaderMobile.svelte';
	import SearchHeader from '$lib/components/SearchHeader.svelte';
</script>

<div>
	<div class="lg:hidden block"><SearchHeaderMobile /></div>
	<div class="lg:block hidden"><SearchHeader /></div>
	<slot />
</div>
