document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('currentyear').textContent = new Date().getFullYear();

    document.getElementById('lastmodified').textContent = document.lastModified;


    // Lazy loading images
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    
    const lastVisitKey = 'lastVisit';
    const lastVisitDate = localStorage.getItem(lastVisitKey);
    const sidebarMessage = document.getElementById("visitMessage");
    const currentDate = Date.now();

    if (!lastVisitDate) {
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));
        if (daysDifference < 1) {
            sidebarMessage.textContent = "Back so soon! Awesome!";
        } else {
            sidebarMessage.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem(lastVisitKey, currentDate);
});
