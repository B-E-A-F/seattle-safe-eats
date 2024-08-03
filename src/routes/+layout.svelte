<script>
	import '../app.css';
	import TailwindIndicator from '$lib/components/TailwindIndicator.svelte';
	import { dev } from '$app/environment';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SeattleSkyline from '$lib/components/icons/SeattleSkyline.svelte';
	// import Stars from '$lib/components/icons/Stars.svelte';
</script>

<div class="flex flex-grow flex-col relative z-10">
	<div class="flex flex-grow w-full">
		<slot />
	</div>
	<SiteFooter />
	<!-- <div class="stars-container"> -->
	<!-- 	<Stars width="100%" height="auto" fill="black" stroke="none" /> -->
	<!-- </div> -->
	<div class="skyline-container opacity-25">
		<SeattleSkyline width="100%" height="100%" svgGProps="fill-base-content" />
		<div class="bg-base-content h-20" />
	</div>
	{#if dev}
		<TailwindIndicator />
	{/if}
</div>

<style>
	.skyline-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
		z-index: -1;
	}

	/* .stars-container { */
	/* 	position: fixed; */
	/* 	top: 0; */
	/* 	left: 0; */
	/* 	width: 100%; */
	/* 	z-index: -1; */
	/* } */
</style>
