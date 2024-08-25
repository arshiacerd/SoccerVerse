// JavaScript for live search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    
    // Filter top players
    filterTopPlayers(query);

    // Filter matches
    filterMatches(query);

    filterPastMatches(query);

    // Filter events
    filterEvents(query);
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
    .slice(0, 3) // Show top 10 players
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

async function filterMatches(query) {
  const response = await fetch('./matches.json');
  const matches = await response.json();

  const matchesDiv = document.querySelector('.matches');
  matchesDiv.innerHTML = ''; // Clear existing matches

  matches
    .filter(match => match.match_id.toLowerCase().includes(query) || 
                     match.team1.toLowerCase().includes(query) || 
                     match.team2.toLowerCase().includes(query))
    .slice(3, 6) // Show top 5 matches
    .forEach(match => {
      matchesDiv.innerHTML += ` 
        <div class="match" onclick="seeLineups('${match.match_id}', 1)">
          <div class="top">
            <div class="date">
              <h5>Date</h5>
              <p>${match.date}</p>
            </div>
            <h4>${match.match_id}</h4>
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
    });
}

async function filterPastMatches(query) {
  const response = await fetch('./past-matches.json');
  const matches = await response.json();

  const matchesDiv = document.querySelector('main');
  matchesDiv.innerHTML = ''; // Clear existing matches

  matches
      .filter(match => match.match_id.toLowerCase().includes(query) ||
          match.team1.toLowerCase().includes(query) ||
          match.team2.toLowerCase().includes(query))
      //   .slice(0, 6) // Show top 5 matches
      .forEach(match => {
          matchesDiv.innerHTML += ` 
            <div class="match" onclick="seeLineups('${match.match_id}', 2)">
              <div class="top">
                <div class="date">
                  <h5>Date</h5>
                  <p>${match.date}</p>
                </div>
                <h4>${match.result.score}</h4>
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
      });
}

async function filterEvents(query) {
  const response = await fetch('./matches.json'); // Use the correct file for events if needed
  const events = await response.json();

  const bigEventsDiv = document.querySelector('.big-events');
  const pastEventsDiv = document.querySelector('.past-events');

  bigEventsDiv.innerHTML = ''; // Clear existing big events
  pastEventsDiv.innerHTML = ''; // Clear existing past events

  events
    .filter(event => event.match_id.toLowerCase().includes(query) ||
                     event.team1.toLowerCase().includes(query) || 
                     event.team2.toLowerCase().includes(query))
    .slice(4, 6) 
    .forEach(event => {
      if (event.type === 'big') {
        bigEventsDiv.innerHTML += ` 
          <div class="match" onclick="seeLineups('${event.match_id}', 1)">
            <div class="top">
              <div class="date">
                <h5>Date</h5>
                <p>${event.date}</p>
              </div>
              <h4>${event.match_id}</h4>
              <div class="time">
                <h5>Time</h5>
                <p>${event.time}</p>
              </div>
            </div>
            <div class="mid">
              <div class="team-one">
                <img src="${event.team1_logo}" alt="${event.team1}-logo">
                <h3>${event.team1}</h3>
              </div>
              <h2>VS</h2>
              <div class="team-two">
                <img src="${event.team2_logo}" alt="${event.team2}-logo">
                <h3>${event.team2}</h3>
              </div>
            </div>
            <div class="bottom">
              <h5>Venue</h5>
              <h2>${event.venue}</h2>
            </div>
          </div>`;
      } else if (event.type === 'past') {
        pastEventsDiv.innerHTML += ` 
          <div class="match" onclick="seeLineups('${event.match_id}', 2)">
            <div class="top">
              <div class="date">
                <h5>Date</h5>
                <p>${event.date}</p>
              </div>
              <h4>${event.result.score}</h4>
              <div class="time">
                <h5>Time</h5>
                <p>${event.time}</p>
              </div>
            </div>
            <div class="mid">
              <div class="team-one">
                <img src="${event.team1_logo}" alt="${event.team1}-logo">
                <h3>${event.team1}</h3>
              </div>
              <h2>VS</h2>
              <div class="team-two">
                <img src="${event.team2_logo}" alt="${event.team2}-logo">
                <h3>${event.team2}</h3>
              </div>
            </div>
            <div class="bottom">
              <h5>Venue</h5>
              <h2>${event.venue}</h2>
            </div>
          </div>`;
      }
    });
}




// fetching matches data

fetch("./matches.json")
.then(res => res.json())
.then(matchesData =>{
  let matchesDiv = document.querySelector(".matches");
  matchesDiv.innerHTML = "";
  matchesData.slice(3,6).forEach(match => {
      matchesDiv.innerHTML += ` <div class="match" onclick="seeLineups('${match.match_id}',1)">
                <div class="top">
                    <div class="date">
                        <h5>Date</h5>
                        <p>${match.date}</p>
                    </div>

                    <h4>${match.match_id}</h4>

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
                    <h5>venue</h5>
                    <h2>${match.venue}</h2>
                </div>
            </div>`
  });
})


