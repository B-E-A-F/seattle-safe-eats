<script lang="ts">
	let search = '';

	function navigateSearch() {
		window.location.href = `/search?q=${encodeURI(search)}`;
	}

	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data.businesses);

	function calculateInspectionResultClass(result: string) {
		switch (result) {
			case 'Satisfactory':
				return 'text-success';
			case 'Unsatisfactory':
				return 'text-error';
			case 'Complete':
			default:
				return '';
		}
	}
</script>

<div class="flex flex-col flex-1">
	<div>
		<button class="btn btn-ghost" on:click={() => window.history.back()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
			>
		</button>
	</div>
	<div class="flex flex-col flex-1 p-4">
		<h2 class="text-2xl">{data.businesses.name}</h2>
		<h2 class="text-2xl">{data.businesses.city}</h2>
		<h2 class="text-2xl">{data.businesses.phone}</h2>
		<div class="divider">Inspections</div>
		<ul class="flex flex-col gap-2">
			{#each data.businesses.inspections as inspection}
				<li class="flex flex-col gap-2 p-2 border border-primary">
					<div class="flex justify-between">
						<span class={calculateInspectionResultClass(inspection.result)}
							>{inspection.result}</span
						>
						<span class="text-secondary">{new Date(inspection.date).toLocaleDateString()}</span>
					</div>
					<span>{inspection.type}</span>
				</li>
			{/each}
		</ul>
		<div class="divider">Violations</div>
		<ul class="flex flex-col gap-2">
			{#each data.businesses.violations as violation}
				<li class="flex flex-col gap-2 p-2 border border-primary">
					<div class="flex justify-between">
						<span class="font-semibold">{violation.record_id}</span>
						<span class="text-secondary">{new Date(violation.date).toLocaleDateString()}</span>
					</div>
					<span>{violation.description} <span class="text-error">(+{violation.points})</span></span>
				</li>
			{/each}
		</ul>
	</div>
</div>
