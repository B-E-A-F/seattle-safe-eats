<script>
	import '../app.css';
	import TailwindIndicator from '$lib/components/TailwindIndicator.svelte';
	import { dev } from '$app/environment';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<div class="bg-background relative flex min-h-screen flex-col w-full">
	<div class="flex-1">
		<slot />
	</div>
	<SiteFooter />

	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
