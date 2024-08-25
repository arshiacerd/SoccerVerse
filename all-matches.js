// Check if the URL contains the 'id' parameter to determine whether to load past matches
const urlParams = new URLSearchParams(window.location.search);
const pastId = urlParams.get('id');

// Wait for the DOM to load before initializing event listeners and loading matches
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    // Load the matches based on whether 'pastId' is present in the URL
    if (pastId) {
        loadPastMatches();  // Load past matches
    } else {
        loadMatches();  // Load current matches
    }

    // Add an event listener to the search input for filtering matches as the user types
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();

        if (pastId) {
            filterPastMatches(query);  // Filter past matches
        } else {
            filterMatches(query);  // Filter current matches
        }
    });

    // Add an event listener to the sort select for sorting matches when the user changes the sort order
    sortSelect.addEventListener('change', () => {
        const sortOrder = sortSelect.value;

        if (pastId) {
            sortPastMatches(sortOrder);  // Sort past matches
        } else {
            sortMatches(sortOrder);  // Sort current matches
        }
    });
});

// Function to load and display past matches when the page loads
async function loadPastMatches() {
    let bannerHeading = document.getElementById("head-one");
    bannerHeading.innerHTML = "All Past Matches Schedule";

    const response = await fetch('./past-matches.json');
    const pastMatchesData = await response.json();

    displayMatches(pastMatchesData, 2); // Display all past matches
}

// Function to load and display current matches when the page loads
async function loadMatches() {
    const response = await fetch('./matches.json');
    const matchesData = await response.json();

    displayMatches(matchesData, 1); // Display all current matches
}

// Function to filter and display past matches based on the search query
async function filterPastMatches(query) {
    const response = await fetch('./past-matches.json');
    const pastMatchesData = await response.json();

    const filteredMatches = pastMatchesData.filter(match =>
        match.match_id.toLowerCase().includes(query) ||
        match.team1.toLowerCase().includes(query) ||
        match.team2.toLowerCase().includes(query)
    );

    displayMatches(filteredMatches, 2); // Display filtered past matches
}

// Function to filter and display current matches based on the search query
async function filterMatches(query) {
    const response = await fetch('./matches.json');
    const matchesData = await response.json();

    const filteredMatches = matchesData.filter(match =>
        match.match_id.toLowerCase().includes(query) ||
        match.team1.toLowerCase().includes(query) ||
        match.team2.toLowerCase().includes(query)
    );

    displayMatches(filteredMatches, 1); // Display filtered current matches
}

// Function to sort and display past matches based on the selected sort order
async function sortPastMatches(sortOrder) {
    const response = await fetch('./past-matches.json');
    const pastMatchesData = await response.json();

    const sortedMatches = sortMatchesData(pastMatchesData, sortOrder);

    displayMatches(sortedMatches, 2); // Display sorted past matches
}

// Function to sort and display current matches based on the selected sort order
async function sortMatches(sortOrder) {
    const response = await fetch('./matches.json');
    const matchesData = await response.json();

    const sortedMatches = sortMatchesData(matchesData, sortOrder);

    displayMatches(sortedMatches, 1); // Display sorted current matches
}

// Helper function to sort matches data by date and time
function sortMatchesData(matches, sortOrder) {
    return matches.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);

        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
}

// Helper function to display a list of matches
function displayMatches(matches, type) {
    const matchesDiv = document.querySelector('main');
    matchesDiv.innerHTML = ''; // Clear existing matches

    matches.forEach(match => {
        matchesDiv.innerHTML += createMatchCard(match, type);  // Create match card based on type
    });
}

// Helper function to create HTML structure for a match card
function createMatchCard(match, type) {
    return `
        <div class="match" onclick="seeLineups('${match.match_id}', ${type})">
            <div class="top">
                <div class="date">
                    <h5>Date</h5>
                    <p>${match.date}</p>
                </div>
                <h4>${type === 2 ? match.result.score : match.match_id}</h4>
                <div class="time">
                    <h5>Time</h5>
                    <p>${match.time}</p>
                </div>
            </div>
            <div class="mid">
                <div class="team-one">
                    <img src="${match.team1_logo}" alt="${match.team1}-logo">
                    <h3>${match.team1}</h3>
                </div>
                <h2>VS</h2>
                <div class="team-two">
                    <img src="${match.team2_logo}" alt="${match.team2}-logo">
                    <h3>${match.team2}</h3>
                </div>
            </div>
            <div class="bottom">
                <h5>Venue</h5>
                <h2>${match.venue}</h2>
            </div>
        </div>`;
}

// Function to navigate to the team lineups page
function seeLineups(matchId, num) {
    window.location.href = `./team-lineups.html?match-id=${matchId}&type=${num}`;
}
