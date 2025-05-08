<script lang="ts">
	import type { CodeTrial } from "$lib";
	import { gameManager } from "$lib/gameManager";

    export let trial: CodeTrial;
    let inputValue: string = "";
    
    const checkAnswer = () => {
        if(!gameManager.completeCodeTrial(inputValue)) {
            alert("Risposta errata!");
        }
    }
</script>

<div class="p-2 fixed top-0 h-full w-full z-100 bg-blue-950 text-center flex flex-col items-center justify-center">
    <h2 class="text-sm text-center">Risolvi la seguente prova per proseguire!</h2>
    <h1 class="text-3xl text-yellow-500">{trial.text}</h1>
    <p>{trial.subtitle}</p>

    <input type="text" class="w-full max-w-xs p-2 border bg-blue-900 border-gray-300 rounded mt-4" bind:value={inputValue} placeholder="Inserisci la risposta" />
    <button class="mt-2 p-2 bg-green-700 rounded-2xl" on:click={checkAnswer}>Controlla!</button>
</div>