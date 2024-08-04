<script lang="ts">
	import SpaceNeedle from '$lib/components/icons/SpaceNeedle.svelte';
	// import MagnifyingGlass from '$lib/components/icons/MagnifyingGlass.svelte';

	import { Search } from 'lucide-svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	export let className: string | undefined = undefined;
	let search = '';

	function navigateSearch() {
		if (search.length < 3) return;
		window.location.href = `/search?q=${encodeURI(search.replace(/[^a-zA-Z0-9 ]/g, ''))}`;
	}
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-neutral-content/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center w-full">
		<div class="hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<SpaceNeedle fill="currentColor" width="36" height="36" />
				<span class="inline-block md:text-2xl"> Seattle Safe Eats </span>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-between md:justify-end space-x-2">
			<form class={className} on:submit|preventDefault={navigateSearch} action=".">
				<label class="input input-bordered input-ghost flex items-center gap-2">
					<input
						type="search"
						class="grow"
						placeholder="Search for a restaurant"
						bind:value={search}
					/>
					{#if search.length === 0}
						<Search width="24" height="24" />
					{/if}
				</label>
			</form>
			<ThemeToggle />
		</div>
	</div>
</header>

<style>
	input::placeholder {
		/* font-weight: bold; */
		opacity: 0.9;
		/* color: red; */
	}
</style>
