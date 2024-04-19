<script lang="ts">
	import Appbar from '../components/Appbar/index.svelte';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<Appbar />
</div>
