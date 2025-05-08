import { settings } from '$lib';
import L, { type LatLngTuple } from 'leaflet';
import { gameManager } from './gameManager';

export class MapManager {
	private mapElement: HTMLElement | null = null;
	private map: L.Map | null = null;
	private userMarker: L.CircleMarker | null = null;
	private geolocationId: number | null = null;

	public distanceFrom(coords1: LatLngTuple, coords2: LatLngTuple): number {
		return this.map!.distance(coords1, coords2);
	}

	public async tryInit(mapElement: HTMLElement) {
		return new Promise<void>((resolve, reject) => {
			if (!navigator.geolocation) {
				return reject('La geolocalizzazione non è supportata da questo browser.');
			}

			this.mapElement = mapElement;
			this.geolocationId = navigator.geolocation.watchPosition(
				({ coords }) => {
					const coordsSet: LatLngTuple = [coords.latitude, coords.longitude];

					if (!this.map) {
						this.map = L.map(this.mapElement!, {
							center: coordsSet,
							zoom: 25,
							attributionControl: false,
							zoomControl: false
						});

						L.tileLayer(settings.tileLayerUrl).addTo(this.map);

						this.userMarker = L.circleMarker(coordsSet, {
							radius: 10,
							weight: 4,
							color: 'blue',
							opacity: 0.7,
							fillColor: 'yellow',
							fillOpacity: 1
						}).addTo(this.map);

						setTimeout(() => {
							this.map?.invalidateSize();
						});

						for (let i = 0; i < gameManager.saveDataSnapshot.stage; i++) {
							const waypoint = settings.waypoints[i];
							L.marker(waypoint.coords).addTo(this.map!);
						}

						resolve();
					} else {
						this.userMarker?.setLatLng(coordsSet);
					}

					this.gameLogic(coordsSet);
				},
				(err) => {
					if (err.code == err.PERMISSION_DENIED) {
						return reject('La geolocalizzazione è stata negata.');
					} else if (err.code == err.POSITION_UNAVAILABLE) {
						return reject('La geolocalizzazione non è disponibile.');
					} else if (err.code == err.TIMEOUT) {
						return reject('La geolocalizzazione ha superato il timeout.');
					}
				},
				{
					enableHighAccuracy: true,
					maximumAge: 1000,
					timeout: 10000
				}
			);
		});
	}

	private gameLogic(loc: LatLngTuple) {
		if (this.distanceFrom(loc, gameManager.currentWaypoint.coords) < settings.waypointMinDistance) {
			if (!gameManager.saveDataSnapshot.inTrial) {
				L.marker(gameManager.currentWaypoint.coords).addTo(this.map!);
				gameManager.startTrial();
			}
		}
	}

	public stopGeolocation() {
		if (this.geolocationId) {
			navigator.geolocation.clearWatch(this.geolocationId);
			this.geolocationId = null;
		}
	}
}
