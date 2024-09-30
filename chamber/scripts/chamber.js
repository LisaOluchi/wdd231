
document.getElementById('currentyear').textContent = new Date().getFullYear();

document.getElementById('lastmodified').textContent = document.lastModified;


async function fetchMemberData(viewType) {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, viewType); 
}

function displayMembers(members, viewType) {
    const container = document.getElementById('cards');
    container.innerHTML = ''; 

    members.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('card');

       
        if (viewType === 'list') {
            card.classList.add('list-view');
        }

        
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} logo" class="member-logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
        `;

       
        container.appendChild(card);
    });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}


function toggleView(viewType) {
    fetchMemberData(viewType); 
}


const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const cardsContainer = document.getElementById('cards');


let currentView = 'grid';

gridViewBtn.addEventListener('click', () => {
    if (currentView !== 'grid') {
        currentView = 'grid';
        toggleView('grid');
    }
});

listViewBtn.addEventListener('click', () => {
    if (currentView !== 'list') {
        currentView = 'list';
        toggleView('list');
    }
});


fetchMemberData('grid');                           