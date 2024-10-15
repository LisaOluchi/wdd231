// Update current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Add event listeners for hamburger menu and navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle 'active' class
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Optionally close the menu when a link inside it is clicked (for better UX on mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Your course data
const courses = [
    { courseCode: 'CSE 110', courseName: 'Programming Building Blocks', credits: 3, completed: true },
    { courseCode: 'WDD 130', courseName: 'Web Fundamentals', credits: 3, completed: true },
    { courseCode: 'CSE 111', courseName: 'Programming with Functions', credits: 4, completed: true },
    { courseCode: 'CSE 210', courseName: 'Object-Oriented Programming', credits: 3, completed: true },
    { courseCode: 'WDD 131', courseName: 'Intermediate CSS', credits: 3, completed: true },
    { courseCode: 'WDD 231', courseName: 'Web Frontend Development', credits: 3, completed: false }
];

// Set 'completed' status for specific courses
courses.forEach(course => {
    if (course.courseCode === 'CSE' || course.courseCode === 'WDD 130') {
        course.completed = true;
    }
});

// Function to display courses
function displayCourses(courseList) {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = ''; // Clear the previous content

    courseList.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-card');

        if (course.completed) {
            courseDiv.classList.add('completed-course'); // Different style for completed courses
        }

        courseDiv.innerHTML = `
            <h3>${course.courseCode}</h3>
            <p>${course.courseName}</p>
            <p>Credits: ${course.credits}</p>
        `;

        // Add event listener to display course details
        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(courseDiv);
    });
}

// Function to display course details in the modal
function displayCourseDetails(course) {
    const courseDetails = document.getElementById('course-details');
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    // Close modal button
    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });

    // Close modal when clicking outside
    courseDetails.addEventListener('click', (event) => {
        if (event.target === courseDetails) {
            courseDetails.close();
        }
    });
}

// Function to display total credits
function displayTotalCredits() {
    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
    const creditContainer = document.getElementById('totalCredits');
    creditContainer.textContent = `Total Credits Required: ${totalCredits}`;
}

// Event listeners for course filtering and total credits
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    displayTotalCredits();
});

document.getElementById('showAll').addEventListener('click', () => filterCourses('All'));
document.getElementById('showCSE').addEventListener('click', () => filterCourses('CSE'));
document.getElementById('showWDD').addEventListener('click', () => filterCourses('WDD'));

// Function to filter courses
function filterCourses(filter) {
    let filteredCourses;
    if (filter === 'All') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.courseCode.startsWith(filter));
    }
    displayCourses(filteredCourses);
}
