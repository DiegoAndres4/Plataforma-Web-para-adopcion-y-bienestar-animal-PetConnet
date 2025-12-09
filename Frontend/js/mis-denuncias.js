// APIs
const API_MIS_DENUNCIAS = "http://localhost:5054/api/denuncias/mis-denuncias";
const API_MIS_DENUNCIAS_ACTIVAS = "http://localhost:5054/api/denuncias/mis-denuncias/activas";

// Estado
let currentPage = 0;
let totalPages = 0;
let showOnlyActive = false;

// Toggle del menú de usuario
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const btn = document.querySelector('.user-menu-btn');
    if (dropdown && btn) {
        dropdown.classList.toggle('active');
        btn.classList.toggle('active');
    }
}

// Cerrar el menú si se hace clic fuera
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu-container');
    const dropdown = document.getElementById('userDropdown');
    if (userMenu && !userMenu.contains(event.target) && dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        document.querySelector('.user-menu-btn').classList.remove('active');
    }
});

// Función de logout
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

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacion();
    configurarTabs();
    cargarDenuncias();
});

function verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Debes iniciar sesión para ver tus denuncias');
        window.location.href = 'login.html';
        return;
    }
}

function configurarTabs() {
    const activosBtn = document.getElementById('activos-btn');
    const completoBtn = document.getElementById('completo-btn');
    
    if (activosBtn) {
        activosBtn.addEventListener('click', function() {
            showOnlyActive = false;
            activosBtn.classList.add('active');
            completoBtn.classList.remove('active');
            currentPage = 0;
            cargarDenuncias();
        });
    }
    
    if (completoBtn) {
        completoBtn.addEventListener('click', function() {
            showOnlyActive = true;
            completoBtn.classList.add('active');
            activosBtn.classList.remove('active');
            currentPage = 0;
            cargarDenuncias();
        });
    }
}

async function cargarDenuncias() {
    const token = localStorage.getItem('authToken');
    const container = document.getElementById('denuncias-container');
    
    if (!container) return;
    
    container.innerHTML = '<p>Cargando denuncias...</p>';
    
    try {
        const url = showOnlyActive 
            ? `${API_MIS_DENUNCIAS}?page=${currentPage}&size=9`
            : `${API_MIS_DENUNCIAS_ACTIVAS}?page=${currentPage}&size=9`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar denuncias');
        }
        
        const data = await response.json();
        totalPages = data.totalPages;
        
        if (data.content.length === 0) {
            container.innerHTML = '<p>No tienes denuncias registradas.</p>';
            return;
        }
        
        renderizarDenuncias(data.content);
        renderizarPaginacion();
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Error al cargar las denuncias. Por favor intenta nuevamente.</p>';
    }
}

function renderizarDenuncias(denuncias) {
    const container = document.getElementById('denuncias-container');
    container.innerHTML = '';
    
    denuncias.forEach(denuncia => {
        const card = crearTarjetaDenuncia(denuncia);
        container.appendChild(card);
    });
}

function crearTarjetaDenuncia(denuncia) {
    const div = document.createElement('div');
    div.className = 'denuncia-card';
    
    const estadoClass = obtenerClaseEstado(denuncia.estado);
    const estadoTexto = obtenerTextoEstado(denuncia.estado);
    const prioridadClass = obtenerClasePrioridad(denuncia.prioridad);
    const tipoTexto = denuncia.tipoReporte === 'MALTRATO_ANIMAL' ? 'Maltrato Animal' : 'Animal Perdido/Encontrado';
    const imagenPrincipal = denuncia.rutasEvidencias && denuncia.rutasEvidencias.length > 0 
        ? denuncia.rutasEvidencias[0] 
        : 'img/placeholder-denuncia.jpg';
    
    const fechaFormateada = formatearFecha(denuncia.fechaCreacion);
    const idFormateado = 'D-' + String(denuncia.id).padStart(5, '0');
    
    div.innerHTML = `
        <div class="denuncia-imagen">
            <img src="${imagenPrincipal}" alt="Evidencia">
            <span class="denuncia-badge ${estadoClass}">${estadoTexto}</span>
        </div>
        <div class="denuncia-info">
            <h3>${tipoTexto}</h3>
            <p class="denuncia-ubicacion">📍 ${denuncia.ubicacion}</p>
            <p class="denuncia-descripcion">${denuncia.descripcion.substring(0, 100)}${denuncia.descripcion.length > 100 ? '...' : ''}</p>
            <div class="denuncia-meta">
                <span class="denuncia-id">ID: ${idFormateado}</span>
                <span class="denuncia-fecha">${fechaFormateada}</span>
                <span class="denuncia-prioridad ${prioridadClass}">${denuncia.prioridad}</span>
            </div>
            <div class="denuncia-acciones">
                <button class="btn-ver" onclick="verDetalle(${denuncia.id})">Ver Detalles</button>
            </div>
        </div>
    `;
    
    return div;
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

function obtenerClasePrioridad(prioridad) {
    const prioridades = {
        'BAJA': 'prioridad-baja',
        'MEDIA': 'prioridad-media',
        'ALTA': 'prioridad-alta',
        'URGENTE': 'prioridad-urgente'
    };
    return prioridades[prioridad] || 'prioridad-media';
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function renderizarPaginacion() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '« Anterior';
    prevBtn.disabled = currentPage === 0;
    prevBtn.onclick = () => cambiarPagina(currentPage - 1);
    pagination.appendChild(prevBtn);
    
    // Números de página
    for (let i = 0; i < totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i + 1;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.onclick = () => cambiarPagina(i);
        pagination.appendChild(pageBtn);
    }
    
    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente »';
    nextBtn.disabled = currentPage === totalPages - 1;
    nextBtn.onclick = () => cambiarPagina(currentPage + 1);
    pagination.appendChild(nextBtn);
}

function cambiarPagina(newPage) {
    if (newPage < 0 || newPage >= totalPages) return;
    currentPage = newPage;
    cargarDenuncias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function verDetalle(id) {
    window.location.href = `detalle-denuncia.html?id=${id}`;
}