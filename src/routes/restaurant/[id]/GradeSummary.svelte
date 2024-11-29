<script lang="ts">
	import GradeDescription from '$lib/components/GradeDescription.svelte';
	import GradeDial from '$lib/components/GradeDial.svelte';
	import GradeLabel from '$lib/components/GradeLabel.svelte';
	import Grade from '$lib/components/Grade.svelte';
	import { gradeToText } from '$lib/utils';
	import { XIcon } from 'lucide-svelte';

	export let grade: string | undefined;

	let dialog: HTMLDialogElement;
</script>

<!-- The Display on the Restaurant Page -->
<button
	class="flex flex-col items-center gap-3 card w-40 min-w-40 border border-base-content/20 p-2"
	on:click={() => dialog.showModal()}
>
	<Grade {grade} />
	{#if grade}
		<GradeDial {grade} />
		{#if grade === '4'}
			<span class="text-md">{gradeToText(grade)}</span>
		{:else}
			<span class="text-xl">{gradeToText(grade)}</span>
		{/if}
	{/if}
</button>

<!-- The Modal Dialog for when the Button is Clicked -->
<dialog class="modal" bind:this={dialog}>
	<div class="modal-box max-h-80 md:max-h-full">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><XIcon /></button>
		</form>
		<div class="flex flex-col mt-2">
			<div class="flex items-center gap-2">
				<Grade {grade} />
				<GradeLabel {grade} />
			</div>
			<div class="divider my-2" />
			<GradeDescription {grade} />
		</div>
		<div class="flex items-center justify-center pt-4">
			<a
				class="link"
				href="https://kingcounty.gov/en/dept/dph/health-safety/food-safety/inspection-rating-system/rating-system"
				target="_blank">What does this mean?</a
			>
		</div>
	</div>
</dialog>
