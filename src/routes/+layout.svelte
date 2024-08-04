<script>
	import '../app.css';
	import TailwindIndicator from '$lib/components/TailwindIndicator.svelte';
	import { dev } from '$app/environment';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<div class="flex flex-grow flex-col relative z-10">
	<div class="flex flex-grow w-full">
		<slot />
	</div>
	<SiteFooter />

	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
