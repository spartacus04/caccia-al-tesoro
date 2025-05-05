import L from 'leaflet';
import { persisted } from 'svelte-persisted-store';

export const gameStatus = persisted('gameStatus', {
    stage: 0,
});

let map: L.Map, userMarker : L.Marker;

function initMap(lat: number, lng: number) {
	map = L.map('map', {
        center: [lat, lng],
        zoom: 19,
        attributionControl: false,
    }).setView([lat, lng], 16);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	userMarker = L.marker([lat, lng]).addTo(map).bindPopup('You are here.').openPopup();
}

function updateUserLocation(lat: number, lng: number) {
	userMarker.setLatLng([lat, lng]);
	map.setView([lat, lng]); // Keep map centered
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
		},
		(err) => {
			alert('Could not get your location: ' + err.message);
		},
		{
			enableHighAccuracy: true,
			maximumAge: 1000,
			timeout: 10000
		}
	);
};
