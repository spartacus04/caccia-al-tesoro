import { goto } from '$app/navigation';
import { positions } from '$lib';
import L from 'leaflet';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const gameStatus = persisted('gameStatus', {
    stage: 0,
    requiresTrial: false,
    trialFinished: false,
    finished: false,
});

let map: L.Map, userMarker : L.Marker;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

function initMap(lat: number, lng: number) {
	map = L.map('map', {
        center: [lat, lng],
        zoom: 20,
        attributionControl: false,
    }).setView([lat, lng]);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	}).addTo(map);

	userMarker = L.marker([lat, lng]).addTo(map).openPopup();
}

function updateUserLocation(lat: number, lng: number) {
	userMarker.setLatLng([lat, lng]);
}

export const run = () => {
	navigator.geolocation.watchPosition(
		(position) => {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;

			if (!map) {
				initMap(lat, lng); // First location fix
			} else {
				updateUserLocation(lat, lng); // Update marker and recenter
			}

            const currentLandMark = positions[get(gameStatus).stage];

            if(getDistance(lat, lng, currentLandMark.latitude, currentLandMark.longitude) < currentLandMark.range / 1000) {
                gameStatus.update((status) => {
                    if(!status.requiresTrial) {
                        // add landmark to the map
                        L.marker([currentLandMark.latitude, currentLandMark.longitude]).addTo(map).bindPopup(currentLandMark.text).openPopup();

                        status.requiresTrial = true;
                        return status;
                    }

                    if(!status.trialFinished) return status;

                    if(status.stage < positions.length - 1) {
                        status.stage++;
                        status.requiresTrial = false;
                        return status;
                    } else {
                        status.finished = true;
                        alert("Hai completato il gioco!");
                        setTimeout(() => {
                            goto('/caccia-al-tesoro/start');
                        }, 1000);
                        return status;
                    }
                })
            }
		},
		(_) => {
			alert("Impossibile trovare la posizione. Assicurati di aver attivato la geolocalizzazione.");
            goto('/caccia-al-tesoro/start');
		},
		{
			enableHighAccuracy: true,
			maximumAge: 1000,
			timeout: 10000
		}
	);
};
