// ======== FUNCIONALIDAD PARA MIS PUBLICACIONES ========

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== BÚSQUEDA =====
    const buscarInput = document.getElementById('buscarPublicacion');
    const publicaciones = document.querySelectorAll('.publicacion-card');

    if (buscarInput) {
        buscarInput.addEventListener('input', function() {
            const termino = this.value.toLowerCase();
            
            publicaciones.forEach(card => {
                const nombre = card.querySelector('h4').textContent.toLowerCase();
                if (nombre.includes(termino)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            verificarEstadoVacio();
        });
    }

    // ===== FILTRO POR ESTADO =====
    const filtroEstado = document.getElementById('filtroEstado');

    if (filtroEstado) {
        filtroEstado.addEventListener('change', function() {
            const estado = this.value;
            
            publicaciones.forEach(card => {
                const cardEstado = card.getAttribute('data-estado');
                
                if (estado === 'todas' || cardEstado === estado.replace('s', '')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            verificarEstadoVacio();
        });
    }

    // ===== VERIFICAR ESTADO VACÍO =====
    function verificarEstadoVacio() {
        const publicacionesVisibles = document.querySelectorAll('.publicacion-card[style="display: flex;"], .publicacion-card:not([style])');
        const emptyState = document.getElementById('emptyState');
        
        let hayVisibles = false;
        publicaciones.forEach(card => {
            if (card.style.display !== 'none') {
                hayVisibles = true;
            }
        });

        if (emptyState) {
            emptyState.style.display = hayVisibles ? 'none' : 'block';
        }
    }

    // ===== MODAL DE ELIMINAR =====
    const modal = document.getElementById('modalEliminar');
    const btnCancelarModal = document.getElementById('btnCancelarModal');
    const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
    const nombreMascota = document.getElementById('nombreMascota');
    let publicacionAEliminar = null;

    // Abrir modal al hacer clic en eliminar
    document.querySelectorAll('.btn-accion.eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.publicacion-card');
            const nombre = card.querySelector('h4').textContent;
            
            publicacionAEliminar = card;
            nombreMascota.textContent = nombre;
            modal.style.display = 'flex';
        });
    });

    // Cerrar modal
    if (btnCancelarModal) {
        btnCancelarModal.addEventListener('click', function() {
            modal.style.display = 'none';
            publicacionAEliminar = null;
        });
    }

    // Confirmar eliminación
    if (btnConfirmarEliminar) {
        btnConfirmarEliminar.addEventListener('click', function() {
            if (publicacionAEliminar) {
                publicacionAEliminar.style.animation = 'fadeOut 0.3s ease forwards';
                
                setTimeout(() => {
                    publicacionAEliminar.remove();
                    modal.style.display = 'none';
                    publicacionAEliminar = null;
                    verificarEstadoVacio();
                    actualizarEstadisticas();
                }, 300);
            }
        });
    }

    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                publicacionAEliminar = null;
            }
        });
    }

    // ===== BOTONES DE ACCIÓN =====
    
    // Editar
    document.querySelectorAll('.btn-accion.editar').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.publicacion-card');
            const nombre = card.querySelector('h4').textContent;
            // Redirigir a edición (por ahora solo alerta)
            alert(`Editando publicación de: ${nombre}`);
            // window.location.href = `editar-publicacion.html?id=${id}`;
        });
    });

    // Pausar
    document.querySelectorAll('.btn-accion.pausar').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.publicacion-card');
            const estadoSpan = card.querySelector('.publicacion-estado');
            
            if (estadoSpan.classList.contains('activa')) {
                estadoSpan.classList.remove('activa');
                estadoSpan.classList.add('pausada');
                estadoSpan.textContent = 'Pausada';
                this.querySelector('.btn-icon').textContent = '▶️';
                this.querySelector('.btn-text').textContent = 'Reactivar';
                card.setAttribute('data-estado', 'pausada');
            } else {
                estadoSpan.classList.remove('pausada');
                estadoSpan.classList.add('activa');
                estadoSpan.textContent = 'Activa';
                this.querySelector('.btn-icon').textContent = '⏸️';
                this.querySelector('.btn-text').textContent = 'Pausar';
                card.setAttribute('data-estado', 'activa');
            }
        });
    });

    // Ver interesados
    document.querySelectorAll('.btn-accion.ver-interesados').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.publicacion-card');
            const nombre = card.querySelector('h4').textContent;
            alert(`Viendo interesados en adoptar a: ${nombre}`);
            // window.location.href = `interesados.html?mascota=${id}`;
        });
    });

    // ===== ACTUALIZAR ESTADÍSTICAS =====
    function actualizarEstadisticas() {
        const total = document.querySelectorAll('.publicacion-card').length;
        const activas = document.querySelectorAll('.publicacion-card[data-estado="activa"]').length;
        const revision = document.querySelectorAll('.publicacion-card[data-estado="revision"]').length;
        const adoptadas = document.querySelectorAll('.publicacion-card[data-estado="adoptada"]').length;

        // Actualizar números en la barra de stats
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = total;
            statNumbers[1].textContent = activas;
            statNumbers[2].textContent = revision;
            statNumbers[3].textContent = adoptadas;
        }
    }

});

// Animación para eliminar
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);