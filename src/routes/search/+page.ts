import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, url }) {
	const res = await fetch(`/search/${url.searchParams.get('q') ?? ''}`);
	const { businesses } = await res.json();

	return {
		businesses
	};
};
