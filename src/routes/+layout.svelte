<script lang="ts">
	import Appbar from '../components/Appbar/index.svelte';
	import initMap from '../helpers/initMap';
	import './styles.css';

	(async () => {
		if (typeof window !== 'undefined' && !window.map) {
			window.map = await initMap();
		}
	})();
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<Appbar />
</div>
