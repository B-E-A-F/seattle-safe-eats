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
	last_inspection: string;
	last_violation: string;
};

function adaptDataToBusinesses(data: FoodEstablishmentInspections): Business[] {
	return (
		_.chain(data)
			// Step 1: Group by business ID
			.groupBy('business_id')
			// Step 2: Iterate over each group
			.map((group) => {
				// Step 3: Sort each group by inspection date in descending order
				const sortedGroup = _.sortBy(group, 'inspection_date').reverse();
				// Step 4: Get the latest inspection
				const latestInspection = _.first(sortedGroup);
				// Step 5: Filter out records with violation points greater than 0
				const violations = _.filter(
					sortedGroup,
					(inspection) => parseInt(inspection.violation_points) > 0
				);
				// Step 6: Sort violations by inspection date in descending order
				const sortedViolations = _.sortBy(violations, 'inspection_date').reverse();
				// Step 7: Get the latest violation
				const latestViolation = _.first(sortedViolations);
				// Return the transformed data
				return {
					business_id: latestInspection?.business_id,
					address: latestInspection?.address,
					city: latestInspection?.city,
					grade: latestInspection?.grade,
					name: latestInspection?.program_identifier,
					phone: latestInspection?.phone,
					program_identifier: latestInspection?.program_identifier,
					last_inspection: latestInspection?.inspection_date,
					last_violation: latestViolation ? latestViolation.inspection_date : undefined
				} as Business;
			})
			.value()
	);
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const dataUrl = `https://data.kingcounty.gov/resource/f29f-zza5.json?$query=SELECT * SEARCH '${decodeURI(params.query ?? '')}'`;

	const headers: HeadersInit = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('X-App-Token', env.APPLICATION_SECRET);

	const options: RequestInit = {
		method: 'GET',
		headers
	};

	const response = await fetch(dataUrl, options);

	const inspectionData = (await response.json()) as FoodEstablishmentInspections;

	return json({
		businesses: adaptDataToBusinesses(inspectionData)
	});
}
