<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'flowbite-svelte';
	import useMap from '../../helpers/initMap';
	import type { Maps } from '../../helpers/initMap';
	import './styles.css';

	let map: Maps;
	let places: ReturnType<Maps['searchNearby']> = [];
	let searchedPlaces: ReturnType<Maps['searchByKeyword']> = [];

	onMount(() => {
		(async () => {
			map = await useMap();
			places = map?.searchNearby();
		})();
	});

	const handleSearch = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const keyword = formData.get('keyword') as string;
		searchedPlaces = map?.searchByKeyword(keyword);
	}
</script>

<section class="w-full h-4/5">
	<form class="w-3/4 absolute top-2 left-1/2 -translate-x-1/2 z-10" on:submit={handleSearch}>
		<Search size="md" name="keyword" />
	</form>
	<div id="map" class="w-full"></div>
</section>
