<script lang="ts">
	import Grade from '$lib/components/Grade.svelte';

	export let grade: string | undefined;

	function calculateGradeClass(grade: string | undefined) {
		switch (grade) {
			case '1':
				return 'bg-[#008C45]';
			case '2':
				return 'bg-[#7FC241]';
			case '3':
				return 'bg-[#BFD62D]';
			case '4':
				return 'bg-[#636363]';
			default:
				return 'bg-neutral';
		}
	}
</script>

<div
	class={`flex h-32 min-w-24  rounded-md items-center justify-center ${calculateGradeClass(grade)}`}
>
	<Grade {grade} />
</div>
