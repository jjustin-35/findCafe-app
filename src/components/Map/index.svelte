<script lang="ts">
	import { onMount } from 'svelte';
	import initMap from '../../helpers/initMap';
	import './styles.css';

	onMount(() => {
		initMap();
	});
</script>

<div id="map"></div>
