<script lang="ts">
    import { settings, type Waypoint } from '$lib';

    const saveElem = (waypoint: Waypoint) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    const updatedWaypoint = {
                        ...waypoint,
                        coords: coords
                    };

                    // save as json file
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(updatedWaypoint, null, 2));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute('href', dataStr);
                    downloadAnchorNode.setAttribute('download', `waypoint-${waypoint.text}.json`);
                    document.body.appendChild(downloadAnchorNode); // required for firefox
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                    alert(`Le coordinate sono state salvate per la prova ${waypoint.text}`);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
</script>

<div class="flex flex-col items-center justify-center h-full">
    <h1 class="h4">Usa questa pagina per ricavare le coordinate e aiutarmi a sistemare le prove</h1>
    <p>Devi dare i permessi per le coordinate per funzionare</p>

    {#each settings.waypoints as waypoint, i}
        <button class="flex flex-col items-center justify-center btn btn-primary m-2" on:click={() => saveElem(waypoint)}>
            <h2 class="h5">Prova {i + 1}</h2>
            <p>{waypoint.text}</p>
        </button>
    {/each}
</div>