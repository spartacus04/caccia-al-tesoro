<script lang="ts">
	import type { MultipleChoiceTrial } from "$lib";
	import { gameManager } from "$lib/gameManager";

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
                alert("Risposta corretta!");
            } else {
                alert("Risposta errata! Riprova. + " + answers.join(", "));
                currentSetIndex = 0;
                currentSet = trial.questions[currentSetIndex];
                answers = [];
            }
        }
    };

</script>

<div class="p-2 fixed top-0 h-full w-full z-100 bg-blue-950 text-center flex flex-col items-center justify-center">
    <h2 class="text-sm text-center">Risolvi la seguente prova per proseguire!</h2>
    <h1 class="text-3xl text-yellow-500">{currentSet.text}</h1>

    {#each currentSet.options as option, i}
        <button class="mt-2 p-2 bg-green-700 rounded-xl h-20 w-full" on:click={() => checkAnswer(i)}>
            {option}
        </button>
    {/each}
</div>