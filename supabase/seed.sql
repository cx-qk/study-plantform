-- Seed categories
insert into public.categories (id, name, icon) values
  ('a1000000-0000-0000-0000-000000000001', 'Programming', 'code'),
  ('a1000000-0000-0000-0000-000000000002', 'Mathematics', 'calculator'),
  ('a1000000-0000-0000-0000-000000000003', 'Science', 'flask-conical'),
  ('a1000000-0000-0000-0000-000000000004', 'Language', 'languages'),
  ('a1000000-0000-0000-0000-000000000005', 'Business', 'briefcase'),
  ('a1000000-0000-0000-0000-000000000006', 'Design', 'palette'),
  ('a1000000-0000-0000-0000-000000000007', 'Engineering', 'cog'),
  ('a1000000-0000-0000-0000-000000000008', 'Music', 'music');

-- Seed courses
insert into public.courses (id, title, description, thumbnail_url, category_id, duration_minutes) values
  ('b1000000-0000-0000-0000-000000000001', 'Introduction to JavaScript', 'Learn the fundamentals of JavaScript programming from scratch. This course covers variables, functions, objects, and modern ES6+ features.', '/thumbnails/javascript.jpg', 'a1000000-0000-0000-0000-000000000001', 480),
  ('b1000000-0000-0000-0000-000000000002', 'Python for Beginners', 'A comprehensive introduction to Python programming. Perfect for absolute beginners who want to learn coding.', '/thumbnails/python.jpg', 'a1000000-0000-0000-0000-000000000001', 600),
  ('b1000000-0000-0000-0000-000000000003', 'Calculus I', 'Master the fundamentals of differential and integral calculus. Covers limits, derivatives, and integrals.', '/thumbnails/calculus.jpg', 'a1000000-0000-0000-0000-000000000002', 720),
  ('b1000000-0000-0000-0000-000000000004', 'Linear Algebra Essentials', 'Understand vectors, matrices, transformations, and eigenvalues. Essential for data science and engineering.', '/thumbnails/linear-algebra.jpg', 'a1000000-0000-0000-0000-000000000002', 540),
  ('b1000000-0000-0000-0000-000000000005', 'Introduction to Physics', 'Explore the laws of motion, energy, and thermodynamics. Includes hands-on problem solving.', '/thumbnails/physics.jpg', 'a1000000-0000-0000-0000-000000000003', 660),
  ('b1000000-0000-0000-0000-000000000006', 'React & Next.js Masterclass', 'Build modern web applications with React and Next.js. Covers hooks, server components, and deployment.', '/thumbnails/react.jpg', 'a1000000-0000-0000-0000-000000000001', 900),
  ('b1000000-0000-0000-0000-000000000007', 'Business Strategy Fundamentals', 'Learn core business strategy frameworks including SWOT analysis, competitive advantage, and market positioning.', '/thumbnails/business.jpg', 'a1000000-0000-0000-0000-000000000005', 360),
  ('b1000000-0000-0000-0000-000000000008', 'UI/UX Design Principles', 'Master the principles of user interface and user experience design. Learn wireframing, prototyping, and usability testing.', '/thumbnails/design.jpg', 'a1000000-0000-0000-0000-000000000006', 420);

-- Seed lessons for "Introduction to JavaScript"
insert into public.lessons (course_id, title, content, "order", duration_minutes) values
  ('b1000000-0000-0000-0000-000000000001', 'What is JavaScript?', 'JavaScript is a versatile programming language that powers the interactive web. In this lesson, we explore its history, use cases, and why it remains one of the most popular languages in the world.', 1, 30),
  ('b1000000-0000-0000-0000-000000000001', 'Variables and Data Types', 'Learn about let, const, and var. Understand strings, numbers, booleans, null, undefined, and symbols.', 2, 45),
  ('b1000000-0000-0000-0000-000000000001', 'Functions and Scope', 'Understand function declarations, expressions, arrow functions, and how scope works in JavaScript.', 3, 60),
  ('b1000000-0000-0000-0000-000000000001', 'Objects and Arrays', 'Deep dive into JavaScript objects, arrays, and their built-in methods for data manipulation.', 4, 60),
  ('b1000000-0000-0000-0000-000000000001', 'DOM Manipulation', 'Learn how to interact with HTML elements using JavaScript. Selecting, modifying, and creating elements dynamically.', 5, 45),
  ('b1000000-0000-0000-0000-000000000001', 'Async JavaScript', 'Master callbacks, promises, and async/await for handling asynchronous operations.', 6, 60),
  ('b1000000-0000-0000-0000-000000000001', 'ES6+ Modern Features', 'Explore destructuring, spread operator, template literals, modules, and other modern JavaScript features.', 7, 45),
  ('b1000000-0000-0000-0000-000000000001', 'Final Project', 'Build a complete interactive web application using everything you have learned in this course.', 8, 90);

-- Seed lessons for "Python for Beginners"
insert into public.lessons (course_id, title, content, "order", duration_minutes) values
  ('b1000000-0000-0000-0000-000000000002', 'Getting Started with Python', 'Install Python, set up your development environment, and write your first Python program.', 1, 30),
  ('b1000000-0000-0000-0000-000000000002', 'Variables and Basic Types', 'Learn about Python variables, strings, integers, floats, and type conversion.', 2, 45),
  ('b1000000-0000-0000-0000-000000000002', 'Control Flow', 'Master if/else statements, for loops, while loops, and conditional expressions.', 3, 60),
  ('b1000000-0000-0000-0000-000000000002', 'Functions', 'Define and call functions, understand parameters, return values, and lambda expressions.', 4, 60),
  ('b1000000-0000-0000-0000-000000000002', 'Data Structures', 'Work with lists, tuples, dictionaries, and sets for organizing data.', 5, 60),
  ('b1000000-0000-0000-0000-000000000002', 'File I/O and Exceptions', 'Read and write files, handle errors gracefully with try/except blocks.', 6, 45);

-- Seed lessons for "React & Next.js Masterclass"
insert into public.lessons (course_id, title, content, "order", duration_minutes) values
  ('b1000000-0000-0000-0000-000000000006', 'React Fundamentals', 'Understand components, JSX, and the virtual DOM. Build your first React component.', 1, 60),
  ('b1000000-0000-0000-0000-000000000006', 'State and Props', 'Learn how data flows in React applications through props and state management.', 2, 60),
  ('b1000000-0000-0000-0000-000000000006', 'Hooks Deep Dive', 'Master useState, useEffect, useContext, useReducer, and custom hooks.', 3, 90),
  ('b1000000-0000-0000-0000-000000000006', 'Next.js App Router', 'Set up a Next.js project, understand file-based routing, layouts, and server components.', 4, 90),
  ('b1000000-0000-0000-0000-000000000006', 'Data Fetching and Server Actions', 'Fetch data in server components, implement server actions for mutations.', 5, 75),
  ('b1000000-0000-0000-0000-000000000006', 'Deployment to Vercel', 'Deploy your Next.js application to Vercel with environment variables and custom domains.', 6, 45);
