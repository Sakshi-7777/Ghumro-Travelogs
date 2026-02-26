// --- BHARAT PLATINUM DATABASE ---
const db = {
    'Manali': {
        price: 8500,
        attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
        time: 'Oct to June',
        cuisine: 'Himachali Traditional',
        dishes: ['Siddu with Ghee', 'Thukpa', 'Kullu Trout'],
        outfit: { vibe: 'Alpine Cozy', items: ['Puffer Jacket', 'Thermal Layers', 'Boots'] },
        coords: '32.24° N, 77.18° E',
        img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400'
    },
    'Kerala': {
        price: 12000,
        attractions: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Beach'],
        time: 'Sept to March',
        cuisine: 'Malabar Coastal',
        dishes: ['Appam & Stew', 'Karimeen', 'Sadya'],
        outfit: { vibe: 'Tropical Breezy', items: ['Linen Shirt', 'Cotton Shorts', 'Espadrilles'] },
        coords: '9.49° N, 76.33° E',
        img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400'
    },
    'Ladakh': {
        price: 18500,
        attractions: ['Pangong Lake', 'Nubra Valley', 'Shanti Stupa'],
        time: 'May to Sept',
        cuisine: 'Tibetan Fusion',
        dishes: ['Mutton Momos', 'Skyu', 'Butter Tea'],
        outfit: { vibe: 'Rugged Explorer', items: ['Windbreaker', 'High-Grip Boots', 'Thermal Gear'] },
        coords: '34.15° N, 77.57° E',
        img: 'https://images.unsplash.com/photo-1549130031-653927772886?auto=format&fit=crop&w=400'
    },
    'Goa': {
        price: 5500,
        attractions: ['Vagator Beach', 'Basilica of Bom Jesus', 'Anjuna'],
        time: 'Nov to Feb',
        cuisine: 'Indo-Portuguese',
        dishes: ['Fish Recheado', 'Bebinca', 'Prawn Balchão'],
        outfit: { vibe: 'Boho Beach Chic', items: ['Straw Hat', 'Kimono', 'Sunglasses'] },
        coords: '15.29° N, 74.12° E',
        img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400'
    }
};

// --- INITIALIZE FIREBASE (Placeholder) ---
const firebaseConfig = {
    apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
    authDomain: "ghumro-platinum.firebaseapp.com",
    projectId: "ghumro-platinum",
    storageBucket: "ghumro-platinum.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

let db_fs = null;
try {
    firebase.initializeApp(firebaseConfig);
    db_fs = firebase.firestore();
} catch (e) {
    console.warn("Firebase initialized with placeholders.");
}

// --- PLATINUM ENGINE ---
let activeTarget = 'Manali';
let totalAmount = 0;

// Dynamic Reveal System (Threshold lowered for better reliability)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const staggers = entry.target.querySelectorAll('[data-stagger]');
            staggers.forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), i * 150);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

// Navigation Active State Sync
window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) current = section.getAttribute('id');
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
});

