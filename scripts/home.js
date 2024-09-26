document.getElementById('currentyear').textContent = new Date().getFullYear();

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


const courses = [
    { courseCode: 'CSE 110', courseName: 'Programming Building Blocks', credits: 3, completed: true },
    { courseCode: 'WDD 130', courseName: 'Web Fundamentals', credits: 3, completed: true },
    { courseCode: 'CSE 111', courseName: 'Programming with Functions', credits: 4, completed: true },
    { courseCode: 'CSE 210', courseName: 'Object-Oriented Programming', credits: 3, completed: true },
    { courseCode: 'WDD 131', courseName: 'Intermediate CSS', credits: 3, completed: true },
    { courseCode: 'WDD 231', courseName: 'Web Frontend Development', credits: 3, completed: false }
  ];


courses.forEach(course =>{
    if (course.courseCode === 'CSE' || course.courseCode ==='WDD 130'){
        course.completed= true;
    }
})

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
      
      courseContainer.appendChild(courseDiv);
    });
  }

  function filterCourses(filter){
    let filteredCourses;

    if (filter ==='All'){
        filteredCourses = courses;
    } else{
        filteredCourses = courses.filter(course => course.courseCode.startsWith(filter));
    }

    displayCourses(filteredCourses)

    }
    function displayTotalCredits() {
        const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
        const creditContainer = document.getElementById('totalCredits');
        creditContainer.textContent = `Total Credits Required: ${totalCredits}`;
      }
      
      // all courses and total credits
      document.addEventListener('DOMContentLoaded', () => {
        displayCourses(courses);  
        displayTotalCredits();    
      });

      document.getElementById('showAll').addEventListener('click', () => filterCourses('All'));
      document.getElementById('showCSE').addEventListener('click', () => filterCourses('CSE'));
      document.getElementById('showWDD').addEventListener('click', () => filterCourses('WDD'));
  