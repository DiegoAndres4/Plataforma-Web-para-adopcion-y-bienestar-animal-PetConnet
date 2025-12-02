// ======== FUNCIONALIDAD PARA PUBLICAR MASCOTA ========

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TABS =====
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

    // ===== SUBIDA DE FOTOS =====
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    let uploadedFiles = [];

    // Click para abrir selector de archivos
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Cuando se seleccionan archivos
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        const validFiles = Array.from(files).filter(file => {
            if (!file.type.startsWith('image/')) {
                alert('Solo se permiten imágenes');
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('El archivo ' + file.name + ' excede 5MB');
                return false;
            }
            return true;
        });

        if (uploadedFiles.length + validFiles.length > 5) {
            alert('Máximo 5 fotos permitidas');
            return;
        }

        validFiles.forEach(file => {
            uploadedFiles.push(file);
            displayPreview(file);
        });
    }

    function displayPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="preview-remove" onclick="removePreview(this, '${file.name}')">×</button>
            `;
            previewContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    }

    // Función global para eliminar preview
    window.removePreview = function(btn, fileName) {
        btn.parentElement.remove();
        uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
    };

    // ===== CONTADOR DE CARACTERES =====
    const descripcion = document.getElementById('descripcion');
    const charCount = document.getElementById('charCount');

    if (descripcion && charCount) {
        descripcion.addEventListener('input', () => {
            const count = descripcion.value.length;
            charCount.textContent = count;
            if (count > 500) {
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = '#999';
            }
        });
    }

    // ===== BOTÓN CANCELAR =====
    const btnCancelar = document.getElementById('btnCancelar');
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas cancelar? Se perderán los datos ingresados.')) {
                // Redirigir a la página de adopción o limpiar formulario
                window.location.href = 'adopcion.html';
            }
        });
    }

    // ===== ENVÍO DEL FORMULARIO =====
    const formPublicar = document.getElementById('formPublicar');
    
    if (formPublicar) {
        formPublicar.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validar que hay al menos una foto
            if (uploadedFiles.length === 0) {
                alert('Por favor, sube al menos una foto de la mascota');
                return;
            }

            // Aquí iría la lógica para enviar los datos
            // Por ahora mostramos un mensaje de éxito
            
            const formData = new FormData(formPublicar);
            formData.append('fotos', uploadedFiles);
            
            // Simular envío exitoso
            alert('¡Mascota publicada con éxito! 🎉');
            
            // Opcional: Redirigir o limpiar formulario
            // window.location.href = 'adopcion.html';
        });
    }

});

// Función global para cambiar tabs (usada en el botón del estado vacío)
function cambiarTab(tabId) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
}