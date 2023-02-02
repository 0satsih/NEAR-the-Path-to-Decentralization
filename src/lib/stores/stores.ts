import { writable } from 'svelte/store';

function createDateRange() {
    const {subscribe, set, update } = writable(0);

    return {
        subscribe

    }
}