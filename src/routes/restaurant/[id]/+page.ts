import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, params }) {
	const url = `/restaurant/lookup/${params.id}`;

	const response = await fetch(url);

	const { businesses } = await response.json();

	return {
		businesses
	};
};
