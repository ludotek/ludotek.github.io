// Nueva galería dinámica desde galeria.json
document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  let galleryData = [];
  let currentIndex = 0;

  // Cargar JSON de galería
  fetch('paginas/galeria.json')
    .then(res => res.json())
    .then(data => {
      galleryData = data;
      galleryGrid.innerHTML = '';
      data.forEach((img, i) => {
        const figure = document.createElement('figure');
        figure.className = 'gallery-item';
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.name;
        image.tabIndex = 0;
        image.setAttribute('data-index', i);
        const caption = document.createElement('figcaption');
        caption.textContent = img.name;
        figure.appendChild(image);
        figure.appendChild(caption);
        galleryGrid.appendChild(figure);
      });
      addGalleryListeners();
    });

  function addGalleryListeners() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
    galleryItems.forEach((img, i) => {
      img.addEventListener('click', () => openModal(i));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openModal(i);
      });
    });
  }

  function openModal(index) {
    currentIndex = index;
    const img = galleryData[index];
    modalImg.src = img.src;
    modalImg.alt = img.name;
    modalCaption.textContent = img.name;
    modal.style.display = 'flex';
    modal.focus();
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    openModal(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    openModal(currentIndex);
  }

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', showPrev);
  modalNext.addEventListener('click', showNext);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }
  });
});
// --- MENÚ RESPONSIVE: Submenú Fases en móvil ---
document.addEventListener('DOMContentLoaded', function () {
    // Menú móvil toggle
    var hamburger = document.getElementById('hambur');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            var expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('active');
        });
    }

    // Submenú Fases en móvil
    var mobileDropdown = document.querySelector('.mobile-dropdown > a');
    var mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
    if (mobileDropdown && mobileDropdownMenu) {
        mobileDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            mobileDropdownMenu.style.display = (mobileDropdownMenu.style.display === 'block') ? 'none' : 'block';
        });
    }
    // Cerrar submenú al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (mobileDropdown && mobileDropdownMenu && !mobileDropdown.contains(e.target) && !mobileDropdownMenu.contains(e.target)) {
            mobileDropdownMenu.style.display = 'none';
        }
    });
});
// var imagenes = ["/filminas/chim.png", "/filminas/chim2.png"];
// cargarImagenes(imagenes); // Eliminado porque la función no existe































// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault();
// }, false);


// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });









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







document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hambur');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
  }
});
