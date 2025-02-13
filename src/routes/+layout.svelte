<script>
	import '../app.css';
	import TailwindIndicator from '$lib/components/TailwindIndicator.svelte';
	import { dev } from '$app/environment';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics();
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
