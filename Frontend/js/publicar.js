// ============================================
// PUBLICAR.JS - Sistema de Publicación de Mascotas
// ============================================

console.log("🚀 Script publicar.js cargado correctamente");

// ============================================
// VARIABLES GLOBALES
// ============================================
let fotosSubidas = []; // URLs de Cloudinary
let archivosSeleccionados = []; // Archivos locales

// ============================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM cargado, inicializando...");
    
    // Inicializar tabs
    initTabs();
    
    // Inicializar upload de fotos
    initUploadFotos();
    
    // Inicializar contador de caracteres
    initContadorCaracteres();
    
    // Inicializar botón cancelar
    initBotonCancelar();
    
    // Inicializar formulario
    initFormulario();
});

// ============================================
// INICIALIZAR TABS
// ============================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar el seleccionado
            btn.classList.add('active');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
}

// Función global para cambiar tabs
window.cambiarTab = function(tabId) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
};

// ============================================
// INICIALIZAR UPLOAD DE FOTOS
// ============================================
function initUploadFotos() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');

    if (!uploadArea || !fileInput || !previewContainer) {
        console.error("❌ No se encontraron elementos de upload");
        return;
    }

    console.log("📸 Sistema de upload inicializado");

    // Click en el área de upload (CON PREVENCIÓN DE DOBLE APERTURA)
    uploadArea.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("🖱️ Click en área de upload");
        fileInput.click();
    });

    // Prevenir que el input abra automáticamente
    fileInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Drag and Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        manejarArchivos(files);
    });

    // Selección de archivos
    fileInput.addEventListener('change', (e) => {
        e.stopPropagation();
        const files = Array.from(e.target.files);
        console.log("📁 Archivos seleccionados:", files.length);
        
        if (files.length > 0) {
            manejarArchivos(files);
        }
        
        // Limpiar el input
        e.target.value = '';
    });
}

// ============================================
// MANEJO DE ARCHIVOS
// ============================================
function manejarArchivos(files) {
    console.log("📦 Procesando archivos:", files);
    
    // Validar máximo 5 fotos
    if (archivosSeleccionados.length + files.length > 5) {
        mostrarAlerta('Solo puedes subir un máximo de 5 fotos', 'warning');
        return;
    }

    // Validar tipo y tamaño
    const archivosValidos = files.filter(file => {
        const esImagen = file.type.startsWith('image/');
        const tamanoOk = file.size <= 5 * 1024 * 1024; // 5MB

        if (!esImagen) {
            mostrarAlerta(`${file.name} no es una imagen`, 'error');
            return false;
        }
        if (!tamanoOk) {
            mostrarAlerta(`${file.name} es muy grande (máx 5MB)`, 'error');
            return false;
        }
        return true;
    });

    archivosSeleccionados.push(...archivosValidos);
    mostrarPrevisualizaciones();
}

