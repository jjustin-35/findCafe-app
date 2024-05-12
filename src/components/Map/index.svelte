<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'flowbite-svelte';
	import useMap from '../../helpers/initMap';
	import type { Maps } from '../../helpers/initMap';
	import './styles.css';

	let maps: Maps;
	let places: Awaited<ReturnType<Maps['searchNearby']>> = [];
	let searchedPlaces: Awaited<ReturnType<Maps['searchByKeyword']>> = [];

	onMount(() => {
		(async () => {
			maps = await useMap();
			places = await maps?.searchNearby();
		})();
	});

	const handleSearch = async (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const keyword = formData.get('keyword') as string;
		searchedPlaces = await maps?.searchByKeyword(keyword);

		if (!searchedPlaces.length) {
			alert('No places found');
			return;
		}

		// set new center
		maps.map.setCenter(searchedPlaces[0].geometry.location);
	};
</script>

<section class="w-full h-4/5">
	<form class="w-3/4 absolute top-2 left-1/2 -translate-x-1/2 z-10" on:submit={handleSearch}>
		<Search size="md" name="keyword" />
	</form>
	<div id="map" class="w-full"></div>
</section>
