// --- THE ELITE DATABASE ---
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

// --- PLATINUM ENGINE ---
let activeTarget = 'Manali';

// Reveal On Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// Budget Advisor (Live Search)
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

    output.innerHTML = matches.map(name => `
        <div class="impact-card" onclick="openEliteDetail('${name}')">
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

    overlay.innerHTML = `<h3>Syncing ${loc} Link...</h3><p>Spatial Alignment in Progress</p>`;

    setTimeout(() => {
        viewer.style.backgroundImage = `url('${db[loc].img.replace('w=400', 'w=1920')}')`;
        hud.style.display = 'flex';
        coords.innerText = db[loc].coords;

        let deg = 0;
        setInterval(() => {
            deg += 1;
            document.getElementById('hudCompass').style.transform = `rotate(${deg}deg)`;
        }, 60);

        overlay.innerHTML = `
            <h3>${loc} Synced</h3>
            <p>RealView Established at ${db[loc].coords}</p>
            <button class="btn-premium" onclick="location.reload()">Reset Link</button>
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

// Elite Modal
function openEliteDetail(name) {
    activeTarget = name;
    const data = db[name];
    const modal = document.getElementById('eliteModal');
    const content = document.getElementById('eliteModalData');

    content.innerHTML = `
        <div class="detail-head">
            <h2>${name} Explorer</h2>
            <p class="price-big">₹${data.price.toLocaleString()}</p>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-utensils"></i> Signature Cuisine</h4>
            <div class="tag-cloud">${data.dishes.map(d => `<span class="tag">${d}</span>`).join('')}</div>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-tshirt"></i> Destination Outfit</h4>
            <p><strong>Vibe:</strong> ${data.outfit.vibe}</p>
            <p style="color:#64748b;">Includes: ${data.outfit.items.join(', ')}</p>
        </div>
        <div class="meta-block">
            <h4><i class="fas fa-map-marker-alt"></i> Top Attractions</h4>
            <ul>${data.attractions.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        <button class="btn-premium" style="width:100%;" onclick="openOrder()">Request Reservation</button>
    `;
    modal.style.display = 'block';
}

function closeEliteModal() { document.getElementById('eliteModal').style.display = 'none'; }

function openOrder() {
    const data = db[activeTarget];
    document.getElementById('orderSummary').innerHTML = `
        <p style="margin-bottom:10px;">Platinum Package: <strong>${activeTarget}</strong></p>
        <p>Base Fee: <strong>₹${data.price.toLocaleString()}</strong></p>
        <p>Luxury Tax: <strong>₹2,450</strong></p>
        <hr style="margin:20px 0;">
        <h3 style="color:#3a7bd5;">Total: ₹${(data.price + 2450).toLocaleString()}</h3>
    `;
    document.getElementById('orderModal').style.display = 'block';
    closeEliteModal();
}

function closeOrderModal() { document.getElementById('orderModal').style.display = 'none'; }

function confirmOrder() {
    alert(`Platinum Reservation Confirmed for ${activeTarget}. Welcome to the club.`);
    closeOrderModal();
}

window.onclick = (e) => {
    if (e.target.className === 'modal') {
        closeEliteModal();
        closeOrderModal();
    }
};