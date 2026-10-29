
"use strict";


// Course data
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Foundations of programming and problem solving.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Introduction to HTML and CSS.",
    technology: ["HTML", "CSS"],
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Develop reusable functions and organized programs.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Object-oriented programming and polymorphism.",
    technology: ["C#"],
    completed: true
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Responsive web pages and JavaScript.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Accessibility and front-end development.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false
  }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");
const courseButtons = document.querySelectorAll("[data-filter]");

// Create a course card dynamically
function createCourseCard(course) {
  const card = document.createElement("li");

  card.className =
    `course-card${course.completed ? " completed" : ""}`;

  const heading = document.createElement("h3");
  heading.textContent = `${course.subject} ${course.number}`;

  const description = document.createElement("p");
  description.className = "course-name";
  description.textContent = course.title;

  const metadata = document.createElement("div");
  metadata.className = "course-meta";

  const status = document.createElement("span");
  status.className = "course-status";
  status.textContent =
    course.completed ? "✓ Completed" : "Not completed";

  const credits = document.createElement("span");
  credits.className = "course-credits";
  credits.textContent = `${course.credits} credits`;

  metadata.append(status, credits);
  card.append(heading, description, metadata);

  return card;
}

// Filter courses and calculate displayed credits
function renderCourses(filter = "ALL") {
  if (!courseList || !creditTotal) return;

  const visibleCourses =
    filter === "ALL"
      ? courses
      : courses.filter((course) => course.subject === filter);

  // Display courses
  courseList.replaceChildren(
    ...visibleCourses.map(createCourseCard)
  );

  // Calculate total credits using reduce()
  const total = visibleCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  creditTotal.textContent = String(total);

  // Update active filter button
  courseButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === filter)
    );
  });
}

// Add click events to filter buttons
courseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderCourses(button.dataset.filter);
  });
});

// Display all courses when the page loads
renderCourses();
