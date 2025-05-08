<script lang="ts">
	import { gameManager } from "$lib/gameManager";
	import { MapManager } from "$lib/mapManager";
	import { onMount } from "svelte";
    import { settings } from "$lib";
    import loading_anim from '$lib/assets/infinite-spinner.svg';
	import TrialCodePage from "$lib/components/TrialCodePage.svelte";
	import TrialMultiPage from "$lib/components/TrialMultiPage.svelte";
	import RestartPage from "$lib/components/RestartPage.svelte";
	import { fade } from "svelte/transition";

    const { waypoints } = settings;

    const saveDataStore = gameManager.saveData;
    let mapElement: HTMLElement;
    const mapManager = new MapManager();

    onMount(() => {
        try {
            mapManager.tryInit(mapElement)
        } catch (error) {
            alert(error);
        }
    })
</script>

<div class="h-full flex flex-col bg-blue-950">
    <div bind:this={mapElement} id="map" class="h-full flex-col flex items-center justify-center z-10">
        <img src={loading_anim} alt="Loading" class="w-16 h-16" />
        <h2>Caricamento...</h2>
    </div>
    <div class="">
        <div class="bg-blue-950 w-full max-w-3xl mx-auto p-8">
            <h1 class="text-3xl font-bold text-center mb-6 text-yellow-500">{waypoints[$saveDataStore.stage].text}</h1>
            <p class="text-md mb-4">{waypoints[$saveDataStore.stage].subtitle}</p>
        </div>
        <button on:click={gameManager.reset}>
            reset
        </button>
    </div>
</div>

{#if $saveDataStore.inTrial}
    <div transition:fade>
        {#if waypoints[$saveDataStore.stage].trial.type === "multiple-choice"}
            <TrialMultiPage trial={waypoints[$saveDataStore.stage].trial} />
        {:else if waypoints[$saveDataStore.stage].trial.type === "code"}
            <TrialCodePage trial={waypoints[$saveDataStore.stage].trial} />
        {:else}
            <RestartPage />
        {/if}
    </div>
{/if}