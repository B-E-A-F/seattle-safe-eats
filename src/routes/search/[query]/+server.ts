import { json } from '@sveltejs/kit';
import _ from 'underscore';
import { env } from '$env/dynamic/private';
import type { FoodEstablishmentInspections } from '$lib/types/FoodEstablishmentInspection.js';

export type Business = {
	business_id: string;
	address: string;
	city: string;
	grade: string;
	name: string;
	phone: string;
	program_identifier: string;
};

function toTitleCase(str: string) {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

function adaptDataToBusinesses(data: FoodEstablishmentInspections) {
	// There will be more than one business on a search query
	// Group the array by each business so we get {bus_id2: [inspection1, inspection2], bus_id2: [inspection1, inspection2]]}
	const groupedData = _.groupBy(data, 'business_id');

	return Object.values(groupedData).map((group) => {
		if (group.length === 0) return [];
		return {
			business_id: group[0].business_id,
			address: group[0].address,
			city: toTitleCase(group[0].city),
			grade: group[0].grade,
			name: toTitleCase(group[0].program_identifier),
			phone: group[0].phone,
			program_identifier: group[0].program_identifier
		};
	});
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }: { params: { query?: string } }) {
	let dataUrl = `https://data.kingcounty.gov/resource/f29f-zza5.json?$query=SELECT * SEARCH '${decodeURI(params.query ?? '')}'`;
	if (params.query === 'al') {
		dataUrl =
			'https://data.kingcounty.gov/resource/f29f-zza5.json?$query=SELECT DISTINCT business_id, program_identifier, MAX(inspection_date) AS inspection_date GROUP BY business_id, program_identifier';
	}

	if (!env.APPLICATION_SECRET) {
		throw new Error('APPLICATION_SECRET is not defined');
	}

	const headers: HeadersInit = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('X-App-Token', env.APPLICATION_SECRET);

	const options: RequestInit = {
		method: 'GET',
		headers
	};

	const response = await fetch(dataUrl, options);

	const inspectionData = (await response.json()) as FoodEstablishmentInspections;

	if (params.query === 'al') {
		return json(inspectionData);
	}

	return json({
		businesses: adaptDataToBusinesses(inspectionData)
	});
}
