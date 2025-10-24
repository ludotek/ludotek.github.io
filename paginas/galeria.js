document.addEventListener('DOMContentLoaded', () => {
    // galeria.js - Renderiza la galería de cartas a partir de galeria.json
    const contenedor = document.getElementById('galeriaCartas');
    if (!contenedor) return;

    // Detectar ruta relativa para fetch
    let jsonPath = 'galeria.json';
    if (!window.location.pathname.endsWith('/paginas/galeria.html')) {
        jsonPath = 'paginas/galeria.json';
    }

    fetch(jsonPath)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = '';
            const grid = document.createElement('div');
            grid.className = 'cartas-grid';
            // Guardar referencias para navegación
            let grupos = data;
            grid.dataset.grupos = JSON.stringify(grupos);
            grupos.forEach((grupo, grupoIdx) => {
                // Por defecto mostrar la imagen 2 (índice 1)
                const carta = document.createElement('div');
                carta.className = 'carta-galeria';
                carta.setAttribute('data-id', grupo.id);
                if (grupo.imagenes && grupo.imagenes.length >= 3) {
                    const img = document.createElement('img');
                    img.src = grupo.imagenes[1];
                    img.alt = `Imagen ${grupo.id} - 2`;
                    img.className = 'carta-galeria-img';
                    img.tabIndex = 0;
                    // Evento para abrir modal: SIEMPRE inicia con la imagen 1 (índice 0)
                    img.addEventListener('click', () => openModal(grupoIdx, 0));
                    img.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') openModal(grupoIdx, 0);
                    });
                    carta.appendChild(img);
                }
                // Título del grupo
                if (grupo.titulo) {
                    const titulo = document.createElement('h3');
                    titulo.className = 'carta-galeria-titulo';
                    titulo.textContent = grupo.titulo;
                    carta.appendChild(titulo);
                }
                grid.appendChild(carta);
            });
            contenedor.appendChild(grid);

            // Modal único en el body
            if (!document.getElementById('modalGaleria')) {
                                    const modal = document.createElement('div');
                                    modal.id = 'modalGaleria';
                                    modal.className = 'modal-galeria';
                                    modal.style.display = 'none';
                                    modal.innerHTML = `
                                        <div class="modal-galeria-img-container">
                                            <img id="modalGaleriaImg" src="" alt="Imagen ampliada" />
                                            <div class="modal-galeria-img-container-buttons">
                                                <button id="modalImgPrev" class="modal-galeria-arrow-img" aria-label="Anterior imagen">&#8592;</button>
                                                <button id="modalImgNext" class="modal-galeria-arrow-img" aria-label="Siguiente imagen">&#8594;</button>
                                            </div>
                                        </div>
                                        <div class="modal-galeria-arrows-container">
                                            <button id="modalGrupoPrev" class="modal-galeria-arrow-grupo" aria-label="Contenedor anterior">&#8678;</button>
                                            <button id="modalGrupoNext" class="modal-galeria-arrow-grupo" aria-label="Contenedor siguiente">&#8680;</button>
                                        </div>
                                        <button id="modalGaleriaClose" class="modal-galeria-close" aria-label="Cerrar">×</button>
                                    `;
                                    document.body.appendChild(modal);
            }

            // Lógica de navegación y eventos del modal
            let currentGrupo = 0;
            let currentImg = 0;
            const modal = document.getElementById('modalGaleria');
            const modalImg = document.getElementById('modalGaleriaImg');
            const btnImgPrev = document.getElementById('modalImgPrev');
            const btnImgNext = document.getElementById('modalImgNext');
            const btnGrupoPrev = document.getElementById('modalGrupoPrev');
            const btnGrupoNext = document.getElementById('modalGrupoNext');
            const btnClose = document.getElementById('modalGaleriaClose');

            function renderModal() {
                const grupo = grupos[currentGrupo];
                modalImg.src = grupo.imagenes[currentImg];
                // Asegurar que la X esté siempre visible
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.zIndex = '9999';
                btnClose.style.position = 'fixed';
                btnClose.style.top = '1.5rem';
                btnClose.style.right = '1.5rem';
                btnClose.style.zIndex = '10001';
            }
            function openModal(grupoIdx, imgIdx) {
                currentGrupo = grupoIdx;
                currentImg = imgIdx; // Mostrar la imagen clickeada
                renderModal();
                modal.style.display = 'flex';
                modal.focus();
                document.body.classList.add('modal-open');
            }
            function closeModal() {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
            function showImgPrev() {
                const grupo = grupos[currentGrupo];
                currentImg = (currentImg - 1 + grupo.imagenes.length) % grupo.imagenes.length;
                renderModal();
            }
            function showImgNext() {
                const grupo = grupos[currentGrupo];
                currentImg = (currentImg + 1) % grupo.imagenes.length;
                renderModal();
            }
            function showGrupoPrev() {
                currentGrupo = (currentGrupo - 1 + grupos.length) % grupos.length;
                currentImg = 0;
                renderModal();
            }
            function showGrupoNext() {
                currentGrupo = (currentGrupo + 1) % grupos.length;
                currentImg = 0;
                renderModal();
            }
            btnImgPrev.onclick = showImgPrev;
            btnImgNext.onclick = showImgNext;
            btnGrupoPrev.onclick = showGrupoPrev;
            btnGrupoNext.onclick = showGrupoNext;
            btnClose.onclick = closeModal;
            modal.onclick = (e) => { if (e.target === modal) closeModal(); };
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'flex') {
                    if (e.key === 'Escape') closeModal();
                    if (e.key === 'ArrowLeft') showImgPrev();
                    if (e.key === 'ArrowRight') showImgNext();
                    if (e.key === 'ArrowUp') showGrupoPrev();
                    if (e.key === 'ArrowDown') showGrupoNext();
                }
            });
        })
        .catch(err => {
            contenedor.innerHTML = '<p style="color:red">No se pudo cargar la galería.</p>';
            console.error('Error cargando galeria.json:', err);
        });
});
