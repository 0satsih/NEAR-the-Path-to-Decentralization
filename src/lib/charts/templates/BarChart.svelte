<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { transform_date } from '$lib/charts/data/date_transforming';

	export let chart_data: Array < Object >;

	let canvas: any;

	const data = {
		labels: chart_data.map((e: any) => e.id),
		datasets: [
			{
				label: 'Amount',
				data: chart_data,
				parsing: {
					xAxisKey: 'id',
					yAxisKey: 'value'
				},
				backgroundColor: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
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
						reverse: false,
						border: {
							display: true,
							color: 'black',
							width: 1
						},
						grid: {
							display: false
						}
					},
					y: {
						title: {
							display: true,
							text: 'Amount',
							font: {
								size: 15,
								family: "'Quicksand', 'sans-serif",
							},
							color: 'black',
							padding: 10
						},
						border: {
							display: true,
							color: 'black',
							width: 1
						}
					}
				},
				elements : {
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

<canvas bind:this={canvas} class="pr-8"/>
