// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.parentElement.querySelector('.toggle-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.17C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z'/%3E%3C/svg%3E\")";
    } else {
        passwordInput.type = 'password';
        toggleIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'/%3E%3C/svg%3E\")";
    }
}

// Validación de formulario
function validateForm() {
    let isValid = true;
    
    // Limpiar errores anteriores
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Validar nombre
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    }
    
    // Validar apellido
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validar contraseña
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    // Validar confirmación de contraseña
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }
    
    // Validar términos y condiciones
    const termsAccepted = document.getElementById('terms').checked;
    if (!termsAccepted) {
        document.getElementById('termsError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Manejo del envío del formulario
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Obtener los datos del formulario
        const userData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || null,
            password: document.getElementById('password').value,
            registrationDate: new Date().toISOString()
        };
        
        // Guardar en localStorage (simulación de base de datos)
        const users = JSON.parse(localStorage.getItem('petconnect_users') || '[]');
        
        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.email === userData.email);
        
        if (userExists) {
            alert('Ya existe una cuenta con este correo electrónico.');
            return;
        }
        
        // Agregar nuevo usuario
        users.push(userData);
        localStorage.setItem('petconnect_users', JSON.stringify(users));
        
        // Mostrar mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Deshabilitar el formulario
        document.querySelectorAll('#registerForm input, #registerForm button')
            .forEach(el => el.disabled = true);
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
});

// Enlaces a términos y condiciones (simulación)
document.getElementById('termsLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Aquí se mostrarían los Términos y Condiciones de PetConnect.');
});

document.getElementById('privacyLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Aquí se mostraría la Política de Privacidad de PetConnect.');
});

// Validación en tiempo real
document.querySelectorAll('#registerForm input').forEach(element => {
    element.addEventListener('blur', function() {
        // Solo validar este campo específico
        const fieldId = this.id;
        let isValid = true;
        
        if (fieldId === 'firstName' && !this.value.trim()) {
            document.getElementById('firstNameError').style.display = 'block';
            isValid = false;
        }
        
        if (fieldId === 'lastName' && !this.value.trim()) {
            document.getElementById('lastNameError').style.display = 'block';
            isValid = false;
        }
        
        if (fieldId === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.value.trim() || !emailRegex.test(this.value.trim())) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
        }
        
        if (fieldId === 'password' && this.value.length < 6) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        
        if (fieldId === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (this.value !== password) {
                document.getElementById('confirmPasswordError').style.display = 'block';
                isValid = false;
            }
        }
        
        // Si el campo es válido, ocultar el mensaje de error
        if (isValid && document.getElementById(fieldId + 'Error')) {
            document.getElementById(fieldId + 'Error').style.display = 'none';
        }
    });
});

// Inicializar iconos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar iconos de mostrar/ocultar contraseña
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    toggleIcons.forEach(icon => {
        icon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3E%3Cpath d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'/%3E%3C/svg%3E\")";
    });
});