// ============================================
// PREVISUALIZACIONES
// ============================================
function mostrarPrevisualizaciones() {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    
    archivosSeleccionados.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button type="button" class="preview-remove" onclick="eliminarFoto(${index})">×</button>
                ${index === 0 ? '<span class="preview-badge">Principal</span>' : ''}
            `;
            previewContainer.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    });

    // Mostrar/ocultar área de upload
    const uploadArea = document.getElementById('uploadArea');
    if (archivosSeleccionados.length >= 5) {
        uploadArea.style.display = 'none';
    } else {
        uploadArea.style.display = 'flex';
    }
}

// Eliminar foto (función global)
window.eliminarFoto = function(index) {
    console.log("🗑️ Eliminando foto:", index);
    archivosSeleccionados.splice(index, 1);
    fotosSubidas.splice(index, 1);
    mostrarPrevisualizaciones();
};

// ============================================
// CONTADOR DE CARACTERES
// ============================================
function initContadorCaracteres() {
    const descripcion = document.getElementById('descripcion');
    const charCount = document.getElementById('charCount');

    if (descripcion && charCount) {
        descripcion.addEventListener('input', () => {
            const length = descripcion.value.length;
            charCount.textContent = length;
            
            if (length > 500) {
                descripcion.value = descripcion.value.substring(0, 500);
                charCount.textContent = 500;
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = '#999';
            }
        });
    }
}

// ============================================
// BOTÓN CANCELAR
// ============================================
function initBotonCancelar() {
    const btnCancelar = document.getElementById('btnCancelar');
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de cancelar? Se perderán todos los datos.')) {
                window.location.href = 'mis-publicaciones.html';
            }
        });
    }
}

// ============================================
// INICIALIZAR FORMULARIO
// ============================================
function initFormulario() {
    const formPublicar = document.getElementById('formPublicar');
    
    if (!formPublicar) {
        console.error("❌ No se encontró el formulario");
        return;
    }

    console.log("✅ Event listener agregado al formulario");
    
    formPublicar.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("🎯 SUBMIT ACTIVADO - Iniciando publicación");

        // Validar que haya al menos una foto
        if (archivosSeleccionados.length === 0) {
            mostrarAlerta('Debes subir al menos una foto', 'error');
            return;
        }

        // Deshabilitar botón de envío
        const btnSubmit = formPublicar.querySelector('.btn-publicar');
        const textoOriginal = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="spinner"></span> Publicando...';

        try {
            // PASO 1: Subir fotos a Cloudinary
            console.log("📤 PASO 1: Subiendo fotos a Cloudinary...");
            await subirFotosCloudinary();

            if (fotosSubidas.length === 0) {
                throw new Error('No se pudo subir ninguna foto');
            }

            console.log("✅ Fotos subidas exitosamente:", fotosSubidas);

            // PASO 2: Recopilar datos del formulario
            console.log("📝 PASO 2: Recopilando datos del formulario...");
            const datosFormulario = obtenerDatosFormulario();
            console.log("📋 Datos del formulario:", datosFormulario);

            // PASO 3: Publicar en la API
            console.log("🚀 PASO 3: Enviando a API de adopciones...");
            await publicarMascota(datosFormulario);

            // ÉXITO
            console.log("✅ MASCOTA PUBLICADA EXITOSAMENTE");
            mostrarAlerta('¡Mascota publicada exitosamente! 🎉', 'success');
            
            setTimeout(() => {
                window.location.href = 'mis-publicaciones.html';
            }, 2000);

        } catch (error) {
            console.error("💥 ERROR EN PUBLICACIÓN:", error);
            mostrarAlerta(error.message || 'Error al publicar la mascota', 'error');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = textoOriginal;
        }
    });
}

// ============================================
// SUBIR FOTOS A CLOUDINARY
// ============================================
async function subirFotosCloudinary() {
    fotosSubidas = []; // Limpiar array
    
    for (let i = 0; i < archivosSeleccionados.length; i++) {
        const file = archivosSeleccionados[i];
        console.log(`📤 Subiendo foto ${i + 1}/${archivosSeleccionados.length}:`, file.name);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:4042/api/files/upload', {
                method: 'POST',
                body: formData
            });

            console.log(`📥 Respuesta Cloudinary foto ${i + 1}:`, response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ Error subiendo foto ${i + 1}:`, errorText);
                throw new Error(`Error al subir foto ${i + 1}: ${response.status}`);
            }

            // Obtener el texto de la respuesta
            const responseText = await response.text();
            console.log(`📄 Texto de respuesta foto ${i + 1}:`, responseText);

            let urlImagen;

            // Intentar parsear como JSON
            try {
                const data = JSON.parse(responseText);
                console.log(`✅ Foto ${i + 1} subida (JSON):`, data);
                urlImagen = data.url || data.fileUrl || data.secure_url || data.publicUrl;
            } catch (e) {
                // Si no es JSON, asumir que es la URL directamente
                console.log(`✅ Foto ${i + 1} subida (texto plano):`, responseText);
                urlImagen = responseText.trim();
            }
            
            if (!urlImagen || !urlImagen.startsWith('http')) {
                console.error("❌ URL inválida:", urlImagen);
                throw new Error(`No se obtuvo una URL válida de la foto ${i + 1}`);
            }

            fotosSubidas.push(urlImagen);
            console.log(`🖼️ URL foto ${i + 1}:`, urlImagen);

        } catch (error) {
            console.error(`💥 Error en foto ${i + 1}:`, error);
            throw new Error(`Error al subir la foto ${file.name}: ${error.message}`);
        }
    }

    console.log("✅ Todas las fotos subidas:", fotosSubidas);
}

