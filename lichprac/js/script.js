
function saveName() {
    const nameInput = document.getElementById('name-input');
    const visitorName = document.getElementById('visitor-name');

    
    localStorage.setItem('visitorName', nameInput.value);

    // Update displayed name
    visitorName.textContent = nameInput.value;

    // Clear the input field
    nameInput.value = '';
}


const galleryImages = [
    "images/headsets.jpeg",  
    "images/Metal.jpeg",
    "images/photo3 (2).jpeg",
    "images/photo4 (2).jpeg",
    "images/printer.jpg"
    
];


function displayGallery() {
    const galleryDiv = document.getElementById('gallery');
    
   
    galleryDiv.innerHTML = '';

    galleryImages.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl; 
        img.alt = "Gallery image"; 
        img.classList.add("gallery-image"); 

        
        galleryDiv.appendChild(img);
    });
}

// display a random inspirational quote
function displayQuote() {
    const quotes = [
        "Creativity takes courage. - Henri Matisse",
        "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Inspiration exists, but it has to find you working. - Pablo Picasso",
        "Every artist was first an amateur. - Ralph Waldo Emerson"
    ];

    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = randomQuote;
}


function loadVisitorName() {
    const storedName = localStorage.getItem('visitorName');
    if (storedName) {
        document.getElementById('visitor-name').textContent = storedName;
    }
}


function displayCurrentYear() {
    const currentYearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}


function displayLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastmodified');
    const lastModifiedDate = document.lastModified;
    lastModifiedElement.textContent = lastModifiedDate;
}

// DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadVisitorName();
    displayQuote();
    displayCurrentYear();
    displayLastModifiedDate();
    displayGallery(); // Call the function to display the gallery
});
