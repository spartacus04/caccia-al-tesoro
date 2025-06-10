<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CodeTrial } from '$lib';
	import { gameManager } from '$lib/gameManager';

	gameManager.complete();

	const restart = () => {
		gameManager.reset();
		goto('/caccia-al-tesoro/start');
	};
</script>

<div
	class="fixed top-0 z-100 flex h-full w-full flex-col items-center justify-center bg-blue-950 p-2 text-center"
>
	<h1 class="text-3xl text-yellow-500">Hai concluso la caccia al tesoro!</h1>
	<p>Grazie per aver giocato</p>
	<p class="text-center text-green-600">Tempo di gioco: {gameManager.getFormattedTime()}</p>

	<button class="mt-2 rounded-2xl bg-green-700 p-2" on:click={restart}>Ricomincia</button>
</div>
