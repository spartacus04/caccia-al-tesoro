<script lang="ts">
	import type { MultipleChoiceTrial } from '$lib';
	import { gameManager } from '$lib/gameManager';

	export let trial: MultipleChoiceTrial;
	let currentSet = trial.questions[0];
	let currentSetIndex = 0;

	let answers: number[] = [];

	const checkAnswer = (answer: number) => {
		answers.push(answer);
		if (currentSetIndex < trial.questions.length - 1) {
			currentSetIndex++;
			currentSet = trial.questions[currentSetIndex];
		} else {
			if (gameManager.completeMultiTrial(answers)) {
				alert('Risposta corretta!');
			} else {
				alert('Risposta errata! Riprova. + ' + answers.join(', '));
				currentSetIndex = 0;
				currentSet = trial.questions[currentSetIndex];
				answers = [];
			}
		}
	};
</script>

<div
	class="fixed top-0 z-100 flex h-full w-full flex-col items-center justify-center bg-blue-950 p-2 text-center"
>
	<h2 class="text-center text-sm">Risolvi la seguente prova per proseguire!</h2>
	<h1 class="text-3xl text-yellow-500">{currentSet.text}</h1>

	{#each currentSet.options as option, i}
		<button class="mt-2 h-20 w-full rounded-xl bg-green-700 p-2" on:click={() => checkAnswer(i)}>
			{option}
		</button>
	{/each}
</div>
