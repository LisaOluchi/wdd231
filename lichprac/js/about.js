document.addEventListener("DOMContentLoaded", loadHobbies);

async function loadHobbies() {
    const hobbyContainer = document.querySelector('.hobbies-container');
    const hobbyDataList = [
        { activity: "Photography", type: "Art", participants: 1, accessibility: "Easy" },
        { activity: "Gardening", type: "Outdoor", participants: 1, accessibility: "Moderate" },
        { activity: "Baking", type: "Skill", participants: 1, accessibility: "Moderate" },
        { activity: "Swimming", type: "Outdoor", participants: 1, accessibility: "Challenging" },
        { activity: "Coding", type: "Skill", participants: 1, accessibility: "Moderate" },
        { activity: "Designing", type: "Talent", participants: 2, accessibility: "Easy" },
        { activity: "Yoga", type: "Physical", participants: 1, accessibility: "Easy" },
        { activity: "Painting", type: "Art", participants: 1, accessibility: "Easy" },
        { activity: "Reading", type: "Educational", participants: 1, accessibility: "Easy" },
        { activity: "Ballet", type: "Dance", participants: 1, accessibility: "Challenging" },
        { activity: "Writing", type: "Creative", participants: 1, accessibility: "Moderate" },
        { activity: "Pilates", type: "Physical", participants: 1, accessibility: "Easy" },
        { activity: "Knitting", type: "Craft", participants: 1, accessibility: "Easy" },
        { activity: "Watching Movies", type: "Cinematic", participants: 1, accessibility: "Moderate" },
        { activity: "Meditation", type: "Mental", participants: 1, accessibility: "Easy" }
    ];

    try {
        // Looping through the hobby data
        hobbyDataList.forEach((hobbyData, i) => {
            // Create a hobby item element
            const hobbyItem = document.createElement('div');
            hobbyItem.className = 'hobby-item';
            hobbyItem.innerHTML = `
                <p>${hobbyData.activity}</p>
                <button onclick="showModal(${i})">More Info</button>
                <div id="modal-${i}" class="modal" style="display: none;">
                    <div class="modal-content">
                        <span class="close" onclick="closeModal(${i})">&times;</span>
                        <h3>${hobbyData.activity}</h3>
                        <p>Type: ${hobbyData.type}</p>
                        <p>Participants: ${hobbyData.participants}</p>
                        <p>Accessibility: ${hobbyData.accessibility}</p>
                    </div>
                </div>
            `;

            
            hobbyContainer.appendChild(hobbyItem);
        });
    } catch (error) {
        console.error("Error loading hobbies:", error);
        hobbyContainer.innerHTML = "<p>Failed to load hobbies. Please try again later.</p>";
    }
}


function showModal(index) {
    document.getElementById(`modal-${index}`).style.display = "block";
}

function closeModal(index) {
    document.getElementById(`modal-${index}`).style.display = "none";
}

// Lazy loading images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add("lazy-loaded");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});
