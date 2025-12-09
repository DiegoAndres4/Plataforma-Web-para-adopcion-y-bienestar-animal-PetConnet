// APIs
const API_DENUNCIAS = "http://localhost:5054/api/denuncias";
const API_FILES = "http://localhost:5054/api/files/upload";

// Estado global
let evidenciasSubidas = [];

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

// Cargar datos del usuario si está logueado
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosUsuario();
    configurarFormulario();
});

function cargarDatosUsuario() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) {
        const nombreInput = document.querySelector('input[placeholder="Nombre Completo"]');
        if (nombreInput) nombreInput.value = userName;
    }
    
    if (userEmail) {
        const emailInput = document.querySelector('input[placeholder="Correo Electrónico"]');
        if (emailInput) emailInput.value = userEmail;
    }
}

function configurarFormulario() {
    const form = document.querySelector('form');
    const fileInput = document.querySelector('input[type="file"]');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (form) {
        form.addEventListener('submit', handleSubmitDenuncia);
    }
}

async function handleFileUpload(event) {
    const files = event.target.files;
    
    if (files.length > 3) {
        alert('Solo puedes subir hasta 3 archivos');
        event.target.value = '';
        return;
    }
    
    evidenciasSubidas = [];
    
    for (let i = 0; i < files.length; i++) {
        try {
            const formData = new FormData();
            formData.append('file', files[i]);
            
            const response = await fetch(API_FILES, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Error al subir archivo');
            }
            
            const fileUrl = await response.text();
            evidenciasSubidas.push(fileUrl);
            
        } catch (error) {
            console.error('Error subiendo archivo:', error);
            alert('Error al subir archivo: ' + files[i].name);
        }
    }
    
    if (evidenciasSubidas.length > 0) {
        alert(`${evidenciasSubidas.length} archivo(s) subido(s) correctamente`);
    }
}

async function handleSubmitDenuncia(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const tipoReporte = document.querySelector('input[name="tipo"]:checked');
    const ubicacion = document.querySelector('input[placeholder="Usar mi ubicación actual"]');
    const descripcion = document.querySelector('textarea[placeholder="Describe la situación, tipo de animal, etc."]');
    const nombreContacto = document.querySelector('input[placeholder="Nombre Completo"]');
    const emailContacto = document.querySelector('input[placeholder="Correo Electrónico"]');
    const telefonoContacto = document.querySelector('input[placeholder="Teléfono de Contacto"]');
    const esAnonimo = document.querySelector('#anonimo');
    
    // Validaciones
    if (!tipoReporte) {
        alert('Por favor selecciona el tipo de reporte');
        return;
    }
    
    if (!ubicacion.value.trim()) {
        alert('Por favor ingresa la ubicación');
        return;
    }
    
    if (!descripcion.value.trim()) {
        alert('Por favor describe la situación');
        return;
    }
    
    if (!esAnonimo.checked) {
        if (!nombreContacto.value.trim() || !emailContacto.value.trim() || !telefonoContacto.value.trim()) {
            alert('Por favor completa todos los datos de contacto o marca como anónimo');
            return;
        }
    }
    
    // Construir objeto de denuncia
    const denunciaData = {
        tipoReporte: tipoReporte.value === 'maltrato' ? 'MALTRATO_ANIMAL' : 'ANIMAL_PERDIDO_ENCONTRADO',
        ubicacion: ubicacion.value.trim(),
        descripcion: descripcion.value.trim(),
        nombreContacto: esAnonimo.checked ? 'Anónimo' : nombreContacto.value.trim(),
        emailContacto: esAnonimo.checked ? null : emailContacto.value.trim(),
        telefonoContacto: esAnonimo.checked ? null : telefonoContacto.value.trim(),
        esAnonimo: esAnonimo.checked,
        rutasEvidencias: evidenciasSubidas
    };
    
    try {
        const token = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(API_DENUNCIAS, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(denunciaData)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear denuncia');
        }
        
        const data = await response.json();
        console.log('Denuncia creada:', data);
        
        alert('¡Denuncia creada exitosamente! ID: D-' + String(data.id).padStart(5, '0'));
        
        // Limpiar formulario
        event.target.reset();
        evidenciasSubidas = [];
        
        // Redirigir a mis denuncias si está logueado
        if (token) {
            window.location.href = 'mis-denuncias.html';
        }
        
    } catch (error) {
        console.error('Error al crear denuncia:', error);
        alert('Error al crear la denuncia. Por favor intenta nuevamente.');
    }
}