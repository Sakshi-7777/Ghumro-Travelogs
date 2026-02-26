// --- DESTINATION METADATA ---
const destData = {
    'Manali': {
        price: 8500,
        attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
        time: 'Oct to June',
        cuisine: 'Himachali Traditional',
        bestDishes: ['Siddu with Ghee', 'Thukpa Soup', 'Kullu Trout', 'Chana Madra'],
        outfitVibe: 'Alpine Cozy',
        outfitItems: ['Puffer Jacket', 'Woolen Scarf', 'Combat Boots'],
        coords: '32.2432° N, 77.1892° E',
        img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400'
    },
    'Kerala': {
        price: 12000,
        attractions: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Beach'],
        time: 'Sept to March',
        cuisine: 'Malabar Coastal',
        bestDishes: ['Appam with Stew', 'Karimeen Pollichathu', 'Kerala Sadya', 'Prawn Roast'],
        outfitVibe: 'Tropical Breezy',
        outfitItems: ['Linen Shirt', 'Cotton Chinos', 'Sunglasses', 'Espadrilles'],
        coords: '9.4981° N, 76.3388° E',
        img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400'
    },
    'Ladakh': {
        price: 18500,
        attractions: ['Pangong Lake', 'Nubra Valley', 'Shanti Stupa'],
        time: 'May to Sept',
        cuisine: 'Trans-Himalayan Tibetan',
        bestDishes: ['Mutton Momos', 'Skyu Pasta', 'Butter Tea', 'Tigmo Bread'],
        outfitVibe: 'Rugged Explorer',
        outfitItems: ['Gore-Tex Windbreaker', 'Thermal Base Layer', 'Hiking Boots'],
        coords: '34.1526° N, 77.5771° E',
        img: 'https://images.unsplash.com/photo-1549130031-653927772886?auto=format&fit=crop&w=400'
    },
    'Goa': {
        price: 5500,
        attractions: ['Vagator Beach', 'Basilica of Bom Jesus', 'Anjuna Market'],
        time: 'Nov to Feb',
        cuisine: 'Indo-Portuguese Fusion',
        bestDishes: ['Fish Recheado', 'Bebinca Cake', 'Prawn Balchão', 'Chicken Cafreal'],
        outfitVibe: 'Boho Beach Chic',
        outfitItems: ['Floral Kimono', 'Straw Hat', 'Flip Flops', 'Swim Trunks'],
        coords: '15.2993° N, 74.1240° E',
        img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400'
    }
};

// --- AUTH LOGIC ---
function setupAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Welcome to Ghumro! Account Created.');
            window.location.href = 'home.html';
        });
    }
}

function toggleForms(type) {
    const login = document.getElementById('loginForm');
    const register = document.getElementById('registerForm');
    if (type === 'register') {
        login.style.display = 'none';
        register.style.display = 'block';
    } else {
        register.style.display = 'none';
        login.style.display = 'block';
    }
}

// Check for ID presence before adding listeners
document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    if (showRegister) showRegister.onclick = (e) => { e.preventDefault(); toggleForms('register'); };
    if (showLogin) showLogin.onclick = (e) => { e.preventDefault(); toggleForms('login'); };
});

// --- BUDGET ADVISOR (Improved) ---
function suggestDestinations() {
    const budget = parseInt(document.getElementById('userBudget').value);
    const container = document.getElementById('budgetSuggestions');
    if (!budget) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-wallet"></i>
                <p>Your next journey starts with a single number...</p>
            </div>`;
        return;
    }

    const matches = Object.keys(destData).filter(key => destData[key].price <= budget);
    if (matches.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sad-tear"></i>
                <p>No matches yet. Try a slightly higher range for more impact!</p>
            </div>`;
        return;
    }

    container.innerHTML = matches.map(name => `
        <div class="impact-card animate-up" onclick="openDetailModal('${name}')">
            <img src="${destData[name].img}" class="impact-img">
            <div class="impact-info">
                <h4>${name}</h4>
                <p>Starts @ ₹${destData[name].price.toLocaleString()}</p>
            </div>
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

    // Background based on location
    const images = {
        'Manali': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1920',
        'Ladakh': 'https://images.unsplash.com/photo-1549130031-653927772886?auto=format&fit=crop&q=80&w=1920',
        'Kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1920'
    };
    viewer.style.backgroundImage = `url('${images[loc]}')`;

    let angle = 0;
    const compassInt = setInterval(() => {
        angle += 2;
        document.getElementById('hudCompass').style.transform = `rotate(${angle}deg)`;
        if (angle > 360) angle = 0;
    }, 50);

    setTimeout(() => {
        content.style.display = 'block';
        content.innerHTML = `
            <h3>${loc} Visual Sync Complete</h3>
            <p>RealView Stream established. Navigation active.</p>
            <button class="vr-btn" onclick="location.reload()">Exit RealView</button>
        `;
    }, 2000);
}

// --- MODAL & LIFESTYLE LOGIC ---
let activeDest = '';

function openDetailModal(name) {
    activeDest = name;
    const data = destData[name];
    document.getElementById('detName').innerText = name;
    document.getElementById('detPrice').innerText = `Est. Base: ₹${data.price.toLocaleString()}`;
    document.getElementById('detTime').innerText = data.time;
    document.getElementById('detCuisine').innerText = `${data.cuisine} Specialities`;

    // Dish list
    document.getElementById('detAttractions').innerHTML = `
        <div class="lifestyle-section">
            <h5><i class="fas fa-utensils"></i> Signature Dishes</h5>
            <ul class="dish-list">${data.bestDishes.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
        <div class="lifestyle-section">
            <h5><i class="fas fa-tshirt"></i> Suggested Outfit: ${data.outfitVibe}</h5>
            <p class="outfit-items">${data.outfitItems.join(' • ')}</p>
        </div>
    `;

    document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() { document.getElementById('detailModal').style.display = 'none'; }

// --- VIRTUAL TRY-ON SIMULATION ---
function triggerTryOn() {
    const fileInput = document.getElementById('userPhoto');
    fileInput.click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const previewArea = document.getElementById('tryOnPreview');
        previewArea.innerHTML = `
            <div class="tryon-success">
                <i class="fas fa-check-circle pulse"></i>
                <img src="${e.target.result}" class="user-photo-preview">
                <div class="outfit-overlay">
                    <p>Styling for ${activeDest || 'Adventure'}...</p>
                    <small>Matching ${destData[activeDest || 'Goa'].outfitVibe} Vibe</small>
                </div>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Booking preservation
function openBookingModal() {
    const price = destData[activeDest || 'Manali'].price;
    document.getElementById('bookingSummary').innerHTML = `
        <p>Target: <strong>${activeDest}</strong></p>
        <p>Vibe: <strong>${destData[activeDest].outfitVibe}</strong></p>
        <p>Total Est: <strong>₹${(price + 1500).toLocaleString()}</strong></p>
    `;
    document.getElementById('bookingModal').style.display = 'block';
    closeDetailModal();
}

function closeBookingModal() { document.getElementById('bookingModal').style.display = 'none'; }

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeDetailModal();
        closeBookingModal();
    }
}