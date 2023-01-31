<script>
	import Twitter from '$lib/socials/Twitter.svelte';
	import Github from '$lib/socials/Github.svelte';
	import Metricsdao from '$lib/socials/Metricsdao.svelte';
	import Flipside from '$lib/socials/Flipside.svelte';
</script>

<div class="h-60 w-full flex justify-center">
	<div class="w-6/12 my-4 border-2 border-gray-300 rounded-xl bg-white">
		<div class="grid grid-cols-4 grid-rows-2 gap-y-1 divide-y">
			<div class="col-start-2 row-start-1 col-span-2">
				<div class="grid grid-cols-1 grid-rows-2 gap-3">
					<div class="row-start-1 flex place-content-center mt-3">
						<span class="font-mono text-lg">
							Developed by
							<a
								href="https://twitter.com/_satsih"
								class="font-semibold hover:text-sky-400 transition"
							>
								satsih
							</a>
						</span>
					</div>
					<div class="row-start-2 flex place-content-center space-x-3">
						<Github github_repo={"https://github.com/jordanSatsih"}/>
					</div>
				</div>
			</div>
			<div class="col-start-2 row-start-2 flex justify-center">
				<Metricsdao />
			</div>
			<div class="col-start-3 row-start-2 flex justify-center">
				<Flipside />
			</div>
		</div>
	</div>
</div>
