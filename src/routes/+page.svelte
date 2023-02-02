<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import Footer from '$lib/layout/Footer.svelte';
	import Chart from '$lib/charts/layout/Chart.svelte';
	import ValidatorStat from '$lib/charts/ValidatorStat.svelte';
	import DelegatorStat from '$lib/charts/DelegatorStat.svelte';
	import StakedStat from '$lib/charts/StakedStat.svelte';
	import UnstakedStat from '$lib/charts/UnstakedStat.svelte';
	import NetStakedStat from '$lib/charts/NetStakedStat.svelte';
	import DailyStaked from '$lib/charts/DailyStaked.svelte';
	import DailyStakes from '$lib/charts/DailyStakes.svelte';
	import DailyStakers from '$lib/charts/DailyStakers.svelte';
	import DateRange from '$lib/charts/parameters/DateRange.svelte';

	import AddressSearch from '$lib/charts/parameters/AddressSearch.svelte';

	export let data: PageData;

	let date_start: any = '';
	let date_end: any = '';
	let paramToggled: any = false;
	let address: any = 'ffffff';

	function handleDates(event: any) {
		date_start = event.detail.date_start;
		date_end = event.detail.date_end;
		paramToggled = !paramToggled;
	}

	function resetDates(event: any) {
		date_start = event.detail.date_start;
		date_end = event.detail.date_end;
		paramToggled = !paramToggled;
	}

	function handleSearch(event: any) {
		address = event.detail.address;
		paramToggled = !paramToggled;
	}

	function resetSearch(event: any) {
		address = event.detail.address;
		paramToggled = !paramToggled;
	}
</script>

<body>
	<main class="grid grid-cols-5 gap-2 mx-4 my-4">
		<div class="col-span-3 col-start-2 grid grid-cols-6 grid-row-2 gap-2">
			<div class="col-span-2 col-start-2 row-start-2">
				<Chart
					title={'Total Validators'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/e8851436-7102-4461-bb3f-e13d56649738'}
				>
					<div class="h-32" slot="figure">
						{#key paramToggled}
							<ValidatorStat chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
			<div class="col-span-2 col-start-4 row-start-2">
				<Chart
					title={'Total Delegators'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/e8851436-7102-4461-bb3f-e13d56649738'}
				>
					<div class="h-32" slot="figure">
						{#key paramToggled}
							<DelegatorStat chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
			<div class="col-span-2 col-start-1 row-start-1">
				<Chart
					title={'Total Staked'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/e8851436-7102-4461-bb3f-e13d56649738'}
				>
					<div class="h-32" slot="figure">
						{#key paramToggled}
							<StakedStat chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
			<div class="col-span-2 col-start-5 row-start-1">
				<Chart
					title={'Total Unstaked'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/e8851436-7102-4461-bb3f-e13d56649738'}
				>
					<div class="h-32" slot="figure">
						{#key paramToggled}
							<UnstakedStat chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
			<div class="col-span-2 col-start-3 row-start-1">
				<Chart
					title={'Net Staked'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/e8851436-7102-4461-bb3f-e13d56649738'}
				>
					<div class="h-32" slot="figure">
						{#key paramToggled}
							<NetStakedStat chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
		</div>
	</main>
	<div class="grid grid cols-3 gap-2 justify-center mb-4">
		<div class="col-start-1 col-span-1">
			<DateRange on:close={handleDates} on:reset={resetDates} />
		</div>
		<div class="col-start-1 col-span-1">
			<AddressSearch on:search={handleSearch} on:reset={resetSearch}/>
		</div>

	</div>
	<div class="grid grid-cols-3 gap-2 mx-4">
		<div class="col-span-3 col-start-1">
			<Chart
				title={'Daily & Cumulative Staked'}
				query_link={'https://next.flipsidecrypto.xyz/edit/queries/ee5f0b7f-e4a8-4e9d-a727-7a2fb0c9798b'}
			>
				<div class="h-96" slot="figure">
					{#key paramToggled}
						<DailyStaked chart_data={data.daily_cumu} {date_start} {date_end}  />
					{/key}
				</div>
			</Chart>
		</div>
		<div class="col-span-3 grid grid-cols-4 gap-2">
			<div class="col-span-2 col-start-1">
				<Chart
					title={'Daily & Cumulative Stakes'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/ee5f0b7f-e4a8-4e9d-a727-7a2fb0c9798b'}
				>
					<div class="h-64" slot="figure">
						{#key paramToggled}
							<DailyStakes chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
			<div class="col-span-2 col-start-3">
				<Chart
					title={'Daily & Cumulative Stakers'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/ee5f0b7f-e4a8-4e9d-a727-7a2fb0c9798b'}
				>
					<div class="h-64" slot="figure">
						{#key paramToggled}
							<DailyStakers chart_data={data.daily_cumu} {date_start} {date_end} />
						{/key}
					</div>
				</Chart>
			</div>
		</div>
	</div>
</body>
