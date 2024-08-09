<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Theme store
	const theme = writable('cupcake');

	// Load theme from local storage or default to light
	const loadTheme = () => {
		const savedTheme = localStorage.getItem('theme') || 'cupcake';
		theme.set(savedTheme);
	};

	// Save theme to local storage
	const saveTheme = (value: string) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
		theme.set(value);
	};

	// Toggle theme
	const toggleTheme = () => {
		theme.update((current) => {
			const newTheme = current === 'cupcake' ? 'coffee' : 'cupcake';
			saveTheme(newTheme);
			return newTheme;
		});
	};

	let isDarkTheme = false;

	theme.subscribe((value) => {
		isDarkTheme = value === 'coffee';
	});

	onMount(() => {
		loadTheme();
		theme.subscribe((value) => {
			document.documentElement.setAttribute('data-theme', value);
		});
	});
</script>

<label class="swap swap-rotate">
	<input type="checkbox" bind:checked={isDarkTheme} on:change={toggleTheme} />

	<!-- moon icon -->
	<Moon class="swap-on size-9" />

	<!-- sun icon -->
	<Sun class="swap-off size-9" />
</label>
