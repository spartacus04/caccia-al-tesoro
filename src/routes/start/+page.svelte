<script lang="ts">
	import { gameManager } from '$lib/gameManager';

	const start = () => {
		gameManager.saveData.update(data => {
			data.startTime = Date.now();
			return data;
		})
	}

	const getTimeStr = () => {
		const startSecs = Math.floor(gameManager.saveDataSnapshot.startTime / 1000);
		const endSecs = Math.floor(gameManager.saveDataSnapshot.endTime / 1000);

		const diffSecs = endSecs - startSecs;

		const hours = Math.floor(diffSecs / 3600);

		const minutes = Math.floor((diffSecs % 3600) / 60);
		const seconds = diffSecs % 60;

		let timeStr = '';
		if (hours > 0) {
			timeStr += `${hours} ore `;
		}
		timeStr += `${minutes} minuti e `;
		timeStr += `${seconds} secondi`;
		return timeStr;
	}
</script>

<div class="flex h-full items-center bg-blue-950 p-1">
	<div class="mx-auto w-full max-w-3xl rounded-2xl bg-blue-900 p-8 shadow-sm">
		<h1 class="mb-6 text-center text-3xl font-bold">
			Benvenuto alla caccia al tesoro del <b class="text-yellow-500">Branco Popolo Libero</b>!
		</h1>
		<p class="text-md mb-4">
			Per permettere il corretto funzionamento della caccia al tesoro è necessaro condividere la
			posizione. Premendo il tasto sottostante accetterai questa condizione. Maggiori informazioni <a
				class="anchor text-blue-500 underline"
				href="/caccia-al-tesoro/privacy">qui</a
			>!
		</p>
		<div class="flex justify-center">
			<a on:click={start}
				href="/caccia-al-tesoro/"
				class="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
				>Sono pronto!</a
			>
		</div>
		{#if gameManager.saveDataSnapshot.completed}
			<p class="mt-2 text-center text-green-600"><b>Ho concluso la caccia al tesoro in {getTimeStr()}!</b></p>
		{/if}
	</div>
</div>
