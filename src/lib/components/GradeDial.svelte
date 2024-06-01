<script lang="ts">
	import Dial from './icons/Dial.svelte';
	import Pointer from './icons/Pointer.svelte';

	export let grade: string;

	function calculateGradeClass(grade: string) {
		switch (grade) {
			case '1':
				return 'rotate-pointer-excellent';
			case '2':
				return 'rotate-pointer-good';
			case '3':
				return 'rotate-pointer-okay';
			case '4':
				return 'rotate-pointer-ni';
		}
	}
</script>

<div class="relative w-fit">
	<Dial />
	<div class={`w-full h-3/4 absolute bottom-0 ${calculateGradeClass(grade)}`}>
		<Pointer />
	</div>
</div>

<style>
	.rotate-pointer-excellent {
		transform-origin: center bottom;
		animation: rotate-excellent 0.25s linear forwards;
	}

	@keyframes rotate-excellent {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(40deg);
		}
	}

	.rotate-pointer-good {
		transform-origin: center bottom;
		animation: rotate-good 0.25s linear forwards;
	}

	@keyframes rotate-good {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-35deg);
		}
	}

	.rotate-pointer-okay {
		transform-origin: center bottom;
		animation: rotate-okay 0.25s linear forwards;
	}

	@keyframes rotate-okay {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-73deg);
		}
	}

	.rotate-pointer-ni {
		transform-origin: center bottom;
		animation: rotate-ni 0.25s linear forwards;
	}

	@keyframes rotate-ni {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-87deg);
		}
	}
</style>
