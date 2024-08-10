<script lang="ts">
	import { onMount } from 'svelte';

	export let width = '100%';
	export let height = '100%';
	export let svgGProps = '';

	// Controls for star size
	const minScale = 0.5; // Minimum scale for stars
	const maxScale = 1.5; // Maximum scale for stars

	// Controls for vertical range of star spawning (0 to 1)
	export let minHeight = 0; // Minimum height fraction
	export let maxHeight = 0.4; // Maximum height fraction (default to top third)

	// Controls for star count
	const starCount = 50; // Number of stars to generate

	// Variables for screen dimensions
	let screenWidth = 800;
	let screenHeight = 800;

	// Update screen dimensions on mount and on resize
	onMount(() => {
		const updateDimensions = () => {
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${screenWidth} ${screenHeight}`}
	{width}
	{height}
>
	<defs>
		<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
			<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
			<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0" />
		</radialGradient>
		<symbol id="star" viewBox="0 0 24 24">
			<path
				d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</symbol>
	</defs>
	<g class={svgGProps} stroke="none">
		<!-- Generate stars -->
		{#each Array.from( { length: starCount }, () => ({ x: Math.random() * screenWidth, y: Math.random() * screenHeight * (maxHeight - minHeight) + screenHeight * minHeight, scale: Math.random() * (maxScale - minScale) + minScale }) ) as star}
			<use href="#star" x={star.x} y={star.y} width={24 * star.scale} height={24 * star.scale} />
		{/each}
	</g>
</svg>
