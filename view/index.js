document.addEventListener('DOMContentLoaded', function() {
    console.log('Loaded!');
    setup();
});

function setup() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        login(form.username.value, form.password.value);
    });

    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        register(form.username.value, form.password.value, form.email.value);
    });
}

function login(username, password) {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
}

function register(username, password, email) {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Email: ${email}`);
}
