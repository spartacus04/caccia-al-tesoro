import type { LatLngTuple } from 'leaflet';
import Waypoints from '$lib/waypoints.json';

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
	waypoints: Waypoints as Waypoint[]
};
