<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';

	export let chart_data: any;
	export let date_start: any;
	export let date_end: any;
	export let address: any;

	let canvas: any;

	const data = {
		datasets: [
			{
				label: 'Daily Staked',
				data: function () {
					if (address == '') {
						return chart_data;
					} else {
						chart_data.map(function (e: any) {
							if (e.validator.includes(address)) {
								return e;
							}
						});
					}
				},
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'staked'
				},
				yAxisID: 'y',
				backgroundColor: ['#264653']
			},
			{
				label: 'Daily UnStaked',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'unstaked'
				},
				yAxisID: 'y',
				backgroundColor: ['#E76F51']
			},
			{
				type: 'line',
				label: 'Cumulative Staked',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'cumu_staked'
				},
				yAxisID: 'y1',
				borderColor: ['#264653']
			},
			{
				type: 'line',
				label: 'Cumulative UnStaked',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'cumu_unstaked'
				},
				yAxisID: 'y1',
				borderColor: ['#E76F51']
			},
			{
				type: 'line',
				label: 'Cumulative Net Staked',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'cumu_netstaked'
				},
				yAxisID: 'y1',
				borderColor: ['#2A9D8F']
			}
		]
	};
	onMount(() => {
		const ctx = canvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				maintainAspectRatio: false,
				responsive: true,
				scales: {
					x: {
						type: 'time',
						time: {
							unit: 'day'
						},
						min: date_start,
						max: date_end,
						reverse: false,
						border: {
							display: true,
							color: 'black',
							width: 1
						},
						grid: {
							display: false
						},
						stacked: true
					},
					y: {
						title: {
							display: true,
							text: 'Amount (NEAR)',
							font: {
								size: 15,
								family: "'Quicksand', 'sans-serif"
							},
							color: 'black',
							padding: 10
						},
						border: {
							display: true,
							color: 'black',
							width: 1
						},
						stacked: true
					},
					y1: {
						display: true,
						position: 'right',
						title: {
							display: true,
							font: {
								size: 15,
								family: "'Quicksand', 'sans-serif"
							},
							color: 'black'
						},
						border: {
							display: true,
							color: 'black',
							width: 1
						},
						grid: {
							drawOnChartArea: false // only want the grid lines for one axis to show up
						}
					}
				},
				elements: {
					point: {
						pointStyle: false
					},
					line: {
						fill: false
					}
				},

				plugins: {
					legend: {
						display: false,
						position: 'right',
						align: 'start',
						labels: {
							usePointStyle: true,
							pointStyle: 'circle'
						}
					},
					tooltip: {
						callbacks: {
							title: function (context) {
								if (context[0].label.length == 26) {
									return context[0].label.substring(0, 11);
								} else {
									return context[0].label.substring(0, 12);
								}
							}
						},
						boxPadding: 3,
						titleAlign: 'center',
						titleMarginBottom: 6
					}
				},
				interaction: {
					intersect: false,
					mode: 'nearest',
					axis: 'x'
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} class="pr-8" />
