const form = document.querySelector('form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');

form.addEventListener('submit', function (e) {
    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert('Şifreler eşleşmiyor. Lütfen tekrar kontrol edin.');
    }
});
