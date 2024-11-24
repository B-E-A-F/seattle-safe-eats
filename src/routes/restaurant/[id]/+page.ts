import type { Business } from '../lookup/[id]/+server';
import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, params }) {
	const idParts = params.id.split('-');
	const id = 'PR' + idParts[idParts.length - 1];

	const url = `/restaurant/lookup/${id}`;

	const response = await fetch(url);

	const { business } = (await response.json()) as { business: Business };

	return {
		business
	};
};
