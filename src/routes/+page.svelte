<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<svelte:head>
	<title>Seattle Safe Eats</title>
	<meta
		name="description"
		content="Explore Seattle's restaurant food safety inspections with ease. Get detailed insights into violations, inspection dates, and safety ratings to make informed dining decisions."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={`https://www.seattlesafeeats.com/`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Seattle Safe Eats" />
	<meta
		property="og:description"
		content="Explore Seattle's restaurant food safety inspections with ease"
	/>
	<meta
		property="og:image"
		content={`https://www.seattlesafeeats.com/og-undefined.png?version=${new Date().toLocaleDateString()}`}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.seattlesafeeats.com/" />
	<meta property="twitter:domain" content="seattlesafeeats.com" />
	<meta property="twitter:title" content="Seattle Safe Eats" />
	<meta
		property="twitter:description"
		content="Explore Seattle's restaurant food safety inspections with ease"
	/>
	<meta
		property="twitter:image"
		content={`https://www.seattlesafeeats.com/og-undefined.png?version=${new Date().toLocaleDateString()}`}
	/>
</svelte:head>

<div class="flex flex-1 justify-center items-center flex-col gap-6">
	<div class="absolute blur-2xl bg-zinc-950 rounded-full w-96 h-96 -z-10" />
	<h1 class="text-6xl text-center">Seattle<br />Safe<br />Eats</h1>

	<div class="md:max-w-96 w-full px-8">
		<Search />
	</div>
	<h2 class="text-md text-gray-400 text-center px-8">
		Explore Seattle's restaurant food safety inspections with ease
	</h2>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
