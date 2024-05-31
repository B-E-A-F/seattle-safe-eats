import type { Business } from '../lookup/[id]/+server';
import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, params }) {
	const url = `/restaurant/lookup/${params.id}`;

	const response = await fetch(url);

	const { business } = (await response.json()) as { business: Business };

	return {
		business
	};
};