// ============================================
// OBTENER DATOS DEL FORMULARIO
// ============================================
function obtenerDatosFormulario() {
    // Obtener características seleccionadas
    const caracteristicas = Array.from(
        document.querySelectorAll('input[name="caracteristicas"]:checked')
    ).map(cb => cb.value);

    // Obtener valores de radio buttons
    const edad = document.querySelector('input[name="edad"]:checked')?.value || '';
    const tamanio = document.querySelector('input[name="tamanio"]:checked')?.value || '';

    // Capitalizar primera letra
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        especie: capitalize(document.getElementById('especie').value),
        raza: document.getElementById('raza').value.trim() || 'Mestizo',
        genero: capitalize(document.getElementById('genero').value),
        edadCategoria: capitalize(edad),
        tamano: capitalize(tamanio),
        descripcion: document.getElementById('descripcion').value.trim(),
        
        // Características de salud
        vacunado: caracteristicas.includes('vacunado'),
        desparasitado: caracteristicas.includes('desparasitado'),
        esterilizado: caracteristicas.includes('esterilizado'),
        microchip: caracteristicas.includes('microchip'),
        
        // Comportamiento
        buenoNinos: caracteristicas.includes('ninos'),
        buenoMascotas: caracteristicas.includes('mascotas'),
        necesidadesEspeciales: caracteristicas.includes('especiales'),
        entrenado: caracteristicas.includes('entrenado'),
        
        // Ubicación
        ciudad: document.getElementById('ciudad').value.trim(),
        zona: document.getElementById('colonia').value.trim() || 'No especificada',
        
        // Requisitos
        requisitos: document.getElementById('requisitos').value.trim() || 'Sin requisitos especiales',
        
        // URL de la primera foto (principal)
        urlImagen: fotosSubidas[0]
    };

    return datos;
}

// ============================================
// PUBLICAR MASCOTA EN LA API
// ============================================
async function publicarMascota(datos) {
    // Obtener token JWT
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        console.error("❌ No se encontró token JWT");
        throw new Error('No estás autenticado. Por favor inicia sesión.');
    }

    console.log("🔑 Token JWT encontrado:", token.substring(0, 30) + "...");
    console.log("📤 Enviando datos a API:", datos);

    const response = await fetch('http://localhost:8081/api/adopciones/publicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });

    console.log("📥 Respuesta API adopciones:", response.status, response.statusText);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error API adopciones:", errorText);
        
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('isLoggedIn');
            throw new Error('Sesión expirada. Redirigiendo al login...');
        }
        
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
    }

    const resultado = await response.json();
    console.log("✅ Respuesta exitosa de API:", resultado);
    
    return resultado;
}

