<script lang="ts">
	import defaultAttributes from './defaultAttributes';

	export let name: string | undefined = undefined;
	export let color = 'currentColor';
	export let size: number | string = 24;
	export let strokeWidth: number | string = 2;
	export let absoluteStrokeWidth: boolean = false;

	const mergeClasses = <ClassType = string | undefined | null,>(...classes: ClassType[]) =>
		classes
			.filter((className, index, array) => {
				return Boolean(className) && array.indexOf(className) === index;
			})
			.join(' ');
</script>

<svg
	{...defaultAttributes}
	{...$$restProps}
	width={size}
	height={size}
	stroke={color}
	stroke-width={absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth}
	class={mergeClasses('lucide-icon', 'lucide', name ? `lucide-${name}` : '', $$props.class)}
>
	<path
		d="M247 32v87h18V32zm-40.4 105l14.5 29-68 17h205.8l-68-17 14.5-29zm-73 64l-7 14h258.8l-7-14zm-55.88 32l21 14H413.3l21-14H77.72zm63.58 32l8.8 22h211.8l8.8-22zM124 305v18h50.3l36.6 171h18.4l-36.6-171H240v171h32V323h47.3l-36.6 171h18.4l36.6-171H388v-18H124z"
	/>
</svg>
