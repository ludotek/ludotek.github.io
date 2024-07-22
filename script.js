

window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  var iso = document.getElementById('iso');


  if (window.pageYOffset > 0) {
    header.classList.add('scrolled');
    
  } else {
    header.classList.remove('scrolled');
  
  }

  if (window.pageYOffset > 0) {
    iso.classList.add('scrolled2');
    
  } else {
    iso.classList.remove('scrolled2');
  
  }
});



if (window.pageYOffset > 0) {
  iso.classList.add('scrolled2');

  
} else {
  iso.classList.remove('scrolled2');

}












const openModal2 = document.getElementById("clic2");
const modal2 = document.getElementById("modal2");
const closeModal2 = document.getElementById('modal__close2');

openModal2.addEventListener('click', (e) => {
  e.preventDefault();
  modal2.classList.add('modal--show');
  //modal.setAttribute("style", "display:flex")
});

closeModal2.addEventListener('click', (e) => {
  e.preventDefault();
  modal2.classList.remove('modal--show');
});



const openModal3 = document.getElementById("clic3");
const modal3 = document.getElementById("modal3");
const closeModal3 = document.getElementById('modal__close3');
openModal3.addEventListener('click', (e) => {
  e.preventDefault();
  modal3.classList.add('modal--show');
  //modal.setAttribute("style", "display:flex")
});
closeModal3.addEventListener('click', (e) => {
  e.preventDefault();
  modal3.classList.remove('modal--show');
});













// Example: Adding hover effect to team member photos
const teamMemberPhotos = document.querySelectorAll('.team-member img');

teamMemberPhotos.forEach(photo => {
  photo.addEventListener('mouseover', () => {
    photo.style.opacity = 0.8;
  });

  photo.addEventListener('mouseout', () => {
    photo.style.opacity = 1;
  });
});

// Add more JavaScript for other interactive elements (video controls, interview snippets, timeline navigation, etc.)




const openModal = document.querySelector('.hambur');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');

});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');

});









var animation = bodymovin.loadAnimation({

  container: document.getElementById('anim'),
  rederer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json'

});
