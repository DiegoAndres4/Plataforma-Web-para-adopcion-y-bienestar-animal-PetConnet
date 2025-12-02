// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.parentElement.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fa-solid fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fa-solid fa-eye';
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
            registrationDate: new Date().toISOString().split('T')[0]
        };
        
        // Guardar en localStorage (simulación de base de datos)
        const users = JSON.parse(localStorage.getItem('petconnect_users') || '[]');
        
        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.email === userData.email);
        
        if (userExists) {
            alert('Ya existe una cuenta con este correo electrónico. Por favor, inicia sesión.');
            return;
        }
        
        // Agregar nuevo usuario
        users.push(userData);
        localStorage.setItem('petconnect_users', JSON.stringify(users));
        
        // Guardar estado de sesión automáticamente
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userName", `${userData.firstName} ${userData.lastName}`);
        
        // Mostrar mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'flex';
        
        // Deshabilitar el formulario
        document.querySelectorAll('#registerForm input, #registerForm button')
            .forEach(el => el.disabled = true);
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = "index-logueado.html";
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

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de registro de PetConnect cargada correctamente.');
});