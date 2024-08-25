const urlParams = new URLSearchParams(window.location.search);
const playerId= urlParams.get('player-id');

async function playerProfile() {
    let response = await fetch("./player-profiles.json");
    let playersData = await response.json();

    let playerData = playersData.find((player => player.player_id === playerId));
    
    let main = document.querySelector("main");
    main.innerHTML = `<div class="image">
                <img src="${playerData.image}" alt="${playerData.name}-pic">
                <div class="shade"></div>
            </div>
            <div class="personal-info">
                <h1>Personal-Info</h1>
                <div class="content">
                    <div class="p-info">
                        <h2>Player Name</h2>
                        <p>${playerData.name}</p>
                    </div>
                    <div class="p-info">
                        <h2>Nationality</h2>
                        <p>${playerData.nationality}</p>
                    </div>
                    <div class="p-info">
                        <h2>Height</h2>
                        <p>${playerData.height}</p>
                    </div>
                    <div class="p-info">
                        <h2>Weight</h2>
                        <p>${playerData.weight}</p>
                    </div>
                    <div class="p-info">
                        <h2>Current Team</h2>
                        <p>${playerData.team}</p>
                    </div>
                    <div class="p-info">
                        <h2>Past Team</h2>
                        <p>${playerData.past_team}</p>
                    </div>
                </div>

            </div>
            <div class="biography">
                <h1>Biography</h1>
                <p>
                    ${playerData.biography}
                </p>
            </div>
            <div class="statistics">
                <h1>Statistics</h1>
                <p>Goals: <span>${playerData.statistics.goals}</span></p>
                <p>Assists: <span>${playerData.statistics.assists}</span></p>
                <p>Appearance: <span>${playerData.statistics.appearances}</span></p>
            </div>`
}

document.addEventListener("DOMContentLoaded", playerProfile)