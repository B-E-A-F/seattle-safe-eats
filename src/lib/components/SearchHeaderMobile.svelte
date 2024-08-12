<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { SpaceNeedle } from '$lib/components/icons';
	import ThemeToggle from './ThemeToggle.svelte';
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search.replace(/[^a-zA-Z0-9 ]/g, ''))}`;
	}
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-neutral-content/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center">
		<a href="/">
			<SpaceNeedle fill="currentColor" width="36" height="36" />
		</a>
		<form class="w-full px-2" on:submit|preventDefault={navigateSearch} action=".">
			<label class="input input-bordered input-ghost flex items-center gap-2">
				<input
					type="search"
					class="grow"
					placeholder="Search for a restaurant"
					bind:value={search}
				/>
				{#if search.length === 0}
					<Search size="24" />
				{/if}
			</label>
		</form>
		<ThemeToggle />
	</div>
</header>

<style>
	input::placeholder {
		opacity: 0.9;
	}
</style>
