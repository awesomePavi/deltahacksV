window.addEventListener('load', function() {
    console.log('Loaded!');
    setup();
});

function setup() {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', event => {
        event.preventDefault();
        console.log(event);
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        console.log(event);
    });
}

function login(username, password) {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
}