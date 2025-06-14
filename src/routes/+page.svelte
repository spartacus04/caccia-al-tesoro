<script lang="ts">
	import { gameManager } from '$lib/gameManager';
	import { MapManager } from '$lib/mapManager';
	import { onMount } from 'svelte';
	import { settings } from '$lib';
	import loading_anim from '$lib/assets/infinite-spinner.svg';
	import TrialCodePage from '$lib/components/TrialCodePage.svelte';
	import TrialMultiPage from '$lib/components/TrialMultiPage.svelte';
	import RestartPage from '$lib/components/RestartPage.svelte';
	import { fade } from 'svelte/transition';

	const { waypoints } = settings;

	const saveDataStore = gameManager.saveData;
	let mapElement: HTMLElement;
	const mapManager = new MapManager();

	onMount(() => {
		try {
			mapManager.tryInit(mapElement);
		} catch (error) {
			alert(error);
		}
	});
</script>

<div class="flex h-full flex-col bg-blue-950">
	<div
		bind:this={mapElement}
		id="map"
		class="z-10 flex h-full flex-col items-center justify-center"
	>
		<img src={loading_anim} alt="Loading" class="h-16 w-16" />
		<h2>Caricamento...</h2>
	</div>
	<div class="flex items-center justify-center">
		<div class="mx-auto w-full max-w-3xl bg-blue-950 p-8 flex items-center justify-center">
			<h1 class="mb-6 text-justify w-fit text-xl font-bold text-yellow-500">
				{@html waypoints[$saveDataStore.stage].text}
			</h1>
			<p class="text-md mb-4">{waypoints[$saveDataStore.stage].subtitle}</p>
		</div>
	</div>
</div>

{#if $saveDataStore.inTrial}
	<div transition:fade>
		{#if waypoints[$saveDataStore.stage].trial.type === 'multiple-choice'}
			<TrialMultiPage trial={waypoints[$saveDataStore.stage].trial} />
		{:else if waypoints[$saveDataStore.stage].trial.type === 'code'}
			<TrialCodePage trial={waypoints[$saveDataStore.stage].trial} />
		{:else}
			<RestartPage />
		{/if}
	</div>
{/if}
