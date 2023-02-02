<script lang="ts">
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleDates(event: any) {
		const [selectedDates, dateStr] = event.detail;
		if (dateStr.length > 10) {
			dispatch('close', {
			date_start: dateStr.substring(0, 10),
			date_end: dateStr.substring(14, 24)
		});
		}
	}

    function resetDates () {
        dispatch('reset', {
			date_start: '',
			date_end: ''
		});
    }
</script>

<Flatpickr
	class="form-control flatpickr-input w-[512px]"
	placeholder="Date Range"
	options={{
		altInput: true,
		altFormat: 'F j, Y',
		dateFormat: 'Y-m-d',
		mode: 'range',
		//minDate: 
	}}
	on:change={handleDates}
/>
<button type="submit" on:click={resetDates} class="bg-white p-2 rounded-md">Reset</button>
