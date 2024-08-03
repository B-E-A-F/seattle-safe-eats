<script>
	import { onMount, onDestroy } from 'svelte';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SeattleSkyline from '$lib/components/icons/SeattleSkyline.svelte';
	import { cn } from '$lib/utils';
	// import Stars from '$lib/components/icons/Stars.svelte';

	let fill = 'black';
	let intervalId;

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	function updateTheme() {
		let theme = getCookie('theme');
		let darkThemes = [
			'dark',
			'forest',
			'coffee',
			'luxury',
			'synthwave',
			'halloween',
			'sunset',
			'dracula',
			'midnight',
			'black'
		];
		fill = darkThemes.includes(theme) ? 'white' : 'black';
	}

	onMount(() => {
		updateTheme();
		intervalId = setInterval(updateTheme, 1); // Check theme every ms (not ideal but works in dev)
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="flex flex-grow flex-col relative z-10">
	<div class="flex flex-grow w-full">
		<slot />
	</div>
	<SiteFooter />
	<!-- <div class="stars-container"> -->
	<!-- 	<Stars width="100%" height="auto" fill="black" stroke="none" /> -->
	<!-- </div> -->
	<div class="skyline-container opacity-15 transition-all duration-300 ease-in-out">
		<SeattleSkyline width="100%" height="100%" {fill} stroke="white" />
		<div class={cn(fill == 'white' ? 'bg-white' : 'bg-black', 'w-full h-20')} />
	</div>
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
