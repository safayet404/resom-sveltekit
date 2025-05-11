<!-- src/routes/account/+layout.svelte -->
<script>
	import { page } from "$app/stores";

	const menuItems = [
		{ label: "Profile", icon: "👤", path: "profile" },
		{ label: "My Orders", icon: "📦", path: "orders" },
		{ label: "Security", icon: "🔐", path: "security" },
		{ label: "Payment", icon: "💳", path: "payment" },
		{ label: "Affiliate", icon: "🎯", path: "affiliate" },
		{ label: "Need Help", icon: "❓", path: "help" },
	];

	$: currentPath = $page.url.pathname;
</script>

<section class="container mx-auto p-4">
	<div class="flex mt-20 bg-[#EFEFEF] rounded-lg min-h-screen">
		<!-- Sidebar -->
		<aside class="w-64 border-r p-4 space-y-4">
			{#each menuItems as item}
				<a
					class="block p-2 rounded hover:bg-gray-100 font-medium"
					class:selected={currentPath.endsWith(item.path)}
					href={`/account/${item.path}`}
				>
					{item.icon}
					{item.label}
				</a>
			{/each}
			<hr />
			<a class="text-red-600 font-medium p-2" href="/logout">🔓 Log Out</a
			>
		</aside>

		<!-- Content -->
		<main class="flex-1 p-6">
			<slot />
		</main>
	</div>
</section>

<style>
	a.selected {
		background-color: #f3f4f6;
	}
</style>
