// Funciones para la página de perfil

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el selector de tipo de usuario
    initializeUserTypeSelector();
    
    // Configurar el formulario de perfil
    initializeProfileForm();
    
    // Configurar validación de contraseña
    setupPasswordValidation();
    
    // Cargar configuración guardada
    loadSavedSettings();
});

// Selector de tipo de usuario
function initializeUserTypeSelector() {
    const options = document.querySelectorAll('.user-type-option');
    const hiddenInput = document.getElementById('userType');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todas las opciones
            options.forEach(opt => opt.classList.remove('active'));
            
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
            
            // Actualizar input hidden
            const value = this.getAttribute('data-value');
            hiddenInput.value = value;
            
            // Mostrar feedback visual
            showNotification('Tipo de usuario actualizado a: ' + this.querySelector('span').textContent, 'success');
        });
    });
}

// Formulario de perfil
function initializeProfileForm() {
    const form = document.getElementById('profileForm');
    const originalData = getFormData();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateProfileForm()) {
            // Simular guardado en servidor
            simulateSaveProfile()
                .then(() => {
                    showNotification('Perfil actualizado correctamente', 'success');
                    originalData = getFormData(); // Actualizar datos originales
                })
                .catch(error => {
                    showNotification('Error al guardar: ' + error, 'error');
                });
        }
    });
    
    // Detectar cambios para habilitar/deshabilitar botón cancelar
    form.addEventListener('input', function() {
        const currentData = getFormData();
        const hasChanges = JSON.stringify(currentData) !== JSON.stringify(originalData);
        
        const cancelBtn = document.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.disabled = !hasChanges;
            cancelBtn.style.opacity = hasChanges ? '1' : '0.5';
            cancelBtn.style.cursor = hasChanges ? 'pointer' : 'not-allowed';
        }
    });
}

// Obtener datos del formulario
function getFormData() {
    return {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        userType: document.getElementById('userType').value,
        description: document.getElementById('description').value
    };
}

// Validar formulario
function validateProfileForm() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return false;
    }
    
    // Validar teléfono (opcional, formato básico)
    if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
        showNotification('Por favor ingresa un número de teléfono válido', 'error');
        return false;
    }
    
    return true;
}

// Simular guardado en servidor
function simulateSaveProfile() {
    return new Promise((resolve, reject) => {
        // Simular tiempo de red
        setTimeout(() => {
            // Aquí normalmente harías una petición fetch a tu API
            const success = Math.random() > 0.1; // 90% de éxito para demo
            
            if (success) {
                // Actualizar avatar si hay archivo seleccionado
                const avatarInput = document.getElementById('avatarInput');
                if (avatarInput.files && avatarInput.files[0]) {
                    updateAvatarPreview(avatarInput.files[0]);
                }
                
                // Guardar en localStorage para demo
                const formData = getFormData();
                localStorage.setItem('petconnect_profile', JSON.stringify(formData));
                
                resolve();
            } else {
                reject('Error de conexión');
            }
        }, 1000);
    });
}

// Resetear formulario
function resetForm() {
    const savedData = localStorage.getItem('petconnect_profile');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('fullName').value = data.fullName || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('address').value = data.address || '';
        document.getElementById('userType').value = data.userType || 'refuge';
        document.getElementById('description').value = data.description || '';
        
        // Actualizar selector visual
        updateUserTypeSelector(data.userType);
    } else {
        // Valores por defecto
        document.getElementById('fullName').value = 'Refugio Patitas Felices';
        document.getElementById('email').value = 'refugio@patitas.com';
        document.getElementById('phone').value = '+57 321 456 7890';
        document.getElementById('address').value = 'Calle 123 #45-67, Bogotá, Colombia';
        document.getElementById('userType').value = 'refuge';
        document.getElementById('description').value = 'Refugio dedicado al rescate y cuidado de animales en situación de abandono. Trabajamos para encontrar hogares amorosos para cada una de nuestras mascotas.';
        
        updateUserTypeSelector('refuge');
    }
    
    showNotification('Cambios descartados', 'info');
}

// Actualizar selector de tipo de usuario
function updateUserTypeSelector(type) {
    const options = document.querySelectorAll('.user-type-option');
    options.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-value') === type) {
            option.classList.add('active');
        }
    });
}

// Cambiar avatar
function changeAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('Por favor selecciona una imagen válida', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB max
        showNotification('La imagen no debe superar los 5MB', 'error');
        return;
    }
    
    updateAvatarPreview(file);
    
    // Aquí normalmente subirías la imagen al servidor
    showNotification('Avatar actualizado correctamente', 'success');
}

