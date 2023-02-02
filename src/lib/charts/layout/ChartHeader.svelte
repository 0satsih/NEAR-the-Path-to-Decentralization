<script lang='ts'>
    import Query from "$lib/buttons/Query.svelte";

    export let query_link: string;
    export let title: string; 
</script>

<div class="grid grid-cols-9 grid-rows-1 mt-0.5 py-0.5">
    <h2 class="col-start-3 col-span-5 justify-self-center text-xl font-bold quicksand mt-1">
      {title}
    </h2>
    <div class="col-start-9 col-span-1 flex justify-end space-x-2 mr-2 mb-1">
      <Query link={query_link} />
      
    </div>
  </div>