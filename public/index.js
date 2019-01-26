document.addEventListener('DOMContentLoaded', function() {
    setup();
});

function setup() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        const values = formValues(form);
        login(values);
    });

    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        const values = formValues(form);
        register(values);
    });

    const toggleLinks = document.querySelectorAll('.form-toggle');
    toggleLinks.forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        toggleForms()
    }));
}

function formValues(form) {
    let value = {};
    for (const input of form) {
        if (input.name) {
            value[input.name] = form[input.name].value;
        }
    }
    return value;
}

// Change 
function login({username, password}) {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
}

function register({username, password, email}) {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Email: ${email}`);
}
// change

function toggleForms() {
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
        form.classList.toggle('hidden');
    }
}
