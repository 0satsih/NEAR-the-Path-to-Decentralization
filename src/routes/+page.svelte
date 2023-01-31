<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Chart from '$lib/charts/layout/Chart.svelte';
	import ChartLanguage from '$lib/charts/language/ChartLanguage.svelte';
	import TableOfContents from '$lib/layout/TableOfContents.svelte';
	import Introduction from '$lib/layout/Introduction.svelte';
	import Conclusion from '$lib/layout/Conclusion.svelte';
	import LineChart from '$lib/charts/templates/LineChart.svelte';
	import DoughnutChart from '$lib/charts/templates/DoughnutChart.svelte';
	import BarChart from '$lib/charts/templates/BarChart.svelte';

	let view: string = 'Go to Dashboard View';

	function handleClick() {
		if (view == 'Go to Dashboard View') {
			view = 'Go to Report View';
		} else {
			view = 'Go to Dashboard View';
		}
	}

	export let data: PageData;
</script>

{#if view == 'Go to Dashboard View'}
	<body>
		<div class="flex justify-center">
			<div class="2xl:max-w-[85vw]">
				<div class="grid grid-cols-4">
					<header class="col-start-2 col-span-2">
						<Header />
					</header>
				</div>
				<div class="grid grid-cols-4 justify-items-start">
					<div class="col-start-2 col-span-2">
						<Introduction />
					</div>
					<div class="col-start-4 col-span-1 justify-self-start">
						<TableOfContents />
					</div>
				</div>
				<div class="grid grid-cols-4 justify-items-center">
					<div class="col-start-2 col-span-2 mt-5">
						<button
							class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
					 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
					   
					 "
							on:click={handleClick}>{view}</button
						>
					</div>
					<main class="col-start-2 col-span-2">
						<div class="grid grid-cols-1 gap-2 max-w-[956px]">
							<div class="col-span-1 pt-5" id="Price">
								<Chart title={'Price'} query_link={'https://next.flipsidecrypto.xyz/'}>
									<div class="h-96" slot="figure">
										<LineChart chart_data={data.daily_price} />
									</div>
								</Chart>
							</div>
							<ChartLanguage />
							<div class="col-span-1 pt-5" id="Validators1">
								<Chart title={'Validators'} query_link={'https://next.flipsidecrypto.xyz/'}>
									<div class="h-96" slot="figure">
										<DoughnutChart
											chart_data={[
												{ id: 'Validator 1', value: 1000 },
												{ id: 'Validator 2', value: 2000 },
												{ id: 'Validator 3', value: 1000 },
												{ id: 'Validator 4', value: 4000 },
												{ id: 'Validator 5', value: 1000 }
											]}
										/>
									</div>
								</Chart>
							</div>
							<ChartLanguage />
							<div class="col-span-1 pt-5" id="Validators2">
								<Chart title={'Validators'} query_link={'https://next.flipsidecrypto.xyz/'}>
									<div class="h-96" slot="figure">
										<BarChart
											chart_data={[
												{ id: 'Validator 1', value: 1000 },
												{ id: 'Validator 2', value: 2000 },
												{ id: 'Validator 3', value: 1000 },
												{ id: 'Validator 4', value: 4000 },
												{ id: 'Validator 5', value: 1000 }
											]}
										/>
									</div>
								</Chart>
							</div>
							<ChartLanguage />

							<Conclusion />
						</div>
					</main>
				</div>

				<footer>
					<Footer />
				</footer>
			</div>
		</div>
	</body>
{/if}

{#if view == 'Go to Report View'}
	<body>
		<div class="grid grid-cols-4 justify-items-center">
			<div class="col-start-2 col-span-2 mt-5 mb-3">
				<button
					class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
				 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
				   
				 "
					on:click={handleClick}>{view}</button
				>
			</div>
		</div>
		<main class="grid grid-cols-3 gap-2 mx-4">
			<div class="col-span-1">
				<Chart
					title={'Luna Price'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/2e2f5c7d-e03b-4ba0-9502-faad1c37c362'}
				>
					<div class="h-96" slot="figure" />
				</Chart>
			</div>
			<div class="col-span-2">
				<Chart
					title={'Luna Price'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/2e2f5c7d-e03b-4ba0-9502-faad1c37c362'}
				>
					<div class="h-96" slot="figure" />
				</Chart>
			</div>
			<div class="col-span-3">
				<Chart
					title={'Luna Price'}
					query_link={'https://next.flipsidecrypto.xyz/edit/queries/2e2f5c7d-e03b-4ba0-9502-faad1c37c362'}
				>
					<div class="h-96" slot="figure" />
				</Chart>
			</div>
		</main>
	</body>
{/if}
