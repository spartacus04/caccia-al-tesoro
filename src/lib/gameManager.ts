import { settings } from '$lib';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

class GameManager {
	public saveData = persisted('gameSave', {
		stage: 0,
		inTrial: false,
		completed: false,
		startTime: Date.now(),
		endTime: 0
	});

	public constructor() {
		if (this.saveDataSnapshot.stage >= settings.waypoints.length) {
			this.saveData.update((data) => {
				data.completed = true;
				data.stage = 0;
				return data;
			});
		}
	}

	public get saveDataSnapshot() {
		return get(this.saveData);
	}

	public get currentWaypoint() {
		return settings.waypoints[this.saveDataSnapshot.stage];
	}

	public startTrial() {
		this.saveData.update((data) => {
			data.inTrial = true;
			return data;
		});
	}

	public completeMultiTrial(userAnswers: number[]): boolean {
		const trial = this.currentWaypoint.trial;

		if (trial.type !== 'multiple-choice') return false;

		// Check if the answer is correct
		const numberOfCorrectAnswers = userAnswers.reduce((acc, answer, index) => {
			if (trial.questions[index].answer == answer) {
				return acc + 1;
			}
			return acc;
		}, 0);

		if (numberOfCorrectAnswers < trial.miniumCorrectAnswers) return false;

		this.saveData.update((data) => {
			data.inTrial = false;
			data.stage += 1;
			return data;
		});

		return true;
	}

	public completeCodeTrial(userAnswer: string): boolean {
		const trial = this.currentWaypoint.trial;
		if (trial.type !== 'code') return false;

		// Check if the code is correct
		if (trial.answer.toLowerCase() != userAnswer.trim().toLowerCase()) return false;

		this.saveData.update((data) => {
			data.inTrial = false;
			data.stage += 1;
			return data;
		});

		return true;
	}

	public reset() {
		this.saveData.update((data) => {
			data.stage = 0;
			data.inTrial = false;

			return data;
		});
	}

	public complete() {
		this.saveData.update((data) => {
			data.completed = true;
			data.endTime = Date.now();
			return data;
		});
	}

	public getFormattedTime() {
		if(this.saveDataSnapshot.endTime === 0) {
			return 'In corso...';
		}

		const startSecs = Math.floor(this.saveDataSnapshot.startTime / 1000);
		const endSecs = Math.floor(this.saveDataSnapshot.endTime / 1000);

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
}

export const gameManager = new GameManager();
