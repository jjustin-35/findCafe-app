<script lang="ts">
	import Appbar, { Section } from '@smui-extra/bottom-app-bar';
	import IconButton from '@smui/icon-button';
	import data from './data';

	const { menu } = data;
</script>

<Appbar variant="fixed">
	<Section>
		{#each menu as item}
			<IconButton {...item} class="material-icons">{item.iconType}</IconButton>
		{/each}
	</Section>
</Appbar>
