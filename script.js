// --- DESTINATION METADATA ---
const destData = {
    'Manali': {
        price: 8500,
        attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
        time: 'Oct to June',
        cuisine: 'Siddu, Thukpa',
        coords: '32.2432° N, 77.1892° E'
    },
    'Kerala': {
        price: 12000,
        attractions: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Beach'],
        time: 'Sept to March',
        cuisine: 'Appam, Karimeen',
        coords: '9.4981° N, 76.3388° E'
    },
    'Ladakh': {
        price: 18500,
        attractions: ['Pangong Lake', 'Nubra Valley', 'Shanti Stupa'],
        time: 'May to Sept',
        cuisine: 'Momos, Skyu',
        coords: '34.1526° N, 77.5771° E'
    },
    'Goa': {
        price: 5500,
        attractions: ['Vagator Beach', 'Basilica of Bom Jesus', 'Anjuna Market'],
        time: 'Nov to Feb',
        cuisine: 'Fish Recheado, Bebinca',
        coords: '15.2993° N, 74.1240° E'
    }
};

// --- AUTH LOGIC ---
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        window.location.href = 'home.html';
    });
}

if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Registered! Redirecting...');
        window.location.href = 'home.html';
    });
}

const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

if (showRegister) {
    showRegister.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });
}

if (showLogin) {
    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
}

// --- BUDGET ADVISOR ---
function suggestDestinations() {
    const budget = parseInt(document.getElementById('userBudget').value);
    const container = document.getElementById('budgetSuggestions');
    if (!budget) return;

    const matches = Object.keys(destData).filter(key => destData[key].price <= budget);
    if (matches.length === 0) {
        container.innerHTML = '<p>No matches found for this budget.</p>';
        return;
    }

    container.innerHTML = matches.map(name => `
        <div class="suggest-card" onclick="openDetailModal('${name}')">
            <h4>${name}</h4>
            <p>From ₹${destData[name].price.toLocaleString()}</p>
        </div>
    `).join('');
}

// --- MAPPLS REALVIEW ---
function startMapplsRealView(loc) {
    const viewer = document.getElementById('vr-viewer');
    const hud = document.getElementById('hudOverlay');
    const content = document.querySelector('.vr-content');
    const coords = document.getElementById('hudCoords');

    content.style.display = 'none';
    hud.style.display = 'flex';
    coords.innerText = destData[loc].coords;

    if (loc === 'Manali') {
        viewer.style.backgroundImage = "url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1920')";
    } else if (loc === 'Ladakh') {
        viewer.style.backgroundImage = "url('https://images.unsplash.com/photo-1549130031-653927772886?auto=format&fit=crop&q=80&w=1920')";
    } else {
        viewer.style.backgroundImage = "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1920')";
    }

    let angle = 0;
    setInterval(() => {
        angle += 1;
        document.getElementById('hudCompass').style.transform = `rotate(${angle}deg)`;
    }, 50);
}

// --- MODAL LOGIC ---
let activeDest = '';

function openDetailModal(name) {
    activeDest = name;
    const data = destData[name];
    document.getElementById('detName').innerText = name;
    document.getElementById('detPrice').innerText = `Starting at ₹${data.price.toLocaleString()}`;
    document.getElementById('detTime').innerText = data.time;
    document.getElementById('detCuisine').innerText = data.cuisine;
    document.getElementById('detAttractions').innerHTML = data.attractions.map(a => `<li>${a}</li>`).join('');
    document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() { document.getElementById('detailModal').style.display = 'none'; }

function openBookingModal() {
    const price = destData[activeDest].price;
    document.getElementById('bookingSummary').innerHTML = `
        <p>Destination: <strong>${activeDest}</strong></p>
        <p>Package Price: <strong>₹${price.toLocaleString()}</strong></p>
        <p>Taxes & Fees: <strong>₹1,250</strong></p>
        <hr>
        <p style="font-size: 1.2rem; margin-top:10px;">Total: <strong>₹${(price + 1250).toLocaleString()}</strong></p>
    `;
    document.getElementById('bookingModal').style.display = 'block';
    closeDetailModal();
}

function closeBookingModal() { document.getElementById('bookingModal').style.display = 'none'; }

function processBooking() {
    alert(`Booking Confirmed for ${activeDest}! Check your email for details.`);
    closeBookingModal();
}

window.onclick = function (event) {
    if (event.target.className === 'modal') {
        closeDetailModal();
        closeBookingModal();
    }
}