// ============================================
// SISTEMA DE ALERTAS
// ============================================
function mostrarAlerta(mensaje, tipo = 'info') {
    console.log(`🔔 Alerta [${tipo}]:`, mensaje);
    
    // Remover alertas existentes
    const alertaExistente = document.querySelector('.custom-alert');
    if (alertaExistente) {
        alertaExistente.remove();
    }

    // Crear nueva alerta
    const alerta = document.createElement('div');
    alerta.className = `custom-alert alert-${tipo}`;
    
    const iconos = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    alerta.innerHTML = `
        <span class="alert-icon">${iconos[tipo]}</span>
        <span class="alert-message">${mensaje}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(alerta);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (alerta.parentElement) {
            alerta.classList.add('fade-out');
            setTimeout(() => alerta.remove(), 300);
        }
    }, 5000);
}

// ============================================
// ESTILOS PARA ALERTAS Y SPINNER
// ============================================
const estilosAlertas = document.createElement('style');
estilosAlertas.textContent = `
    .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    }
    
    .alert-success { border-left: 4px solid #4CAF50; }
    .alert-error { border-left: 4px solid #f44336; }
    .alert-warning { border-left: 4px solid #ff9800; }
    .alert-info { border-left: 4px solid #2196F3; }
    
    .alert-icon { font-size: 1.5rem; }
    .alert-message { flex: 1; color: #333; }
    .alert-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 24px;
        height: 24px;
    }
    .alert-close:hover { color: #333; }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .preview-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background: #4CAF50;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
    }

    .preview-remove {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .preview-remove:hover {
        background: rgba(255, 0, 0, 1);
    }

    .preview-item {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 8px;
        overflow: hidden;
    }

    .preview-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
document.head.appendChild(estilosAlertas);

console.log("✅ Sistema de publicación inicializado correctamente");

// ============================================
// VARIABLES GLOBALES
// ============================================
let fotosSubidas = []; // URLs de Cloudinary
let archivosSeleccionados = []; // Archivos locales

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const formPublicar = document.getElementById('formPublicar');
const descripcionTextarea = document.getElementById('descripcion');
const charCount = document.getElementById('charCount');
const btnCancelar = document.getElementById('btnCancelar');

console.log("📋 Elementos encontrados:", {
    uploadArea: !!uploadArea,
    fileInput: !!fileInput,
    formPublicar: !!formPublicar
});

// ============================================
// UPLOAD DE FOTOS - DRAG & DROP
// ============================================

// Click en el área de upload (prevenir propagación)
uploadArea.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🖱️ Click en área de upload");
    fileInput.click();
});

// Prevenir que el input abra automáticamente al hacer clic
fileInput.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Drag and Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    manejarArchivos(files);
});

// Selección de archivos (solo se ejecuta cuando el usuario selecciona)
fileInput.addEventListener('change', (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    console.log("📁 Archivos seleccionados:", files.length);
    
    if (files.length > 0) {
        manejarArchivos(files);
    }
    
    // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
    e.target.value = '';
});

// ============================================
// MANEJO DE ARCHIVOS
// ============================================
function manejarArchivos(files) {
    console.log("📦 Procesando archivos:", files);
    
    // Validar máximo 5 fotos
    if (archivosSeleccionados.length + files.length > 5) {
        mostrarAlerta('Solo puedes subir un máximo de 5 fotos', 'warning');
        return;
    }

    // Validar tipo y tamaño
    const archivosValidos = files.filter(file => {
        const esImagen = file.type.startsWith('image/');
        const tamanoOk = file.size <= 5 * 1024 * 1024; // 5MB

        if (!esImagen) {
            mostrarAlerta(`${file.name} no es una imagen`, 'error');
            return false;
        }
        if (!tamanoOk) {
            mostrarAlerta(`${file.name} es muy grande (máx 5MB)`, 'error');
            return false;
        }
        return true;
    });

    archivosSeleccionados.push(...archivosValidos);
    mostrarPrevisualizaciones();
}

// ============================================
// PREVISUALIZACIONES
// ============================================
function mostrarPrevisualizaciones() {
    previewContainer.innerHTML = '';
    
    archivosSeleccionados.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button type="button" class="remove-photo" onclick="eliminarFoto(${index})">
                    <i class="fa-solid fa-times"></i>
                </button>
                ${index === 0 ? '<span class="main-badge">Principal</span>' : ''}
            `;
            previewContainer.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    });

    // Mostrar/ocultar área de upload
    if (archivosSeleccionados.length >= 5) {
        uploadArea.style.display = 'none';
    } else {
        uploadArea.style.display = 'flex';
    }
}

// Eliminar foto
window.eliminarFoto = function(index) {
    console.log("🗑️ Eliminando foto:", index);
    archivosSeleccionados.splice(index, 1);
    fotosSubidas.splice(index, 1);
    mostrarPrevisualizaciones();
};

// ============================================
// CONTADOR DE CARACTERES
// ============================================
if (descripcionTextarea && charCount) {
    descripcionTextarea.addEventListener('input', () => {
        const length = descripcionTextarea.value.length;
        charCount.textContent = length;
        
        if (length > 500) {
            descripcionTextarea.value = descripcionTextarea.value.substring(0, 500);
            charCount.textContent = 500;
        }
    });
}

// ============================================
// BOTÓN CANCELAR
// ============================================
if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de cancelar? Se perderán todos los datos.')) {
            window.location.href = 'mis-publicaciones.html';
        }
    });
}

// ============================================
// ENVÍO DEL FORMULARIO
// ============================================
if (formPublicar) {
    console.log("✅ Event listener agregado al formulario");
    
    formPublicar.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("🎯 SUBMIT ACTIVADO - Iniciando publicación");

        // Validar que haya al menos una foto
        if (archivosSeleccionados.length === 0) {
            mostrarAlerta('Debes subir al menos una foto', 'error');
            return;
        }

        // Deshabilitar botón de envío
        const btnSubmit = formPublicar.querySelector('.btn-publicar');
        const textoOriginal = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="spinner"></span> Publicando...';

        try {
            // PASO 1: Subir fotos a Cloudinary
            console.log("📤 PASO 1: Subiendo fotos a Cloudinary...");
            await subirFotosCloudinary();

            if (fotosSubidas.length === 0) {
                throw new Error('No se pudo subir ninguna foto');
            }

            console.log("✅ Fotos subidas exitosamente:", fotosSubidas);

            // PASO 2: Recopilar datos del formulario
            console.log("📝 PASO 2: Recopilando datos del formulario...");
            const datosFormulario = obtenerDatosFormulario();
            console.log("📋 Datos del formulario:", datosFormulario);

            // PASO 3: Publicar en la API
            console.log("🚀 PASO 3: Enviando a API de adopciones...");
            await publicarMascota(datosFormulario);

            // ÉXITO
            console.log("✅ MASCOTA PUBLICADA EXITOSAMENTE");
            mostrarAlerta('¡Mascota publicada exitosamente! 🎉', 'success');
            
            setTimeout(() => {
                window.location.href = 'mis-publicaciones.html';
            }, 2000);

        } catch (error) {
            console.error("💥 ERROR EN PUBLICACIÓN:", error);
            mostrarAlerta(error.message || 'Error al publicar la mascota', 'error');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = textoOriginal;
        }
    });
}

// ============================================
// SUBIR FOTOS A CLOUDINARY
// ============================================
async function subirFotosCloudinary() {
    fotosSubidas = []; // Limpiar array
    
    for (let i = 0; i < archivosSeleccionados.length; i++) {
        const file = archivosSeleccionados[i];
        console.log(`📤 Subiendo foto ${i + 1}/${archivosSeleccionados.length}:`, file.name);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:4042/api/files/upload', {
                method: 'POST',
                body: formData
            });

            console.log(`📥 Respuesta Cloudinary foto ${i + 1}:`, response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ Error subiendo foto ${i + 1}:`, errorText);
                throw new Error(`Error al subir foto ${i + 1}: ${response.status}`);
            }

            // Obtener el texto de la respuesta
            const responseText = await response.text();
            console.log(`📄 Texto de respuesta foto ${i + 1}:`, responseText);

            let urlImagen;

            // Intentar parsear como JSON
            try {
                const data = JSON.parse(responseText);
                console.log(`✅ Foto ${i + 1} subida (JSON):`, data);
                urlImagen = data.url || data.fileUrl || data.secure_url || data.publicUrl;
            } catch (e) {
                // Si no es JSON, asumir que es la URL directamente
                console.log(`✅ Foto ${i + 1} subida (texto plano):`, responseText);
                urlImagen = responseText.trim();
            }
            
            if (!urlImagen || !urlImagen.startsWith('http')) {
                console.error("❌ URL inválida:", urlImagen);
                throw new Error(`No se obtuvo una URL válida de la foto ${i + 1}`);
            }

            fotosSubidas.push(urlImagen);
            console.log(`🖼️ URL foto ${i + 1}:`, urlImagen);

        } catch (error) {
            console.error(`💥 Error en foto ${i + 1}:`, error);
            throw new Error(`Error al subir la foto ${file.name}: ${error.message}`);
        }
    }

    console.log("✅ Todas las fotos subidas:", fotosSubidas);
}

