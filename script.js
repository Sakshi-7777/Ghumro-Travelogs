document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill in both fields');
        return;
    }

    alert('Login Successful!');
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    alert('Registration Successful!');
    // Switch to login form after successful registration
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});