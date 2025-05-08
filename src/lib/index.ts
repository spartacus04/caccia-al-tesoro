import type { LatLngTuple } from 'leaflet';

export interface Waypoint {
	text: string;
	subtitle: string | undefined | null;

	coords: LatLngTuple;

	trial: CodeTrial | MultipleChoiceTrial | FinishTrial;
}

export interface CodeTrial {
	type: 'code';
	text: string;
	subtitle: string | undefined;
	answer: string;
}

export interface MultipleChoiceTrial {
	type: 'multiple-choice';

	miniumCorrectAnswers: number;

	questions: {
		text: string;
		options: string[];
		answer: number;
	}[];
}

export interface FinishTrial {
	type: 'finish';
}

export const settings: {
	waypointMinDistance: number;
	tileLayerUrl: string;
	waypoints: Waypoint[];
} = {
	waypointMinDistance: 20,
	tileLayerUrl:
		'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
	waypoints: [
		{
			text: 'Obiettivo: Raggiungi cologno centro...',
			subtitle:
				'Questo testo è un esempio di sottotitolo possiamo cambiare il testo in qualsiasi momento. Possiamo anche rimuoverlo completamente.',
			coords: [45.5278889, 9.283388888888888],

			trial: {
				type: 'code',
				text: 'In quale stazione di Cologno sei?',
				subtitle: 'Questo testo è un esempio di sottotitolo bla bla bla',
				answer: 'Centro'
			}
		},
		{
			text: 'Obiettivo: raggiungi il parchetto vicino alla fermata di Cologno Centro...',
			subtitle: undefined,
			coords: [45.528664, 9.283196],

			trial: {
				type: 'multiple-choice',
				miniumCorrectAnswers: 4,
				questions: [
					{
						text: 'Quale di questi oggetti è fondamentale per far muovere una barca a vela?',
						options: ['La pagaia', 'Il giubbotto salvagente', 'La vela'],
						answer: 2
					},
					{
						text: 'Quale nodo è utile per legare la barca al molo senza che si sciolga facilmente?',
						options: ['Nodo scorsoio', 'Nodo parlato', 'Nodo dell’amicizia'],
						answer: 1
					},
					{
						text: 'Cosa significa “essere pronti” per uno scout?',
						options: [
							'Avere sempre uno zaino perfettamente equipaggiato',
							'Essere svegli anche la notte',
							'Essere disponibili ad aiutare in ogni momento'
						],
						answer: 2
					},
					{
						text: 'Che animale guida il branco dei lupetti nel “Libro della Giungla”?',
						options: ['Bagheera la pantera', 'Akela il lupo', 'Kaa il pitone'],
						answer: 1
					}
				]
			}
		},
		{
			text: 'Torna a cologno centro...',
			subtitle: undefined,
			coords: [45.5278889, 9.283388888888888],

			trial: {
				type: 'finish'
			}
		}
	]
};
