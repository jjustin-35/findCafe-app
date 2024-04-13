<script>
	import Header from './Header.svelte';
	import Appbar from '../components/Appbar/index.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<Appbar />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>
