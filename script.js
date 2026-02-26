// Form Toggling
if (document.getElementById('showRegister')) {
    document.getElementById('showRegister').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });
}

if (document.getElementById('showLogin')) {
    document.getElementById('showLogin').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
}

// Login/Register Logic
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === '' || password === '') {
            alert('Please fill in both fields');
            return;
        }

        // Animated Success Simulation
        const btn = this.querySelector('button');
        btn.innerHTML = '<span>Authenticating...</span>';
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    });
}

if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        if (username === '' || email === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }

        alert('Registration Successful! Redirecting to dashboard...');
        window.location.href = 'home.html';
    });
}

// Full-STACK Home Page Logic
function openBookingModal(dest = 'Your selected destination') {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    document.getElementById('selectedDest').innerText = dest;

    // Dynamic price simulation based on destination
    let basePrice = 8500;
    if (dest === 'Kerala') basePrice = 12000;
    if (dest === 'Ladakh') basePrice = 15500;
    if (dest === 'Goa') basePrice = 5000;

    document.getElementById('priceTag').innerText = `₹${basePrice.toLocaleString()}`;
    const tax = Math.floor(basePrice * 0.15);
    document.getElementById('totalPrice').innerText = `₹${(basePrice + tax).toLocaleString()}`;

    modal.style.display = 'block';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = 'none';
}

function processBooking() {
    const modal = document.getElementById('bookingModal');
    const content = modal.querySelector('.modal-body');

    content.innerHTML = `
        <div style="text-align: center; padding: 40px 0;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #FF385C; margin-bottom: 20px;"></i>
            <h3>Booking Confirmed!</h3>
            <p style="margin-top: 10px; color: #717171;">Your ticket has been sent to your registered email.</p>
            <button class="confirm-btn" style="margin-top: 30px;" onclick="closeBookingModal()">Close</button>
        </div>
    `;
}

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBookingModal();
    }
}