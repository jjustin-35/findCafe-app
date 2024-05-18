<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'flowbite-svelte';
	import useMap from '../../helpers/useMap';
	import type { Maps } from '../../helpers/useMap';
	import './styles.css';

	let maps: Maps;
	let places: Awaited<ReturnType<Maps['searchNearby']>> = null;
	let searchedPlaces: Awaited<ReturnType<Maps['searchByKeyword']>> = null;

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
		if (!keyword) return;
		maps.clearMarker([...maps.currentMarker, ...places.markers]);
		searchedPlaces = await maps?.searchByKeyword(keyword);

		if (!searchedPlaces.result?.length) {
			alert('No places found');
			return;
		}

		// set new center
		maps.map.setCenter(searchedPlaces.result[0].geometry.location);
	};
</script>

<section class="w-full h-4/5">
	<form class="w-3/4 absolute top-2 left-1/2 -translate-x-1/2 z-10" on:submit={handleSearch}>
		<Search size="md" name="keyword" />
	</form>
	<div id="map" class="w-full"></div>
</section>
