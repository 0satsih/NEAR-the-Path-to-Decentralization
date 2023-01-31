<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Tooltip } from 'chart.js';

	export let chart_data: Array<Object>;

	let canvas: any;

	

	const data = {
		labels: chart_data.map((e: any) => e.id),
		datasets: [
			{
				label: 'Amount',
				data: chart_data,
				parsing: {
					key: 'value'
				},
				backgroundColor: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
			}
		]
	};
	onMount(() => {
		const ctx = canvas.getContext('2d');
		var chart = new Chart(ctx, {
			type: 'doughnut',
			data: data,
			plugins: [ChartDataLabels],
			options: {
				maintainAspectRatio: false,
				responsive: true,
				datasets: {
					doughnut: {
						borderJoinStyle: 'round',
						borderRadius: 2,
						hoverBorderColor: 'gray'
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
						boxPadding: 3,
						titleAlign: 'center',
						titleMarginBottom: 6,
						xAlign: 'center',
						yAlign: 'center'
						
					},
					datalabels: {
						formatter: function (value: any, context: any) {
							let total: any = context.dataset.data
								.map((e: any) => e.value)
								.reduce((a: any, b: any) => a + b, 0);

							return (
								context.chart.data.labels[context.dataIndex] +
								'\n' +
								((value.value / total) * 100).toFixed(2) +
								'%'
							);
						},
						display: true,
						textAlign: 'center',
						color: 'black',
						padding: {
							top: 20,
							bottom: 20
						},
						labels: {
							title: {
								font: {
									weight: 'bold',
									family: "'Quicksand', 'sans-serif"
								}
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} class="ml-[92px]" />