function seeLineups(matchId , num){
    window.location.href = `./team-lineups.html?match-id=${matchId}&type=${num}`;
}


async function loadTopPlayers() {
  const response = await fetch('./top-scores.json');
  const players = await response.json();

  // Sort players by total_points in descending order
  players.sort((a, b) => b.total_points - a.total_points);
  console.log(players);
  



  // Select the top 3 players
  const top3Players = players.slice(0, 3);
  console.log(top3Players);
  

  const tableBody = document.getElementById('top-players-body');

  // Display only the top 3 players in the table
  top3Players.forEach(player => {
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

// players galary section
async function playerProfile() {
    let response = await fetch("./player-profiles.json");
    let playersData = await response.json();
    let cardsDiv = document.querySelector(".cards-wrap");
    let count = 1;
    cardsDiv.innerHTML = "";
    playersData.forEach(player =>{
        cardsDiv.innerHTML += `<div class="each-player" onclick="playerDetail('${player.player_id}')">
                    <img src="${player.image}" alt="">
                    <div class="shade"></div>
                </div>`
    })
}

document.addEventListener("DOMContentLoaded", playerProfile)

function playerDetail(playerId){
    window.location.href= `./player-detail.html?player-id=${playerId}`;
}


// upcoming events section
fetch("./matches.json")
.then(res => res.json())
.then(matchesData =>{
  let bigEvents = document.querySelector(".big-events");
  bigEvents.innerHTML = "";
  matchesData.slice(4,6).forEach(match => {
      bigEvents.innerHTML += ` <div class="match"   onclick="seeLineups('${match.match_id}', 1)">
                <div class="top">
                    <div class="date">
                        <h5>Date</h5>
                        <p>${match.date}</p>
                    </div>

                    <h4>${match.match_id}</h4>

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
                    <h5>venue</h5>
                    <h2>${match.venue}</h2>
                </div>
            </div>`
  });
})

// past events section

fetch("./past-matches.json")
.then(res => res.json())
.then(pastMatchesData =>{
    console.log(pastMatchesData);
    
  let pastEvents = document.querySelector(".past-events");
  pastEvents.innerHTML = "";
  pastMatchesData.slice(4,7).forEach(match => {
      pastEvents.innerHTML += ` <div class="match" onclick="seeLineups('${match.match_id}', 2)">
                <div class="top">
                    <div class="date">
                        <h5>Date</h5>
                        <p>${match.date}</p>
                    </div>

                    <h4>${match.result.score}</h4>

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
                    <h5>venue</h5>
                    <h2>${match.venue}</h2>
                </div>
            </div>`
  });
})



// contact us section

function onlyAlphabet(e) {
    let alphabet = e.which;
    if (alphabet != 32 && (alphabet < 65 || alphabet > 90) && (alphabet < 97 || alphabet > 122)) {
        return false;
    }
}


let feedEmail = document.getElementById("feed-email");
let feedEmailErr = document.querySelector(".feed-email .email-error");
let feedName = document.getElementById("feed-name");
let feedNameErr = document.querySelector(".feed-name .name-error");
let feedMsg = document.getElementById("feed-message");
let feedMsgErr = document.querySelector(".feed-msg .msg-error");

function checkFeedFoam(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;
    ;
    let succesMsg = document.querySelector("#formMsg p");

    if (feedName.value == "") {
        feedName.style.border = "1px solid red";
        feedNameErr.innerHTML = "Please enter name!"
        feedNameErr.style.visibility = "visible";
    }
    else if (feedEmail.value == "") {
        feedEmail.style.border = "1px solid red";
        feedEmailErr.innerHTML = "Please enter email!"
        feedEmailErr.style.visibility = "visible";
    }
    else if (!emailRegex.test(feedEmail.value)) {
        feedEmail.style.border = "1px solid red";
        feedEmailErr.innerHTML = "Please enter valid email!"
        feedEmailErr.style.visibility = "visible";
    }
    else if (feedMsg.value == "") {
        feedMsg.style.border = "1px solid red";
        feedMsgErr.innerHTML = "Please write your msg!"
        feedMsgErr.style.visibility = "visible";
    }
    else {
      let formMsg = document.getElementById("formMsg");
      formMsg.style.visibility = "visible";
      formMsg.style.opacity = "1";
      succesMsg.innerHTML = "Feedback Successfully Sent!"
      setTimeout(function () {
          formMsg.style.visibility = "hidden";
          formMsg.style.opacity = "0";
      }, 800);

        feedName.value = "";
        feedEmail.value = "";
        feedMsg.value = "";
    }
}




let email = document.getElementById("email");
let emailErr = document.querySelector(".email-field .email-error");
let Name = document.getElementById("name");
let nameErr = document.querySelector(".name .name-error");
let msg = document.getElementById("message");
let msgErr = document.querySelector(".msg .msg-error");

function checkFoam(e) {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{5,8}\.[a-zA-Z]{2,}$/;
  ;
  let succesMsg = document.querySelector("#formMsg p");

  if (Name.value == "") {
      Name.style.border = "1px solid red";
      nameErr.innerHTML = "Please enter name!"
      nameErr.style.visibility = "visible";
  }
  else if (email.value == "") {
      email.style.border = "1px solid red";
      emailErr.innerHTML = "Please enter email!"
      emailErr.style.visibility = "visible";
  }
  else if (!emailRegex.test(email.value)) {
      email.style.border = "1px solid red";
      emailErr.innerHTML = "Please enter valid email!"
      emailErr.style.visibility = "visible";
  }
  else if (msg.value == "") {
      msg.style.border = "1px solid red";
      msgErr.innerHTML = "Please write your msg!"
      msgErr.style.visibility = "visible";
  }
  else {
      let feedMsg = document.getElementById("formMsg");
      feedMsg.style.visibility = "visible";
      feedMsg.style.opacity = "1";
      succesMsg.innerHTML = "Msg Successfully Sent!"
      setTimeout(function () {
          feedMsg.style.visibility = "hidden";
          feedMsg.style.opacity = "0";
      }, 800);

      Name.value = "";
      email.value = "";
      msg.value = "";
  }
}

function fillInputsFields() {
    Name.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    feedName.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    nameErr.style.visibility = "hidden";
    nameErr.innerHTML = ".";
    feedNameErr.style.visibility = "hidden";
    feedNameErr.innerHTML = ".";

    email.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    feedEmail.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    emailErr.style.visibility = "hidden";
    emailErr.innerHTML = ".";
    feedEmailErr.style.visibility = "hidden";
    feedEmailErr.innerHTML = ".";

    msg.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    feedMsg.style.border = "1px solid rgba(128, 128, 128, 0.137)";
    msgErr.style.visibility = "hidden";
    msgErr.innerHTML = ".";
    feedMsgErr.style.visibility = "hidden";
    feedMsgErr.innerHTML = ".";

}


function seeDetails(){
  window.scrollBy({ top: 300, behavior: 'smooth' });
}

function scrollToAbout() {
  const aboutSection = document.getElementById('about-section');

  if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToMatches() {
  const servicesSection = document.getElementById('matches-section');
  if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToTopPlayers() {
  const roomsSection = document.getElementById('top-players-section');
  if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToEvents() {
  const teamSection = document.getElementById('events-section');
  if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToFeedback() {
  const testimonialsSection = document.getElementById('feedback-section');
  if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToContacts() {
  const contactSection = document.getElementById('contact-us-section');
  if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}



window.addEventListener('load', () => {
  const scrollToAboutSec = sessionStorage.getItem('scrollToAbout');
  const scrollToServicesSec = sessionStorage.getItem('scrollToServices');
  const scrollToRoomsSec = sessionStorage.getItem('scrollToRooms');
  const scrollToTeamSec = sessionStorage.getItem('scrollToTeam');
  const scrollToTestimonialsSec = sessionStorage.getItem('scrollToTestimonials');
  const scrollToContactSec = sessionStorage.getItem('scrollToContact');

  if (scrollToAboutSec === 'true') {
      setTimeout(() => {
          scrollToAbout();
          sessionStorage.removeItem('scrollToAbout');
      }, 300)
  }
  else if (scrollToServicesSec === 'true') {
      setTimeout(() => {
          scrollToMatches();
          sessionStorage.removeItem('scrollToServices');
      }, 300)
  }
  else if (scrollToRoomsSec === 'true') {
      setTimeout(() => {
          scrollToTopPlayers();
          sessionStorage.removeItem('scrollToRooms');
      }, 300)
  }
  else if (scrollToTeamSec === 'true') {
      setTimeout(() => {
          scrollToEvents();
          sessionStorage.removeItem('scrollToTeam');
      }, 300)
  }
  else if (scrollToTestimonialsSec === 'true') {
      setTimeout(() => {
          scrollToFeedback();
          sessionStorage.removeItem('scrollToTestimonials');
      }, 300)
  }
  else if (scrollToContactSec === 'true') {
      setTimeout(() => {
          scrollToContacts();
          sessionStorage.removeItem('scrollToContact');
      }, 300)
  }
});