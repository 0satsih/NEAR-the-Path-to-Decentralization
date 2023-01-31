import { Flipside } from '@flipsidecrypto/sdk/dist/src';
import type { QueryResultSet, Query } from '@flipsidecrypto/sdk/dist/src';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const flipside = new Flipside(
		'9e33bfc5-36f6-4d6e-9469-d505ff459d91',
		'https://node-api.flipsidecrypto.com'
	);

	const daily_price: Query = {
		sql: `
        SELECT
  date_trunc('day', recorded_hour) as date,
  avg(close) as price_usd
FROM
  crosschain.core.fact_hourly_prices
WHERE
  id = 'terra-luna-2'
GROUP BY
  1
HAVING
  date BETWEEN '2023-01-07' AND '2023-01-21'
ORDER BY
  1
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};

	// Construct an array of flipside Query objects.
	const queries = [daily_price];

	// Map over array of queries, process & return an array of results.
	const results = queries.map(async function (query) {
		const result: QueryResultSet = await flipside.query.run(query);
		return JSON.parse(JSON.stringify(result?.records));
	});

	// Construct object of results of different queries.
	const data = {
		daily_price: results[0]
	};

	if (!results) {
		throw error(404, 'Not found');
	} else {
		return data;
	}
}) satisfies PageServerLoad;
