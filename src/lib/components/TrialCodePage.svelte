<script lang="ts">
	import type { CodeTrial } from '$lib';
	import { gameManager } from '$lib/gameManager';

	export let trial: CodeTrial;
	let inputValue: string = '';

	const checkAnswer = () => {
		if (!gameManager.completeCodeTrial(inputValue)) {
			alert('Risposta errata!');
		}
	};
</script>

<div
	class="fixed top-0 z-100 flex h-full w-full flex-col items-center justify-center bg-blue-950 p-2 text-center"
>
	<h2 class="text-center text-sm">Risolvi la seguente prova per proseguire!</h2>
	<h1 class="text-3xl text-yellow-500">{trial.text}</h1>
	{#if trial.subtitle}
		<p>{trial.subtitle}</p>
	{/if}

	<input
		type="text"
		class="mt-4 w-full max-w-xs rounded border border-gray-300 bg-blue-900 p-2"
		bind:value={inputValue}
		placeholder="Inserisci la risposta"
	/>
	<button class="mt-2 rounded-2xl bg-green-700 p-2" on:click={checkAnswer}>Controlla!</button>
</div>
