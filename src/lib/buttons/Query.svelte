<script lang="ts">
	export let link: string;
</script>

<button class="border border-stone-300 rounded-md p-1 hover:bg-stone-200 transition">
	<a href={link} target="_blank" rel="noreferrer" class="flex items-center mx-1 space-x-0.5">
		<svg
			class="w-6 h-5 mt-0.5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
			/>
		</svg>
		<span class="quicksand font-bold">Query</span>
	</a>
</button>

