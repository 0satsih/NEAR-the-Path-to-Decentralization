import { Flipside } from '@flipsidecrypto/sdk/dist/src';
import type { QueryResultSet, Query } from '@flipsidecrypto/sdk/dist/src';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const flipside = new Flipside(
		'9e33bfc5-36f6-4d6e-9469-d505ff459d91',
		'https://node-api.flipsidecrypto.com'
	);

	const summary: Query = {
		sql: `
		with
  stakers_first as (
    SELECT distinct
      tx_signer as staker,
      min(block_timestamp) as first_stake
    FROM
      near.core.dim_staking_actions
    GROUP BY
      1
  )
SELECT
  date,
  validator,
  staked,
  unstaked,
  (staked - unstaked) as net_staked,
  stakes,
  unstakes,
  stakers,
  new_stakers,
  sum(staked) over (
    partition by
      validator
    order by
      date
  ) as cumu_staked,
  sum(unstaked) over (
    partition by
      validator
    order by
      date
  ) as cumu_unstaked,
  sum(staked - unstaked) over (
    partition by
      validator
    order by
      date
  ) as cumu_netstaked,
  sum(stakes) over (
    partition by
      validator
    order by
      date
  ) as cumu_stakes,
  sum(unstakes) over (
    partition by
      validator
    order by
      date
  ) as cumu_unstakes,
  sum(new_stakers) over (
    partition by
      validator
    order by
      date
  ) as cumu_new_stakers
FROM
  (
    SELECT
      date_trunc('day', block_timestamp) as date,
      pool_address as validator,
      round(sum(CASE WHEN action = 'Stake' THEN stake_amount ELSE 0 END) / pow(10, 24), 0) as staked,
      round(sum(CASE WHEN action = 'Unstake' THEN stake_amount ELSE 0 END) / pow(10, 24), 0) as unstaked,
      count(CASE WHEN action = 'Stake' THEN 1 END) as stakes,
      count(CASE WHEN action = 'Unstake' THEN 1 END) as unstakes,
      count(distinct tx_signer) as stakers,
      count(
        CASE
          WHEN block_timestamp IN (
            SELECT
              first_stake
            FROM
              stakers_first
          ) THEN 1
        END
      ) as new_stakers
    FROM
      near.core.dim_staking_actions
    GROUP BY
      1,
      2   
  )
ORDER BY
  1
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};

	const daily_cumu: Query = {
		sql: `
		with
  stakers_first as (
    SELECT distinct
      tx_signer as staker,
      min(block_timestamp) as first_stake
    FROM
      near.core.dim_staking_actions
    GROUP BY
      1
  )
SELECT
  date,
  staked,
  unstaked,
  (staked - unstaked) as net_staked,
  stakes,
  unstakes,
  stakers,
  unstakers,
  new_stakers,
  sum(staked) over (
    order by
      date
  ) as cumu_staked,
  sum(unstaked) over (
    order by
      date
  ) as cumu_unstaked,
  sum(staked - unstaked) over (
    order by
      date
  ) as cumu_netstaked,
  sum(stakes) over (
    order by
      date
  ) as cumu_stakes,
  sum(unstakes) over (
    order by
      date
  ) as cumu_unstakes,
  sum(new_stakers) over (
    order by
      date
  ) as cumu_new_stakers
FROM
  (
    SELECT
      date_trunc('day', block_timestamp) as date,
      round(
        sum(
          CASE
            WHEN action = 'Stake' THEN stake_amount
            ELSE 0
          END
        ) / pow(10, 24),
        0
      ) as staked,
      round(
        sum(
          CASE
            WHEN action = 'Unstake' THEN stake_amount
            ELSE 0
          END
        ) / pow(10, 24),
        0
      ) as unstaked,
      count(
        CASE
          WHEN action = 'Stake' THEN 1
        END
      ) as stakes,
      count(
        CASE
          WHEN action = 'Unstake' THEN 1
        END
      ) as unstakes,
      count(
        distinct CASE
          WHEN action = 'Stake' THEN tx_signer
        END
      ) as stakers,
      count(
        distinct CASE
          WHEN action = 'Unstake' THEN tx_signer
        END
      ) as unstakers,
      count(
        CASE
          WHEN block_timestamp IN (
            SELECT
              first_stake
            FROM
              stakers_first
          ) THEN 1
        END
      ) as new_stakers
    FROM
      near.core.dim_staking_actions
    GROUP BY
      1
  )
ORDER BY
  1
        `,
		ttlMinutes: 60 * 6,
		timeoutMinutes: 60 * 6,
		cached: true
	};

	// Construct an array of flipside Query objects.
	const queries = [daily_cumu];

	// Map over array of queries, process & return an array of results.
	const results = queries.map(async function (query) {
		const result: QueryResultSet = await flipside.query.run(query);
		return JSON.parse(JSON.stringify(result?.records));
	});

	// Construct object of results of different queries.
	const data = {
		summary: results[0],
		daily_cumu: results[1]
	};

	if (!results) {
		throw error(404, 'Not found');
	} else {
		return data;
	}
}) satisfies PageServerLoad;
