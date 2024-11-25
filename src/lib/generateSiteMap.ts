import _ from 'underscore';
import fs from 'fs';
import path from 'path';
import { restaurauntNameToUrl } from './utils';

const APPLICATION_SECRET = 'SET_ME';

async function generateSiteMap() {
	const dataUrl =
		'https://data.kingcounty.gov/resource/f29f-zza5.json?$limit=500000&$order=business_id';

	const headers = {
		'Content-Type': 'application/json',
		'X-App-Token': APPLICATION_SECRET
	};

	const options = {
		method: 'GET',
		headers
	};

	const response = await fetch(dataUrl, options);
	const inspectionData = await response.json();
	const uniqueInspections = _.uniq(inspectionData, (inspection) => inspection.program_identifier);

	const xmlContent = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${uniqueInspections
				.map(
					({ business_id, program_identifier, inspection_date }) => `<url>
      <loc>https://www.seattlesafeeats.com/restaurant/${restaurauntNameToUrl(program_identifier, business_id)}</loc>
      <lastmod>${inspection_date ? new Date(inspection_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}</lastmod>
      </url>`
				)
				.join('')}
          <url>
          <loc>https://www.seattlesafeeats.com/</loc>
          <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
          </url>
    </urlset>`.trim();

	const filePath = path.join('.', 'sitemap.xml');
	fs.writeFileSync(filePath, xmlContent, 'utf8');
}

generateSiteMap();
