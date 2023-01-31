<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { transform_date } from '$lib/charts/data/date_transforming';

	export let chart_data: Array < Object >;

	let canvas: any;

	const data= {
		datasets: [
			{
				label: 'Price (USD)',
				data: chart_data,
				parsing: {
					xAxisKey: 'date',
					yAxisKey: 'price_usd'
				},
				backgroundColor: ['#003F5C'],
				borderColor: ['#003F5C']
			}
		]
	};
	onMount(() => {
		const ctx = canvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'line',
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
						},
						ticks: {
							callback: function (value: any, index) {
								return index % 2 === 0 ? transform_date(this.getLabelForValue(value)) : '';
							}
						}
					},
					y: {
						title: {
							display: true,
							text: 'Price (USD)',
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
						},
						ticks: {
							callback: function (value) {
								return '$' + value;
							}
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
						display: true,
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
								return transform_date(String(context[0].label));
							},
							label: function (context) {
								let label = context.dataset.label || '';

								if (label) {
									label += ': ';
								}
								if (context.parsed.y !== null) {
									label += new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(context.parsed.y);
								}
								return label;
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

<canvas bind:this={canvas} />
