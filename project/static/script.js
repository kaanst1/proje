// Form doğrulama işlevi
function validateForm(form) {
    let username = form.username?.value.trim();
    let password = form.password.value.trim();

    if (!username && !form.confirm_password) {
        alert("Lütfen kullanıcı adı ve şifreyi girin.");
        return false;
    }

    if (form.confirm_password) {
        let confirmPassword = form.confirm_password.value.trim();
        if (password !== confirmPassword) {
            alert("Şifreler uyuşmuyor.");
            return false;
        }
    }

    return true;
}

// Login formu
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        if (!validateForm(this)) {
            event.preventDefault();
        }
    });
}

// Register formu
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');

    registerForm.addEventListener('submit', function(event) {
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            alert('Şifreler eşleşmiyor. Lütfen tekrar kontrol edin.');
        } else if (!validateForm(this)) {
            event.preventDefault();
        }
    });
}