// Actualizar vista previa del avatar
function updateAvatarPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatar = document.getElementById('profileAvatar');
        avatar.innerHTML = `<img src="${e.target.result}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        
        // También actualizar el avatar en el menú de usuario
        const menuAvatar = document.querySelector('.user-avatar');
        if (menuAvatar) {
            menuAvatar.innerHTML = `<img src="${e.target.result}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        }
    };
    reader.readAsDataURL(file);
}

// Validación de contraseña
function setupPasswordValidation() {
    const newPasswordInput = document.getElementById('newPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (newPasswordInput && strengthBar && strengthText) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Actualizar barra de fortaleza
            const width = Math.min(strength.score * 20, 100);
            strengthBar.style.width = width + '%';
            strengthBar.style.backgroundColor = strength.color;
            
            // Actualizar texto
            strengthText.textContent = 'Seguridad: ' + strength.level;
            strengthText.style.color = strength.color;
        });
    }
}

// Calcular fortaleza de contraseña
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const levels = ['Muy débil', 'Débil', 'Moderada', 'Fuerte', 'Muy fuerte'];
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
    
    return {
        score: score,
        level: levels[score - 1] || 'Muy débil',
        color: colors[score - 1] || '#e74c3c'
    };
}

// Modal de cambio de contraseña
function showChangePasswordModal() {
    document.getElementById('passwordModal').style.display = 'flex';
    document.getElementById('currentPassword').focus();
}

function closeChangePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
    document.getElementById('changePasswordForm').reset();
    
    // Resetear barra de fortaleza
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    if (strengthBar && strengthText) {
        strengthBar.style.width = '30%';
        strengthBar.style.backgroundColor = '#e74c3c';
        strengthText.textContent = 'Seguridad: Baja';
        strengthText.style.color = '#7f8c8d';
    }
}

function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Todos los campos son obligatorios', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }
    
    // Simular cambio de contraseña
    setTimeout(() => {
        showNotification('Contraseña actualizada correctamente', 'success');
        closeChangePasswordModal();
    }, 1000);
}

// Cargar configuración guardada
function loadSavedSettings() {
    const settings = {
        emailNotifications: localStorage.getItem('emailNotifications') !== 'false',
        profileVisibility: localStorage.getItem('profileVisibility') !== 'false',
        directMessages: localStorage.getItem('directMessages') !== 'false',
        twoFactorAuth: localStorage.getItem('twoFactorAuth') === 'true'
    };
    
    // Aplicar configuraciones
    document.getElementById('emailNotifications').checked = settings.emailNotifications;
    document.getElementById('profileVisibility').checked = settings.profileVisibility;
    document.getElementById('directMessages').checked = settings.directMessages;
    document.getElementById('twoFactorAuth').checked = settings.twoFactorAuth;
    
    // Guardar cambios automáticamente
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            showNotification('Configuración guardada', 'success');
        });
    });
}

// Cerrar otras sesiones
function logoutOtherSessions() {
    if (confirm('¿Estás seguro de que deseas cerrar todas las demás sesiones activas?')) {
        // Simular cierre de sesiones
        setTimeout(() => {
            showNotification('Todas las demás sesiones han sido cerradas', 'success');
        }, 1000);
    }
}

// Exportar datos
function exportData() {
    if (confirm('Se descargará un archivo con todos tus datos. ¿Continuar?')) {
        // Crear datos para exportar
        const userData = {
            profile: getFormData(),
            settings: {
                emailNotifications: document.getElementById('emailNotifications').checked,
                profileVisibility: document.getElementById('profileVisibility').checked,
                directMessages: document.getElementById('directMessages').checked,
                twoFactorAuth: document.getElementById('twoFactorAuth').checked
            },
            exportDate: new Date().toISOString()
        };
        
        // Crear y descargar archivo
        const dataStr = JSON.stringify(userData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `petconnect_data_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showNotification('Datos exportados correctamente', 'success');
    }
}

// Solicitar eliminación de cuenta
function requestAccountDeletion() {
    if (confirm('¿Estás seguro de que deseas solicitar la eliminación de tu cuenta? Esta acción es irreversible.')) {
        // Simular solicitud
        setTimeout(() => {
            showNotification('Solicitud de eliminación enviada. Te contactaremos pronto.', 'warning');
        }, 1500);
    }
}

// Mostrar notificaciones
function showNotification(message, type) {
    // Eliminar notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
`;
document.head.appendChild(style);