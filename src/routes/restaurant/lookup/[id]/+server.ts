import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import _ from 'underscore';

type Inspection = {
	business_name: string;
	closed_business: boolean;
	date: string;
	result: string;
	score: string;
	serial_num: string;
	type: string;
};

type Violation = {
	description: string;
	points: string;
	record_id: string;
	type: string;
	date: string;
};

export type Business = {
	business_id: string;
	address: string;
	city: string;
	grade: string;
	name: string;
	phone: string;
	program_identifier: string;
	inspections: Inspection[];
	violations: Violation[];
};

type InspectionData = {
	address: string;
	business_id: string;
	city: string;
	description: string;
	grade: string;
	inspection_business_name: string;
	inspection_closed_business: boolean;
	inspection_date: string;
	inspection_result: string;
	inspection_score: string;
	inspection_serial_num: string;
	inspection_type: string;
	latitude: string;
	longitude: string;
	name: string;
	phone: string;
	program_identifier: string;
	violation_description: string;
	violation_points: string;
	violation_record_id: string;
	violation_type: string;
	zip_code: string;
};

type Data = InspectionData[];

function adaptDataToBusinesses(data: Data): Business {
	const businessData = data[0]; // Grab the first business from the list
	const inspections = _.uniq(data, false, (item) => item.inspection_date).map((item) => ({
		business_name: item.inspection_business_name,
		closed_business: item.inspection_closed_business,
		date: item.inspection_date,
		result: item.inspection_result,
		score: item.inspection_score,
		serial_num: item.inspection_serial_num,
		type: item.inspection_type
	}));

	const violations: Violation[] = data
		.map((item) => {
			const [record_id = '', description = ''] = (item.violation_description ?? '').split(' - ');
			return {
				description,
				points: item.violation_points,
				record_id,
				type: item.violation_type,
				date: item.inspection_date
			};
		})
		.filter((violation) => parseInt(violation.points) > 0);

	return {
		business_id: businessData.business_id,
		address: businessData.address,
		city: businessData.city,
		grade: businessData.grade,
		name: businessData.name,
		phone: businessData.phone,
		program_identifier: businessData.program_identifier,
		inspections,
		violations
	} as Business;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const url = `https://data.kingcounty.gov/resource/f29f-zza5.json?business_id=${params.id}`;

	const headers: HeadersInit = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('X-App-Token', env.APPLICATION_SECRET);

	const options: RequestInit = {
		method: 'GET',
		headers
	};

	const response = await fetch(url, options);

	const inspectionData = (await response.json()) as Data;

	return json({
		businesses: adaptDataToBusinesses(inspectionData)
	});
}
