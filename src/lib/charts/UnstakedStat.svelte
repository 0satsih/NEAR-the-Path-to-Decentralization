<script lang="ts">
	export let chart_data: any;

	export let date_start: any;
	export let date_end: any;

	if (date_start == '' && date_end == '') {
		chart_data = chart_data[chart_data.length - 1].cumu_unstaked;
	} else {
		let end_staked: any;
		let start_staked: any;
		chart_data.map(function (e: any) {
			if (e.date.includes(date_end)) {
				end_staked = e.cumu_unstaked;
			} else if (e.date.includes(date_start)) {
				start_staked = e.cumu_unstaked;
			}
			chart_data = end_staked - start_staked;
		});
	}
</script>

<div class="flex justify-center items-center">
	<p class="mt-7 text-6xl font-medium">{chart_data}</p>
</div>
