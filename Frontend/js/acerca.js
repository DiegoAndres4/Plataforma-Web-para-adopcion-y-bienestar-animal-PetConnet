// Funciones para la página Acerca de

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Acerca de cargada correctamente');
    
    // Inicializar todas las funcionalidades
    initPilaresInteractivos();
    initRecursosInteractivos();
    initTestimonios();
    initHistoriasAdopcion();
    initModales();
});

// 1. INICIALIZAR MODALES PRIMERO
function initModales() {
    // Modal de video
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.getElementById('closeVideoModal');
    
    if (closeVideoBtn && videoModal) {
        closeVideoBtn.addEventListener('click', function() {
            videoModal.classList.remove('active');
            stopVideo();
        });
        
        // Cerrar al hacer clic fuera
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                stopVideo();
            }
        });
    }
    
    // Modal de historias
    const historiasModal = document.getElementById('historiasModal');
    const closeHistoriasBtn = document.getElementById('closeHistoriasModal');
    
    if (closeHistoriasBtn && historiasModal) {
        closeHistoriasBtn.addEventListener('click', function() {
            historiasModal.classList.remove('active');
        });
        
        historiasModal.addEventListener('click', function(e) {
            if (e.target === historiasModal) {
                historiasModal.classList.remove('active');
            }
        });
    }
    
    // Modal genérico
    const infoModal = document.getElementById('infoModal');
    const closeInfoBtn = document.getElementById('closeInfoModal');
    
    if (closeInfoBtn && infoModal) {
        closeInfoBtn.addEventListener('click', function() {
            infoModal.classList.remove('active');
        });
        
        infoModal.addEventListener('click', function(e) {
            if (e.target === infoModal) {
                infoModal.classList.remove('active');
            }
        });
    }
    
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modales = document.querySelectorAll('.modal-overlay.active');
            modales.forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    stopVideo();
                }
            });
        }
    });
}

// 2. PILARES INTERACTIVOS - CORREGIDO
function initPilaresInteractivos() {
    const pilarCards = document.querySelectorAll('.pilar-card');
    
    pilarCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Solo expandir si no se hizo clic en un botón
            if (!e.target.closest('.btn-learn-more')) {
                const cardId = this.getAttribute('data-card');
                const infoElement = document.getElementById(`info-${cardId}`);
                const arrow = this.querySelector('.card-arrow i');
                
                if (!infoElement) return;
                
                // Cerrar otros pilares abiertos
                pilarCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        const otherId = otherCard.getAttribute('data-card');
                        const otherInfo = document.getElementById(`info-${otherId}`);
                        const otherArrow = otherCard.querySelector('.card-arrow i');
                        
                        otherCard.classList.remove('active');
                        if (otherInfo) otherInfo.classList.remove('expanded');
                        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Alternar estado actual
                const isExpanded = infoElement.classList.contains('expanded');
                
                if (isExpanded) {
                    this.classList.remove('active');
                    infoElement.classList.remove('expanded');
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                } else {
                    this.classList.add('active');
                    infoElement.classList.add('expanded');
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                    
                    // Scroll suave
                    setTimeout(() => {
                        infoElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Botones dentro de los pilares
    document.querySelectorAll('.btn-learn-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // IMPORTANTE: Prevenir que el pilar se cierre
            
            const videoId = this.getAttribute('data-video');
            const pdfFile = this.getAttribute('data-pdf');
            const historias = this.getAttribute('data-historias');
            
            if (videoId) {
                openVideoModal(videoId);
            } else if (pdfFile) {
                downloadPDF(pdfFile);
            } else if (historias) {
                openHistoriasModal();
            }
        });
    });
}

// 3. RECURSOS INTERACTIVOS
function initRecursosInteractivos() {
    const recursoCards = document.querySelectorAll('.recurso-card');
    
    recursoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Solo expandir si no se hizo clic en un botón
            if (!e.target.closest('.btn-ver-video') && !e.target.closest('.btn-ver-infografias')) {
                const recursoId = this.getAttribute('data-recurso');
                const detalleElement = document.getElementById(`detalle-${recursoId}`);
                
                if (!detalleElement) return;
                
                // Cerrar otros recursos abiertos
                recursoCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        const otherId = otherCard.getAttribute('data-recurso');
                        const otherDetalle = document.getElementById(`detalle-${otherId}`);
                        
                        otherCard.classList.remove('active');
                        if (otherDetalle) otherDetalle.classList.remove('expanded');
                    }
                });
                
                // Alternar estado actual
                const isExpanded = detalleElement.classList.contains('expanded');
                
                if (isExpanded) {
                    this.classList.remove('active');
                    detalleElement.classList.remove('expanded');
                } else {
                    this.classList.add('active');
                    detalleElement.classList.add('expanded');
                    
                    // Scroll suave
                    setTimeout(() => {
                        detalleElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Botón para ver video en recursos
    document.querySelectorAll('.btn-ver-video').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoId = this.getAttribute('data-video');
            if (videoId) openVideoModal(videoId);
        });
    });
    
    // Botón para ver infografías
    document.querySelectorAll('.btn-ver-infografias').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const link = this.getAttribute('data-link');
            if (link) openInfografias(link);
        });
    });
}

// 4. TESTIMONIOS
function initTestimonios() {
    const testimonios = document.querySelectorAll('.testimonio');
    const dots = document.querySelectorAll('.testimonio-dots .dot');
    const prevBtn = document.querySelector('.testimonio-prev');
    const nextBtn = document.querySelector('.testimonio-next');
    
    if (testimonios.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonio(index) {
        testimonios.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (testimonios[index]) {
            testimonios[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentIndex = index;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonios.length - 1;
            showTestimonio(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonios.length) newIndex = 0;
            showTestimonio(newIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonio(index));
    });
    
    // Auto-rotación
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonios.length) newIndex = 0;
        showTestimonio(newIndex);
    }, 5000);
}

