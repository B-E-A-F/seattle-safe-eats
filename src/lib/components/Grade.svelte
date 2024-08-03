<script lang="ts">
	import excellent from '$lib/assets/excellent.png';
	import good from '$lib/assets/good.png';
	import okay from '$lib/assets/okay.png';
	import needstoimprove from '$lib/assets/needstoimprove.png';
	import GradeDial from './GradeDial.svelte';

	export let grade: string | undefined;
	export let withLabel: boolean = false;
	export let withDescription: boolean = false;
	export let withDial: boolean = false;
</script>

{#if grade === '1'}
	<div class="flex font-bold justify-between">
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-[50px]"
				alt="Smiley face representing excellent rating"
				src={excellent}
			/>
			{#if withLabel}
				<span>Excellent</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
	</div>
	{#if withDescription}
		The restaurant has had no or minor unsafe food handling practices over the last four
		inspections.
	{/if}
{:else if grade === '2'}
	<div class="flex font-bold justify-between">
		<div class="flex gap-2 items-center">
			<img class="rounded-full w-[50px]" alt="Smiley face representing good rating" src={good} />
			{#if withLabel}
				<span>Good</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
	</div>
	{#if withDescription}
		The restaurant has had a few unsafe food handling practices over the last four inspections.
	{/if}
{:else if grade === '3'}
	<div class="flex font-bold justify-between">
		<div class="flex gap-2 items-center">
			<img class="rounded-full w-[50px]" alt="Smiley face representing okay rating" src={okay} />
			{#if withLabel}
				<span>Okay</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
	</div>
	{#if withDescription}
		The restaurant has had several unsafe food handling practices over the last four inspections.
	{/if}
{:else if grade === '4'}
	<div class="flex font-bold justify-between">
		<div class="flex gap-2 items-center">
			<img
				class="rounded-full w-[50px]"
				alt="Smiley face representing needs to improve rating"
				src={needstoimprove}
			/>
			{#if withLabel}
				<span>Needs To Improve</span>
			{/if}
		</div>
		{#if withDial}
			<div class="w-32 mr-10">
				<GradeDial {grade} />
			</div>
		{/if}
	</div>
	{#if withDescription}
		This restaurant was either closed by Public Health - Seattle & King County within the last year
		or needed multiple return inspections to correct unsafe food handling practices.
	{/if}
{:else}
	<div class="flex items-center gap-2 font-bold">
		<div
			class="bg-neutral text-neutral-content w-[50px] h-[50px] rounded-full text-xl font-semibold flex items-center justify-center"
		>
			N/A
		</div>
		{#if withLabel}
			<span>No Grade Available</span>
		{/if}
	</div>
{/if}