// ============================================
// OBTENER DATOS DEL FORMULARIO
// ============================================
function obtenerDatosFormulario() {
    // Obtener características seleccionadas
    const caracteristicas = Array.from(
        document.querySelectorAll('input[name="caracteristicas"]:checked')
    ).map(cb => cb.value);

    // Obtener valores de radio buttons
    const edad = document.querySelector('input[name="edad"]:checked')?.value || '';
    const tamanio = document.querySelector('input[name="tamanio"]:checked')?.value || '';

    // Capitalizar primera letra
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        especie: capitalize(document.getElementById('especie').value),
        raza: document.getElementById('raza').value.trim() || 'Mestizo',
        genero: capitalize(document.getElementById('genero').value),
        edadCategoria: capitalize(edad),
        tamano: capitalize(tamanio),
        descripcion: document.getElementById('descripcion').value.trim(),
        
        // Características de salud
        vacunado: caracteristicas.includes('vacunado'),
        desparasitado: caracteristicas.includes('desparasitado'),
        esterilizado: caracteristicas.includes('esterilizado'),
        microchip: caracteristicas.includes('microchip'),
        
        // Comportamiento
        buenoNinos: caracteristicas.includes('ninos'),
        buenoMascotas: caracteristicas.includes('mascotas'),
        necesidadesEspeciales: caracteristicas.includes('especiales'),
        entrenado: caracteristicas.includes('entrenado'),
        
        // Ubicación
        ciudad: document.getElementById('ciudad').value.trim(),
        zona: document.getElementById('colonia').value.trim() || 'No especificada',
        
        // Requisitos
        requisitos: document.getElementById('requisitos').value.trim() || 'Sin requisitos especiales',
        
        // URL de la primera foto (principal)
        urlImagen: fotosSubidas[0]
    };

    return datos;
}

