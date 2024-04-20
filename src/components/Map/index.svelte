<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from 'flowbite-svelte';
	import initMap from '../../helpers/initMap';
	import './styles.css';

	onMount(() => {
		initMap();
	});
</script>

<section class="w-full h-4/5">
	<div class="w-3/4 absolute top-2 left-1/2 -translate-x-1/2 z-10">
		<Search size="md" />
	</div>
	<div id="map" class="w-full"></div>
</section>
