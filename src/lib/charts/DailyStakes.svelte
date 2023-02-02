<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let chart_data: any;
	export let date_start: any;
	export let date_end: any;

	let canvas: any;

	const data = {
		datasets: [
			{
				label: 'Daily Stakes',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'stakes'
				},
				yAxisID: 'y',
				backgroundColor: ['#264653']
			},
			{
				label: 'Daily UnStakes',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'unstakes'
				},
				yAxisID: 'y',
				backgroundColor: ['#E76F51']
			},
			{
				type: 'line',
				label: 'Cumulative Stakes',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'cumu_stakes'
				},
				yAxisID: 'y1',
				borderColor: ['#264653']
			},
			{
				type: 'line',
				label: 'Cumulative UnStakes',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'cumu_unstakes'
				},
				yAxisID: 'y1',
				borderColor: ['#E76F51']
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
						position: 'right',
						title: {
							display: true,
							font: {
								size: 15,
								family: "'Quicksand', 'sans-serif"
							},
							color: 'black',
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
								}
								else {
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
