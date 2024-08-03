<script>
	export let width = '100%';
	export let height = '100%';
	export let fill = 'white';
	export let stroke = 'none';
	export let className = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" class={className} {width} {height}>
	<defs>
		<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
			<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
			<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0" />
		</radialGradient>
	</defs>
	<!-- <rect {width} height="100%" fill="black" /> -->
	<g {fill} {stroke} stroke-width="1">
		<!-- Generate some stars -->
		{#each Array(100)
			.fill()
			.map( () => ({ cx: Math.random() * 800, cy: Math.random() * 800, r: Math.random() * 1.5 + 0.5 }) ) as star}
			<circle cx={star.cx} cy={star.cy} r={star.r} />
		{/each}
	</g>
</svg>
