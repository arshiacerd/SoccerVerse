const images = document.querySelectorAll('.banner-image');
let currentIndex = 0;

function showNextImage() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

setInterval(showNextImage, 3000); // Change image every 3 seconds


let openSideNavbar = () => {
  document.getElementById("sideNavbar").style.transform = "translateX(0px)";
  document.getElementById("sideNavbar").style.opacity = "1";
  document.getElementById("sideNavbar").style.transition = "all ease .4s";
  document.getElementById("shade").style.display = "block";
}
let closeSideNavbar = () => {
  document.getElementById("sideNavbar").style.transform = "translateX(-100%)";
  document.getElementById("sideNavbar").style.opacity = "0";
  document.getElementById("sideNavbar").style.transition = "all ease .4s";
  document.getElementById("shade").style.display = "none";
}



function goToAbout() {
  if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem('scrollToAbout', 'true');
      window.location.pathname = "./index.html";

  } 
  else {
     scrollToAbout();
  }
}
function goToMatches() {
  if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem('scrollToServices', 'true');
      window.location.pathname = "./index.html";
  }
  else{
      scrollToMatches();
  }
}
function goToTopPlayers() {
  if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem('scrollToRooms', 'true');
      window.location.pathname = "./index.html";
  }
  else{
      scrollToTopPlayers();
  }
}
function goToEvents() {
  if (window.location.pathname !== "./index.html") {
      sessionStorage.setItem('scrollToTeam', 'true');
      window.location.pathname = "./index.html";
  }
  else{
      scrollToEvents();
  }
}
function goToFeedback() {
  if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem('scrollToTestimonials', 'true');
      window.location.pathname = "./index.html";
  }
  else{
      scrollToFeedback();
  }
}
function goToContacts() {
  if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem('scrollToContact', 'true');
      window.location.pathname = "./index.html";
  }
  else{
      scrollToContacts();
  }
}








function seeDetails(){
  window.scrollBy({ top: 600, behavior: 'smooth' });
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
