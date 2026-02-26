// --- DESTINATION METADATA (High-End Detailing) ---
const destData = {
    'Manali': {
        price: 8500,
        attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali Cafes'],
        time: 'October to June (Best for Snow: Dec-Feb)',
        cuisine: 'Siddu, Thukpa, and Trout Fish'
    },
    'Kerala': {
        price: 12000,
        attractions: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Beach', 'Thekkady Wildlife'],
        time: 'September to March',
        cuisine: 'Appam with Stew, Karimeen Pollichathu, and Puttu'
    },
    'Ladakh': {
        price: 18500,
        attractions: ['Pangong Lake', 'Nubra Valley', 'Shanti Stupa', 'Magnetic Hill'],
        time: 'May to September',
        cuisine: 'Momos, Skyu, and Butter Tea'
    },
    'Goa': {
        price: 5500,
        attractions: ['Vagator Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Anjuna Flea Market'],
        time: 'November to February',
        cuisine: 'Fish Recheado, Bebinca, and Prawn Balchão'
    },
    'Udaipur': {
        price: 10500,
        attractions: ['City Palace', 'Lake Pichola', 'Jagdish Temple', 'Fateh Sagar Lake'],
        time: 'September to March',
        cuisine: 'Laal Maas, Dal Bati Churma, and Ker Sangri'
    },
    'Sikkim': {
        price: 14000,
        attractions: ['Tsomgo Lake', 'Nathula Pass', 'Rumtek Monastery', 'Gurudongmar Lake'],
        time: 'March to May / October to December',
        cuisine: 'Phagshapa, Gundruk, and Sael Roti'
    }
};

// --- SMART BUDGET ADVISOR ---
function suggestDestinations() {
    const budget = parseInt(document.getElementById('userBudget').value);
    const container = document.getElementById('budgetSuggestions');

    if (!budget) {
        container.innerHTML = '<p class="placeholder-text">Enter a budget to see where you can go...</p>';
        return;
    }

    let suggestions = Object.keys(destData).filter(key => destData[key].price <= budget);

    if (suggestions.length === 0) {
        container.innerHTML = '<p class="placeholder-text" style="color: #FF385C;">Maybe save a bit more? Or try a smaller trip!</p>';
    } else {
        container.innerHTML = suggestions.map(name => `
            <div class="suggest-card" onclick="openDetailModal('${name}')">
                <h4>${name}</h4>
                <p>Est. ₹${destData[name].price.toLocaleString()}</p>
                <small>View Details</small>
            </div>
        `).join('');
    }
}

// --- AR/VR PORTAL SIMULATOR ---
function startVRExperience(loc) {
    const viewer = document.getElementById('vr-viewer');
    const overlay = document.querySelector('.vr-overlay');

    overlay.innerHTML = `<h3>Syncing Neural Link...</h3><p>Entering ${loc} 360° Vision...</p>`;

    setTimeout(() => {
        viewer.style.opacity = '1';
        viewer.style.transform = 'scale(1.2)';

        if (loc === 'Himalayas') {
            viewer.style.backgroundImage = "url('https://images.unsplash.com/photo-1549130031-653927772886?auto=format&fit=crop&q=80&w=1920')";
        } else {
            viewer.style.backgroundImage = "url('https://images.unsplash.com/photo-1506929113675-b929da606dc8?auto=format&fit=crop&q=80&w=1920')";
        }

        setTimeout(() => {
            alert(`Virtual Reality Experience: Welcome to ${loc}! Use your imagine to pan around.`);
            overlay.innerHTML = `
                <span class="sub-title">Session Active</span>
                <h2>You are in ${loc}</h2>
                <button class="vr-btn" onclick="location.reload()">Exit VR Portal</button>
            `;
        }, 1000);
    }, 1500);
}

// --- DETAILING MODAL LOGIC ---
function openDetailModal(name) {
    const data = destData[name];
    if (!data) return;

    document.getElementById('detName').innerText = name;
    document.getElementById('detPrice').innerText = `₹${data.price.toLocaleString()}`;
    document.getElementById('detTime').innerText = data.time;
    document.getElementById('detCuisine').innerText = data.cuisine;

    const attractionsList = document.getElementById('detAttractions');
    attractionsList.innerHTML = data.attractions.map(attr => `<li>${attr}</li>`).join('');

    document.getElementById('detailModal').style.display = 'block';

    // Pass name to booking modal for later
    window.lastViewedDestination = name;
}

function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// --- BOOKING LOGIC ---
function openBookingModal(name) {
    const dest = name || window.lastViewedDestination || 'Manali';
    const data = destData[dest] || { price: 8500 };

    document.getElementById('selectedDest').innerText = dest;
    const total = data.price + 1250; // price + mock tax
    document.getElementById('totalPrice').innerText = `₹${total.toLocaleString()}`;

    document.getElementById('bookingModal').style.display = 'block';
    closeDetailModal();
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function processBooking() {
    alert('High-End Transaction Secure. Trip Confirmed! Check your email for VR boarding pass.');
    closeBookingModal();
}

// --- GLOBAL UTILS ---
window.onclick = function (event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}