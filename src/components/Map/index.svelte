<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'flowbite-svelte';
	import initMap from '../../helpers/initMap';
	import type { Maps } from '../../helpers/initMap';
	import './styles.css';

	let map: Maps | undefined;
	$: console.log(map);

	onMount(() => {
		(async () => {
			map = await initMap();
		})();
	});
</script>

<section class="w-full h-4/5">
	<div class="w-3/4 absolute top-2 left-1/2 -translate-x-1/2 z-10">
		<Search size="md" />
	</div>
	{#if map}
		<div id="map" class="w-full"></div>
	{/if}
</section>
