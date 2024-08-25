/**
 * https://dev.socrata.com/foundry/data.kingcounty.gov/f29f-zza5
 * https://data.kingcounty.gov/Health-Wellness/Food-Establishment-Inspection-Data/f29f-zza5/about_data
 */
type FoodEstablishmentInspection = {
	address: string;
	business_id: string;
	city: string;
	description: string;
	grade: string;
	inspection_business_name?: string;
	inspection_closed_business?: boolean;
	inspection_date?: string;
	inspection_result?: string;
	inspection_score?: string;
	inspection_serial_num?: string;
	inspection_type?: string;
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

export type FoodEstablishmentInspections = FoodEstablishmentInspection[];
