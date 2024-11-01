// Function to save the visitor's name in localStorage
function saveName() {
    const nameInput = document.getElementById('name-input');
    const visitorName = document.getElementById('visitor-name');

    // Save the name in localStorage
    localStorage.setItem('visitorName', nameInput.value);

    // Update the displayed name
    visitorName.textContent = nameInput.value;

    // Clear the input field
    nameInput.value = '';
}

// Array of image URLs for the gallery
const galleryImages = [
    "images/headsets.jpeg",  
    "images/Metal.jpeg",
    "images/photo3 (2).jpeg",
    "images/photo4 (2).jpeg",
    "images/printer.jpg"
    
];

// Function to display the gallery images
function displayGallery() {
    const galleryDiv = document.getElementById('gallery');
    
    // Clear the gallery div before adding new images
    galleryDiv.innerHTML = '';

    // Loop through the array and create img elements
    galleryImages.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl; // Set the image source
        img.alt = "Gallery image"; // Alt text for the image
        img.classList.add("gallery-image"); // Optional: Add a class for styling

        // Append the image to the gallery div
        galleryDiv.appendChild(img);
    });
}

// Function to display a random inspirational quote
function displayQuote() {
    const quotes = [
        "Creativity takes courage. - Henri Matisse",
        "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Inspiration exists, but it has to find you working. - Pablo Picasso",
        "Every artist was first an amateur. - Ralph Waldo Emerson"
    ];

    // Get a random quote from the array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = randomQuote;
}

// Function to load the visitor's name from localStorage on page load
function loadVisitorName() {
    const storedName = localStorage.getItem('visitorName');
    if (storedName) {
        document.getElementById('visitor-name').textContent = storedName;
    }
}

// Function to display the current year
function displayCurrentYear() {
    const currentYearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Function to display the last modified date
function displayLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastmodified');
    const lastModifiedDate = document.lastModified; // Get the last modified date of the document
    lastModifiedElement.textContent = lastModifiedDate;
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadVisitorName();
    displayQuote();
    displayCurrentYear();
    displayLastModifiedDate();
    displayGallery(); // Call the function to display the gallery
});
