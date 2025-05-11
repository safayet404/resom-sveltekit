<script>
	import Icon from "@iconify/svelte";
</script>

<div class=" mx-auto p-4 bg-gray-200">
	<div class="mt-20">
		<div class="text-center w-[30%] p-4 gap-3 flex bg-white rounded-lg">
			<span
				class="my-auto border border-red-500 px-2 bg-red-600 py-2 rounded-full text-white font-extrabold"
			>
				<Icon icon="icomoon-free:cross" />
			</span>
			<h1 class="my-auto font-semibold">
				The Provided credentials are incorrect
			</h1>
		</div>
	</div>
	<button
		class="bg-purple-600 mx-auto text-center flex justify-center text-white px-4 w-[30%] mt-20 rounded-md py-2 text-4xl font-semibold"
	>
		<Icon icon="codex:loader" />
	</button>
</div>