// Budget Advisor
function liveSuggest() {
    const budget = parseInt(document.getElementById('userBudget').value);
    const output = document.getElementById('advisorOutput');
    if (!budget) {
        output.innerHTML = '<div class="empty-state"><i class="fas fa-wallet"></i><p>Awaiting Financial Input...</p></div>';
        return;
    }

    const matches = Object.keys(db).filter(k => db[k].price <= budget);
    if (matches.length === 0) {
        output.innerHTML = '<div class="empty-state"><i class="fas fa-sad-tear"></i><p>No Platinum Matches. Increase Budget for Impact.</p></div>';
        return;
    }

    output.innerHTML = matches.map((name, i) => `
        <div class="impact-card" data-stagger="${i + 1}" onclick="openEliteDetail('${name}')">
            <img src="${db[name].img}">
            <div class="impact-body">
                <h4>${name}</h4>
                <p class="price-tag">₹${db[name].price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

// Mappls RealView
function runRealView(loc) {
    activeTarget = loc;
    const viewer = document.getElementById('vr-viewer');
    const hud = document.getElementById('hudSystem');
    const overlay = document.querySelector('.vr-overlay-content');
    const coords = document.getElementById('hudCoords');

    overlay.innerHTML = `<h3>Linking ${loc} RealView...</h3><p>Spatial Alignment in Progress</p>`;

    setTimeout(() => {
        viewer.style.backgroundImage = `url('${db[loc].img.replace('w=400', 'w=1920')}')`;
        hud.style.display = 'flex';
        coords.innerText = db[loc].coords;

        let deg = 0;
        const rotateCompass = setInterval(() => {
            deg += 1;
            const compass = document.getElementById('hudCompass');
            if (compass) compass.style.transform = `rotate(${deg}deg)`;
            else clearInterval(rotateCompass);
        }, 60);

        overlay.innerHTML = `
            <h3>${loc} Synced</h3>
            <p>RealView Established at ${db[loc].coords}</p>
            <button class="btn-premium" onclick="location.reload()">Reset Portal</button>
        `;
    }, 1500);
}

// Virtual Try-On
function handleTryOn(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('stylistPreview');
        preview.innerHTML = `
            <img src="${e.target.result}" class="tryon-img">
            <div class="style-banner">
                <h3>Vibe Match: ${db[activeTarget].outfit.vibe}</h3>
                <p>Outfit: ${db[activeTarget].outfit.items.join(' • ')}</p>
                <small>Impact Check: 98% Match</small>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Modal Logic
function openEliteDetail(name) {
    activeTarget = name;
    const data = db[name];
    const modal = document.getElementById('eliteModal');
    const content = document.getElementById('eliteModalData');

    content.innerHTML = `
        <div class="detail-head">
            <h2>${name} Expedition</h2>
            <p class="price-big">₹${data.price.toLocaleString()}</p>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-utensils"></i> Signature Cuisine</h4>
            <div class="tag-cloud">${data.dishes.map(d => `<span class="tag">${d}</span>`).join('')}</div>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-tshirt"></i> Destination Outfit</h4>
            <p><strong>Vibe:</strong> ${data.outfit.vibe}</p>
            <p>Includes: ${data.outfit.items.join(', ')}</p>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-map-marker-alt"></i> Top Attractions</h4>
            <ul>${data.attractions.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        <button class="btn-premium" style="width:100%;" onclick="openPaymentGateway()">Reserve Platinum Pass</button>
    `;
    modal.style.display = 'block';
}

function closeEliteModal() { document.getElementById('eliteModal').style.display = 'none'; }

function openPaymentGateway() {
    totalAmount = db[activeTarget].price + 2450;
    document.getElementById('finalPaymentAmount').innerText = `Total Amount: ₹${totalAmount.toLocaleString()}`;
    document.getElementById('paymentModal').style.display = 'block';
    closeEliteModal();
}

function closePaymentModal() { document.getElementById('paymentModal').style.display = 'none'; }

function updateCardPreview() {
    document.getElementById('previewName').innerText = (document.getElementById('cardName').value || "PLATINUM MEMBER").toUpperCase();
    document.getElementById('previewCardNum').innerText = document.getElementById('cardNum').value || "**** **** **** ****";
    document.getElementById('previewExpiry').innerText = document.getElementById('cardExpiry').value || "MM/YY";
}

document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const processing = document.getElementById('paymentProcessing');
    const success = document.getElementById('paymentSuccess');
    processing.style.display = 'flex';
    setTimeout(() => {
        processing.style.display = 'none';
        success.style.display = 'flex';
        if (db_fs) {
            db_fs.collection('reservations').add({
                dest: activeTarget, amount: totalAmount, time: new Date().toISOString()
            });
        }
    }, 2000);
});

window.onclick = (e) => {
    if (e.target.className === 'modal') {
        closeEliteModal();
        closePaymentModal();
    }
};