<script lang="ts">
	import Hint from '$lib/components/icons/Hint.svelte';

	let dialog: HTMLDialogElement;
</script>

<button
	class="btn btn-link btn-circle w-5 h-5 text-primary-content"
	on:click={() => dialog.showModal()}
>
	<Hint />
</button>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box border rounded-md max-h-80 md:max-h-full">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h3 class="font-bold text-lg">Category Definitions</h3>
		<div class="flex flex-col gap-2 my-8">
			<div class="flex flex-col gap-2 mb-2">
				<span class="text-lg font-bold">Risk Category I</span>
				<span class="font-semibold">Cold Holding, Limited Food Prep</span>
			</div>
			<span>Examples: coffee stands, hot dog stands</span>
			<span>Cook step exceptions: Commercially processed microwave dinners</span>
			<div class="divider" />
			<div class="flex flex-col gap-2 mb-2">
				<span class="text-lg font-bold">Risk Category II</span>
				<span class="font-semibold">No Cook Step, Food Preparation</span>
			</div>
			<span>Examples: Ice cream shop, grocery store, some bakeries</span>
			<span>Cook step exceptions: Pre-packed raw meat or seafood</span>
			<div class="divider" />
			<div class="flex flex-col gap-2 mb-2">
				<span class="text-lg font-bold">Risk Category III</span>
				<span class="font-semibold">
					Same Day Service or Complex Food Preparation, Meat or Seafood Market, Overnight Cooking,
					Time as a Control, Approved HACCP
				</span>
			</div>
			<span>Examples: Restaurant, meat or seafood markets</span>
		</div>
	</div>
</dialog>
