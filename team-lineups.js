document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('match-id');
    const type = urlParams.get("type");


    if (type == 1) {
        // Fetch the JSON data
        fetch("./matches.json")
            .then(res => res.json())
            .then(matchesData => {

                let banner = document.querySelector(".banner");
                const matchData = matchesData.find(match => match.match_id === matchId);
                banner.innerHTML = `<nav>
            <div class="left">
                <div class="logo">
                    <img src="./images/logo.jpeg" alt="" width="80px" height="80px">
                </div>
                <i class="fa-solid fa-bars" onclick="openSideNavbar()"></i>
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a onclick="goToAbout()">About</a></li>
                    <li><a onclick="goToMatches()">Matches</a></li>
                    <li><a onclick="goToTopPlayers()">Top Players</a></li>
                    <li><a onclick="goToEvents()">Events</a></li>
                    <li><a onclick="goToFeedback()">Feedback</a></li>
                    <li><a onclick="goToContacts()">Contact Us</a></li>
                    <li><a href="./sitemap.html">SiteMap</a></li> 
                </ul>
            </div>
            <div class="right">
                <div class="links">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                </div>
            </div>
            </nav>
            <div id="sideNavbar">
            <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a onclick="goToAbout()">About</a></li>
                    <li><a onclick="goToMatches()">Matches</a></li>
                    <li><a onclick="goToTopPlayers()">Top Players</a></li>
                    <li><a onclick="goToEvents()">Events</a></li>
                    <li><a onclick="goToFeedback()">Feedback</a></li>
                    <li><a onclick="goToContacts()">Contact Us</a></li>
                    <li><a href="./sitemap.html">SiteMap</a></li> 
                </ul>
            <i class="fa-solid fa-xmark" id="close-icon" onclick="closeSideNavbar()"></i>
            </div>
            <img src="./images/lineup-page-banner-img.jpg" class="banner-image active" />
            <div class="shade-color"></div>
            
            <div class="banner-content">
            <h3>${matchData.match_id}</h3>
            <h1>${matchData.team1} , ${matchData.team2} LineUps</h1>
            <button type="button" onclick=seeDetails()>See Squad</button>
            </div>`

                if (matchData) {
                    // Populate the main content with the match details and lineups
                    const main = document.querySelector("main");
                    main.innerHTML = `
                    <div class="team">
                        <h1>${matchData.team1}</h1>
                        <img src="${matchData.team1_logo}" alt="${matchData.team1} logo">
                        <div class="lineup">
                            <h4>Team 1</h4>
                            <table class="team-one">
                                ${matchData.team1_lineup.map(player => `<tr><td>${player}</td></tr>`).join('')}
                            </table>
                        </div>
                    </div>
                    <div class="team">
                        <h1>${matchData.team2}</h1>
                        <img src="${matchData.team2_logo}" alt="${matchData.team2} logo">
                        <div class="lineup">
                            <h4>Team 2</h4>
                            <table class="team-two">
                                ${matchData.team2_lineup.map(player => `<tr><td>${player}</td></tr>`).join('')}
                            </table>
                        </div>
                    </div>
                    
                    <div class="match-info">
                        <h3>Match Details</h3>
                        <p><strong>Date:</strong> ${matchData.date}</p>
                        <p><strong>Time:</strong> ${matchData.time}</p>
                        <p><strong>Venue:</strong> ${matchData.venue}</p>
                    </div>`
                        ;


                } else {
                    // If match data is not found, display an error message
                    document.querySelector("main").innerHTML = `<p>No data found for match ID: ${matchId}</p>`;
                }
            })


            .catch(error => console.error('Error fetching the lineups:', error));
    }
    else if (type == 2) {
        // Fetch the JSON data
        fetch("./past-matches.json")
            .then(res => res.json())
            .then(pastMatchesData => {

                let banner = document.querySelector(".banner");
                const pastMatchData = pastMatchesData.find(match => match.match_id === matchId);
                banner.innerHTML = `<nav>
             <div class="left">
                 <div class="logo">
                     <img src="./images/logo.jpeg" alt="" width="80px" height="80px">
                 </div>
                 <i class="fa-solid fa-bars" onclick="openSideNavbar()"></i>
                  <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a onclick="goToAbout()">About</a></li>
                    <li><a onclick="goToMatches()">Matches</a></li>
                    <li><a onclick="goToTopPlayers()">Top Players</a></li>
                    <li><a onclick="goToEvents()">Events</a></li>
                    <li><a onclick="goToFeedback()">Feedback</a></li>
                    <li><a onclick="goToContacts()">Contact Us</a></li>
                    <li><a href="./sitemap.html">SiteMap</a></li> 
                </ul>
             </div>
             <div class="right">
                 <input type="search" id="search-input" placeholder="search....">
                 <div class="links">
                     <i class="fa-brands fa-facebook-f"></i>
                     <i class="fa-brands fa-instagram"></i>
                     <i class="fa-brands fa-x-twitter"></i>
                 </div>
             </div>
             </nav>
             <div id="sideNavbar">
              <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a onclick="goToAbout()">About</a></li>
                    <li><a onclick="goToMatches()">Matches</a></li>
                    <li><a onclick="goToTopPlayers()">Top Players</a></li>
                    <li><a onclick="goToEvents()">Events</a></li>
                    <li><a onclick="goToFeedback()">Feedback</a></li>
                    <li><a onclick="goToContacts()">Contact Us</a></li>
                    <li><a href="./sitemap.html">SiteMap</a></li> 
                </ul>
             <i class="fa-solid fa-xmark" id="close-icon" onclick="closeSideNavbar()"></i>
             </div>
             <img src="./images/lineup-page-banner-img.jpg" class="banner-image active" />
             <div class="shade-color"></div>
             
             <div class="banner-content">
             <h3>Our</h3>
             <h1>${pastMatchData.team1} , ${pastMatchData.team2} LineUps</h1>
             <button type="button">See Squad</button>
             </div>`

                if (pastMatchData) {
                    const main = document.querySelector("main");
                    main.innerHTML = `
                     <div class="team">
                         <h1>${pastMatchData.team1}</h1>
                         <img src="${pastMatchData.team1_logo}" alt="${pastMatchData.team1} logo">
                         <div class="lineup">
                             <h4>Team 1</h4>
                             <table class="team-one">
                                 ${pastMatchData.team1_lineup.map(player => `<tr><td>${player}</td></tr>`).join('')}
                             </table>
                         </div>
                     </div>
                     <div class="team">
                         <h1>${pastMatchData.team2}</h1>
                         <img src="${pastMatchData.team2_logo}" alt="${pastMatchData.team2} logo">
                         <div class="lineup">
                             <h4>Team 2</h4>
                             <table class="team-two">
                                 ${pastMatchData.team2_lineup.map(player => `<tr><td>${player}</td></tr>`).join('')}
                             </table>
                         </div>
                     </div>
                     
                     <div class="match-info">
                         <h3>Match Details</h3>
                         <p><strong>Date:</strong> ${pastMatchData.date}</p>
                         <p><strong>Time:</strong> ${pastMatchData.time}</p>
                         <p><strong>Venue:</strong> ${pastMatchData.venue}</p>
                     </div>
                     <div class="match-result">
                         <h3>Match Result</h3>
                         <p><strong>Winner:</strong> ${pastMatchData.result.winner}</p>
                         <p><strong>Score:</strong> ${pastMatchData.result.score}</p>
                         <p><strong>${pastMatchData.result.details}</strong></p>
                     </div>`
                        ;


                } else {
                    // If match data is not found, display an error message
                    document.querySelector("main").innerHTML = `<p>No data found for match ID: ${matchId}</p>`;
                }
            })


            .catch(error => console.error('Error fetching the lineups:', error));
    }
    else {
        console.error('No match ID found in the URL');
    }
});


