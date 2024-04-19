<script lang="ts">
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { HomeSolid, UserCircleSolid, HeartSolid } from 'flowbite-svelte-icons';
	import data from './data';

	const { menu } = data;
</script>

<BottomNav position="absolute" classInner="grid-cols-3">
	<BottomNavItem btnName="Home" href='/'>
		<HomeSolid
			class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
		/>
	</BottomNavItem>
	<BottomNavItem btnName="Profile" href="/profile">
		<UserCircleSolid
			class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
		/>
	</BottomNavItem>
	<BottomNavItem btnName="Favorite" href="/favorite">
		<HeartSolid
			class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
		/>
	</BottomNavItem>
</BottomNav>
