// Form doğrulama işlevi
function validateForm(form) {
    let username = form.username.value.trim();
    let password = form.password.value.trim();

    // Giriş Formu Doğrulaması
    if (username === "" || password === "") {
        alert("Lütfen kullanıcı adı ve şifreyi girin.");
        return false;
    }

    // Kayıt Formu Doğrulaması
    if (form.confirm_password) { // Kayıt formunda var mı kontrol et
        let confirmPassword = form.confirm_password.value.trim();
        if (password !== confirmPassword) {
            alert("Şifreler uyuşmuyor.");
            return false;
        }
    }

    return true;
}

// Şifre doğrulama
const form = document.querySelector('form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');

form.addEventListener('submit', function (e) {
    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert('Şifreler eşleşmiyor. Lütfen tekrar kontrol edin.');
    }
});

// Form submit olayını dinler ve doğrulamayı gerçekleştirir
document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateForm(this)) {
        event.preventDefault(); // Submit iptal edilir
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    if (!validateForm(this)) {
        event.preventDefault(); // Submit iptal edilir
    }
});
