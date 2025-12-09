// API
const API_DENUNCIAS = "http://localhost:5054/api/denuncias";

// Cargar detalle al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarDetalleDenuncia();
});

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRoles');
        alert('Sesión cerrada exitosamente');
        window.location.href = 'index.html';
    }
    return false;
}

async function cargarDetalleDenuncia() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        alert('ID de denuncia no especificado');
        window.location.href = 'mis-denuncias.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_DENUNCIAS}/${id}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar denuncia');
        }
        
        const denuncia = await response.json();
        renderizarDetalle(denuncia);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los detalles de la denuncia');
        window.location.href = 'mis-denuncias.html';
    }
}

function renderizarDetalle(denuncia) {
    const idFormateado = 'D-' + String(denuncia.id).padStart(5, '0');
    const tipoTexto = denuncia.tipoReporte === 'MALTRATO_ANIMAL' ? 'Maltrato Animal' : 'Animal Perdido/Encontrado';
    const fechaFormateada = formatearFecha(denuncia.fechaCreacion);
    const estadoTexto = obtenerTextoEstado(denuncia.estado);
    const estadoClass = obtenerClaseEstado(denuncia.estado);
    
    // Título
    const titleElement = document.querySelector('.detalle-denuncia-title h1');
    if (titleElement) {
        titleElement.textContent = `${tipoTexto} en ${denuncia.ubicacion}`;
    }
    
    // Estado
    const estadoElement = document.querySelector('.detalle-denuncia-estado');
    if (estadoElement) {
        estadoElement.className = `detalle-denuncia-estado ${estadoClass}`;
        estadoElement.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${estadoTexto}`;
    }
    
    // Metadata
    document.querySelector('.detalle-denuncia-meta').innerHTML = `
        <div class="detalle-denuncia-meta-row">
            <i class="fa-solid fa-hashtag"></i>
            <span><strong>ID:</strong> ${idFormateado}</span>
        </div>
        <div class="detalle-denuncia-meta-row">
            <i class="fa-solid fa-calendar"></i>
            <span><strong>Fecha de creación:</strong> ${fechaFormateada}</span>
        </div>
        <div class="detalle-denuncia-meta-row">
            <i class="fa-solid fa-tag"></i>
            <span><strong>Tipo:</strong> ${tipoTexto}</span>
        </div>
        <div class="detalle-denuncia-meta-row">
            <i class="fa-solid fa-bolt"></i>
            <span><strong>Prioridad:</strong> ${denuncia.prioridad}</span>
        </div>
    `;
    
    // Ubicación
    const ubicacionList = document.querySelector('.detalle-info-block ul');
    if (ubicacionList) {
        ubicacionList.innerHTML = `
            <li>
                <i class="fa-solid fa-location-dot"></i>
                <span><strong>Dirección:</strong> ${denuncia.ubicacion}</span>
            </li>
            <li>
                <i class="fa-solid fa-clock"></i>
                <span><strong>Fecha / Hora aproximada:</strong> ${fechaFormateada}</span>
            </li>
        `;
    }
    
    // Descripción
    const descripcionP = document.querySelector('.detalle-info-block p');
    if (descripcionP) {
        descripcionP.textContent = denuncia.descripcion;
    }
    
    // Evidencias
    if (denuncia.rutasEvidencias && denuncia.rutasEvidencias.length > 0) {
        const evidenciasGrid = document.querySelector('.detalle-evidencias-grid');
        if (evidenciasGrid) {
            evidenciasGrid.innerHTML = '';
            denuncia.rutasEvidencias.forEach((url, index) => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Evidencia ${index + 1}`;
                evidenciasGrid.appendChild(img);
            });
        }
    }
    
    // Historial
    if (denuncia.historialEstados && denuncia.historialEstados.length > 0) {
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.innerHTML = '';
            denuncia.historialEstados.forEach(item => {
                const fechaHist = formatearFechaHora(item.fecha);
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.innerHTML = `
                    <span class="timeline-dot"></span>
                    <div class="timeline-item-title">${item.titulo}</div>
                    <div class="timeline-item-time">${fechaHist}</div>
                    <div class="timeline-item-desc">${item.descripcion}</div>
                `;
                timeline.appendChild(timelineItem);
            });
        }
    }
}

function obtenerClaseEstado(estado) {
    const estados = {
        'REVISION': 'revision',
        'ASIGNADA': 'asignada',
        'EN_CURSO': 'en-curso',
        'RESUELTA': 'resuelta',
        'CANCELADA': 'cancelada'
    };
    return estados[estado] || 'revision';
}

function obtenerTextoEstado(estado) {
    const textos = {
        'REVISION': 'En Revisión',
        'ASIGNADA': 'Asignada',
        'EN_CURSO': 'En Curso',
        'RESUELTA': 'Resuelta',
        'CANCELADA': 'Cancelada'
    };
    return textos[estado] || estado;
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function formatearFechaHora(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${año} - ${hora}:${minuto}`;
}

function cancelDenunciaDetalle(id) {
    if (confirm(`¿Quieres solicitar la cancelación de la denuncia ${id}?`)) {
        alert(`Funcionalidad de cancelación para ${id} (por implementar en el backend)`);
    }
}