// ============================================
// PUBLICAR MASCOTA EN LA API
// ============================================
async function publicarMascota(datos) {
    // Obtener token JWT
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        console.error("❌ No se encontró token JWT");
        throw new Error('No estás autenticado. Por favor inicia sesión.');
    }

    console.log("🔑 Token JWT encontrado:", token.substring(0, 30) + "...");
    console.log("📤 Enviando datos a API:", datos);

    const response = await fetch('http://localhost:8081/api/adopciones/publicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });

    console.log("📥 Respuesta API adopciones:", response.status, response.statusText);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error API adopciones:", errorText);
        
        if (response.status === 401 || response.status === 403) {
            // Token expirado o inválido
            localStorage.removeItem('authToken');
            localStorage.removeItem('isLoggedIn');
            throw new Error('Sesión expirada. Redirigiendo al login...');
        }
        
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
    }

    const resultado = await response.json();
    console.log("✅ Respuesta exitosa de API:", resultado);
    
    return resultado;
}

// ============================================
// SISTEMA DE ALERTAS
// ============================================
function mostrarAlerta(mensaje, tipo = 'info') {
    console.log(`🔔 Alerta [${tipo}]:`, mensaje);
    
    // Remover alertas existentes
    const alertaExistente = document.querySelector('.custom-alert');
    if (alertaExistente) {
        alertaExistente.remove();
    }

    // Crear nueva alerta
    const alerta = document.createElement('div');
    alerta.className = `custom-alert alert-${tipo}`;
    
    const iconos = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    alerta.innerHTML = `
        <span class="alert-icon">${iconos[tipo]}</span>
        <span class="alert-message">${mensaje}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(alerta);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (alerta.parentElement) {
            alerta.classList.add('fade-out');
            setTimeout(() => alerta.remove(), 300);
        }
    }, 5000);
}

// ============================================
// ESTILOS PARA ALERTAS (agregar al CSS)
// ============================================
const estilosAlertas = document.createElement('style');
estilosAlertas.textContent = `
    .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    }
    
    .alert-success { border-left: 4px solid #4CAF50; }
    .alert-error { border-left: 4px solid #f44336; }
    .alert-warning { border-left: 4px solid #ff9800; }
    .alert-info { border-left: 4px solid #2196F3; }
    
    .alert-icon { font-size: 1.5rem; }
    .alert-message { flex: 1; color: #333; }
    .alert-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 24px;
        height: 24px;
    }
    .alert-close:hover { color: #333; }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(estilosAlertas);

console.log("✅ Sistema de publicación inicializado correctamente");