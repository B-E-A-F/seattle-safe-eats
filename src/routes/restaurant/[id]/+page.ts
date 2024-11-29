import type { Business } from '../lookup/[id]/+server';
import type { PageLoad } from './$types';

export const load: PageLoad = async function ({ fetch, params }) {
	// TODO: remove this once google has indexed the new urls
	let id;

	if (params.id.substring(0, 2) === 'PR') {
		id = params.id;
	} else {
		const idParts = params.id.split('-');
		id = 'PR' + idParts[idParts.length - 1];
	}

	const url = `/restaurant/lookup/${id}`;

	const response = await fetch(url);

	const { business } = (await response.json()) as { business: Business };

	return {
		business
	};
};
