
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      
      // Filter top players
      filterTopPlayers(query);
    });
  });


async function filterTopPlayers(query) {
    const response = await fetch('./top-scores.json');
    const players = await response.json();
  
    // Sort players by total_points in descending order
    players.sort((a, b) => b.total_points - a.total_points);
  
    const tableBody = document.getElementById('top-players-body');
    tableBody.innerHTML = ''; // Clear existing rows
  
    players
      .filter(player => player.name.toLowerCase().includes(query) || player.team.toLowerCase().includes(query))
      .slice(0, 10) // Show top 10 players
      .forEach(player => {
        const row = `
          <tr>
            <td class="player"><img src="${player.image}" alt="${player.name}"> ${player.name}</td>
            <td>${player.team}</td>
            <td>${player.goals}</td>
            <td>${player.assists}</td>
            <td>${player.total_points}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
  }
  

async function loadTopPlayers() {
    const response = await fetch('./top-scores.json');
    const players = await response.json();
  
    // Sort players by total_points in descending order
    players.sort((a, b) => b.total_points - a.total_points);

    const tableBody = document.getElementById('top-players-body');
  
    // Display only the top 3 players in the table
    players.forEach(player => {
        const row = `
            <tr>
                <td class="player"><img src="${player.image}" alt="${player.name}"> ${player.name}</td>
                <td>${player.team}</td>
                <td>${player.goals}</td>
                <td>${player.assists}</td>
                <td>${player.total_points}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
  }
  
  // Call the function to load top players on page load
  document.addEventListener('DOMContentLoaded', loadTopPlayers);
  