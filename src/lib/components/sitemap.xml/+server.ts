import type { FoodEstablishmentInspections } from '$lib/types/FoodEstablishmentInspection.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const res = await fetch(`/search/al`);
	const inspections = (await res.json()) as FoodEstablishmentInspections;
	console.log(
		inspections.map(
			({ business_id, inspection_date }) =>
				`<url><loc>https://www.seattlesafeeats.com/restaurant/${business_id}</loc><lastmod>${inspection_date ?? new Date().toLocaleDateString()}</lastmod></url>`
		)[0]
	);
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		>
            ${inspections
							.map(
								({ business_id, inspection_date }) => `<url>
            <loc>https://www.seattlesafeeats.com/restaurant/${business_id}</loc>
            <lastmod>${inspection_date ? new Date(inspection_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}</lastmod>
            </url>`
							)
							.join('')}
                    <url>
                    <loc>https://www.seattlesafeeats.com/</loc>
                    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
                    </url>
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
