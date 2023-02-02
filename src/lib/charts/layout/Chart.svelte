<script lang="ts">
	import ChartHeader from './ChartHeader.svelte';

	export let title: string;
	export let query_link: string;
</script>

<div class="border-2 border-black rounded-lg p-2 bg-white">
	<ChartHeader {title} {query_link} />
	<div class="relative flex-auto">
		<slot name="figure"><span>Figure</span></slot>
	</div>
</div>
