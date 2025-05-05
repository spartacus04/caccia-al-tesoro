<script>
	import { onMount } from "svelte";
	import { gameStatus, run } from "$lib/mapScript";
	import { positions } from "$lib";

    // // 45.998939, 8.740104
    onMount(() => {
        run()
    })
</script>

<div class="h-full flex flex-col">
    <div id="map" class="h-full"></div>
    <div class="">
        <div class="rounded-2xl bg-surface-50-950 shadow-2xl w-full max-w-3xl mx-auto p-8">
            <h1 class="text-3xl font-bold text-center mb-6 text-yellow-500">{positions[$gameStatus.stage].text}</h1>
            <p class="text-md mb-4">{positions[$gameStatus.stage].subtitle}</p>
        </div>
    </div>

    {#if $gameStatus.requiresTrial}
        <!-- popup -->
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                <h2 class="text-xl font-bold mb-4">Prova di abilità</h2>
                <p class="mb-4">Per proseguire, devi completare una prova di abilità.</p>
            </div>
        </div>
    {/if}
</div>