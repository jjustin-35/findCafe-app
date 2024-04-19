<script lang="ts">
	import { page } from '$app/stores';
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { HomeSolid, UserCircleSolid, HeartSolid } from 'flowbite-svelte-icons';

	$: activeUrl = $page.url.pathname;
</script>

<BottomNav {activeUrl} position="absolute" classInner="grid-cols-3" activeClass="text-primary-normal">
	<BottomNavItem btnName="Home" href="/">
		<HomeSolid />
	</BottomNavItem>
	<BottomNavItem btnName="Profile" href="/profile">
		<UserCircleSolid />
	</BottomNavItem>
	<BottomNavItem btnName="Favorite" href="/favorite">
		<HeartSolid />
	</BottomNavItem>
</BottomNav>
