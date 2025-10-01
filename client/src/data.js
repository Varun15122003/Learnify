export const initialCourses = [
    { id: 1, title: 'Introduction to React Hooks', mentor: 'Jane Doe', content: 'This course covers the fundamentals of React Hooks, including useState, useEffect, and useContext. Perfect for beginners looking to level up their React skills.', completed: false, points: 50, category: 'Web Development' },
    { id: 2, title: 'Advanced CSS Grid Techniques', mentor: 'John Smith', content: 'Dive deep into CSS Grid layout. Learn how to create complex, responsive layouts with ease. We will cover topics like grid-template-areas, minmax(), and auto-fit.', completed: false, points: 75, category: 'Design' },
    { id: 3, title: 'Data Structures in JavaScript', mentor: 'Emily White', content: 'Explore common data structures like Arrays, Stacks, Queues, and Linked Lists, all implemented in JavaScript. A crucial topic for interview preparation.', completed: false, points: 100, category: 'Computer Science' },
    { id: 4, title: 'UI/UX Design Principles', mentor: 'Jane Doe', content: 'Learn the core principles of great UI/UX design. We will discuss user research, wireframing, prototyping, and visual design fundamentals.', completed: false, points: 60, category: 'Design' },
];

export const initialUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', password: 'password', role: 'Learner', points: 120, courses_completed: [3, 4] },
    { id: 2, name: 'Bob', email: 'bob@example.com', password: 'password', role: 'Learner', points: 50, courses_completed: [1] },
    { id: 3, name: 'Jane Doe', email: 'jane@example.com', password: 'password', role: 'Mentor', points: 0, courses_completed: [] },
    { id: 4, name: 'John Smith', email: 'john@example.com', password: 'password', role: 'Mentor', points: 0, courses_completed: [] },
    { id: 5, name: 'Emily White', email: 'emily@example.com', password: 'password', role: 'Mentor', points: 0, courses_completed: [] },
];
