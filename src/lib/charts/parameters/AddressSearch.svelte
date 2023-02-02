<script lang="ts">
	import { Search, Button } from 'flowbite-svelte';

    import { createEventDispatcher } from 'svelte';

	let address = '';

	const dispatch = createEventDispatcher();

	function handleAddress(event: any) {
			dispatch('search', {
			address: event.detail.address
		});
	}

	function resetSearch () {
        dispatch('reset', {
			address: ''
		});
    }

</script>

<Search on:keydown={resetSearch} bind:address size="md" placeholder="Enter Address"	>
	<Button on:click={handleAddress} class="my-2">Search Validator</Button>
</Search>
