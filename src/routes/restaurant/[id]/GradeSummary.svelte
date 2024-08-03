<script lang="ts">
	import GradeFace from './GradeFace.svelte';
	import GradeDescription from '$lib/components/GradeDescription.svelte';
	import GradeDial from '$lib/components/GradeDial.svelte';
	import GradeLabel from '$lib/components/GradeLabel.svelte';

	export let grade: string | undefined;
	let dialog: HTMLDialogElement;
</script>

<button
	class="flex flex-col items-center gap-3 card p-2 card-bordered"
	on:click={() => dialog.showModal()}
>
	<GradeFace {grade} />
	{#if grade}
		<GradeDial {grade} />
	{/if}
</button>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box border rounded-md max-h-80 md:max-h-full">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col mt-2">
			<div class="flex items-center gap-2">
				<GradeFace {grade} />
				<GradeLabel {grade} />
			</div>
			<div class="divider my-2" />
			<GradeDescription {grade} />
		</div>
	</div>
</dialog>
