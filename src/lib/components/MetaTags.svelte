<script lang="ts">
	export let title: string = '';
	export let description: string = '';
	export let url: string = '';
	export let image: string = '';
	export let ogTitle: string = title;
	export let ogDescription: string = description;
</script>

<svelte:head>
	<!-- General Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={image} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:domain" content={new URL(url).hostname} />
	<meta property="twitter:title" content={ogTitle} />
	<meta property="twitter:description" content={ogDescription} />
	<meta property="twitter:image" content={image} />
</svelte:head>
