<script lang="ts">
	import { goto } from "$app/navigation";
	import type { CodeTrial } from "$lib";
	import { gameManager } from "$lib/gameManager";

    gameManager.complete();

    const restart = () => {
        gameManager.reset();
        goto("/caccia-al-tesoro/start");
    }
</script>

<div class="p-2 fixed top-0 h-full w-full z-100 bg-blue-950 text-center flex flex-col items-center justify-center">
    <h1 class="text-3xl text-yellow-500">Hai concluso la caccia al tesoro!</h1>
    <p>Grazie per aver giocato</p>



    <button class="mt-2 p-2 bg-green-700 rounded-2xl" on:click={restart}>Ricomincia</button>
</div>