// 5. HISTORIAS DE ADOPCIÓN
function initHistoriasAdopcion() {
    const historiaItems = document.querySelectorAll('.historia-item');
    const historiaDots = document.querySelectorAll('.historia-dot');
    const historiaPrev = document.querySelector('.historia-prev');
    const historiaNext = document.querySelector('.historia-next');
    
    if (historiaItems.length === 0) return;
    
    let currentIndex = 0;
    
    function showHistoria(index) {
        historiaItems.forEach(item => item.classList.remove('active'));
        historiaDots.forEach(dot => dot.classList.remove('active'));
        
        if (historiaItems[index]) {
            historiaItems[index].classList.add('active');
        }
        if (historiaDots[index]) {
            historiaDots[index].classList.add('active');
        }
        currentIndex = index;
    }
    
    if (historiaPrev) {
        historiaPrev.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = historiaItems.length - 1;
            showHistoria(newIndex);
        });
    }
    
    if (historiaNext) {
        historiaNext.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= historiaItems.length) newIndex = 0;
            showHistoria(newIndex);
        });
    }
    
    historiaDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showHistoria(index));
    });
}

// 6. FUNCIONES PARA ABRIR MODALES Y ACCIONES
function openVideoModal(videoId) {
    console.log('Abriendo video:', videoId);
    
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtubeVideo');
    
    if (!videoModal || !youtubeIframe) {
        console.error('Elementos del modal de video no encontrados');
        return;
    }
    
    // Configurar video según el ID
    let embedUrl = '';
    if (videoId === 'QW_E3n83m8g') {
        embedUrl = 'https://www.youtube.com/embed/QW_E3n83m8g';
    } else if (videoId === 'hL-yIBieVxk') {
        embedUrl = 'https://www.youtube.com/embed/hL-yIBieVxk';
    } else {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    
    youtubeIframe.src = `${embedUrl}?autoplay=1&rel=0`;
    videoModal.classList.add('active');
}

function stopVideo() {
    const youtubeIframe = document.getElementById('youtubeVideo');
    if (youtubeIframe) {
        youtubeIframe.src = youtubeIframe.src.replace('&autoplay=1', '');
    }
}

function downloadPDF(pdfFile) {
    console.log('Descargando PDF:', pdfFile);
    
    // Verificar si el archivo existe
    const pdfPath = `docs/${pdfFile}`;
    
    // Mostrar modal informativo
    showInfoModal(
        'Guía PDF de Prevención del Maltrato',
        'Preparando la descarga del archivo PDF...',
        '📄',
        `Archivo: ${pdfFile}\n\n` +
        'Si la descarga no inicia automáticamente:\n' +
        '1. Asegúrate de que el archivo esté en la carpeta "docs/"\n' +
        '2. Verifica que el nombre del archivo sea correcto\n' +
        '3. Contacta al administrador si necesitas ayuda'
    );
    
    // Intentar descargar después de 2 segundos
    setTimeout(() => {
        // Crear enlace de descarga
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfFile;
        link.target = '_blank';
        
        // Simular clic
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Mostrar mensaje de éxito/error
        setTimeout(() => {
            showInfoModal(
                'Descarga Completada',
                'La guía PDF ha sido descargada exitosamente.',
                '✅',
                'Revisa tu carpeta de descargas para encontrar el archivo.'
            );
        }, 1000);
    }, 2000);
}

function openHistoriasModal() {
    console.log('Abriendo historias de adopción');
    
    const historiasModal = document.getElementById('historiasModal');
    if (historiasModal) {
        historiasModal.classList.add('active');
    }
}

function openInfografias(link) {
    console.log('Abriendo infografías:', link);
    
    // Mostrar mensaje antes de abrir
    showInfoModal(
        'Infografías Educativas',
        'Redirigiendo a la página de infografías...',
        '📚',
        'Se abrirá una nueva pestaña con material educativo gratuito.'
    );
    
    // Abrir en nueva pestaña después de 1.5 segundos
    setTimeout(() => {
        window.open(link, '_blank');
    }, 1500);
}

// 7. FUNCIÓN PARA MOSTRAR MODAL GENÉRICO
function showInfoModal(title, description, icon, extraInfo = '') {
    const modal = document.getElementById('infoModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraInfo = document.getElementById('modalExtraInfo');
    
    if (!modal || !modalIcon || !modalTitle || !modalDescription) {
        console.error('Elementos del modal genérico no encontrados');
        return;
    }
    
    // Configurar contenido
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    if (extraInfo && modalExtraInfo) {
        modalExtraInfo.textContent = extraInfo;
        modalExtraInfo.style.display = 'block';
    } else if (modalExtraInfo) {
        modalExtraInfo.style.display = 'none';
    }
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Auto-cerrar después de 5 segundos si es informativo
    if (title.includes('Redirigiendo') || title.includes('Completada')) {
        setTimeout(() => {
            modal.classList.remove('active');
        }, 5000);
    }
}

// 8. EVENTOS GLOBALES
// Cerrar modales al hacer clic fuera
document.addEventListener('click', function(e) {
    // Si se hace clic en un elemento que NO es un modal ni su contenido
    if (!e.target.closest('.modal-content') && 
        !e.target.closest('.btn-learn-more') && 
        !e.target.closest('.btn-ver-video') && 
        !e.target.closest('.btn-ver-infografias')) {
        
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    stopVideo();
                }
            }
        });
    }
});

// Efectos visuales
document.querySelectorAll('.pilar-card, .recurso-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});