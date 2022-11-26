import React from 'react';

const Blogs = () => {
  const blogs = [
    {
      _id: 1,
      question: 'What are the different ways to manage a state in a React application?',
      answer:
        'The Four Kinds of React State to Manage 1. Local state 2. Global state 3. Server state 4. URL state. Local (UI) state – Local state is data we manage in one or another component. Global (UI) state – Global state is data we manage across multiple components. Server state – Data that comes from an external server that must be integrated with our UI state. URL state – Data that exists on our URLs, including the pathname and query parameters.',
    },
    {
      _id: 2,
      question: 'How does prototypical inheritance work?',
      answer:
        'Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.',
    },
    {
      _id: 3,
      question: 'What is a unit test? Why should we write unit tests?',
      answer:
        'The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.',
    },
    {
      _id: 4,
      question: 'React vs. Angular vs. Vue?',
      answer:
        'React is a JavaScript library developed by Facebook which allows you to build UI components. It facilitates the creation of interactive User Interfaces. It also makes the code easier to understand and launch. React Java Script framework uses server-side rendering to provide a flexible, performance-oriented solution. Angular is a structural framework for developing dynamic web apps. It allows developers to use HTML as a template language and allows HTML’s syntax to express the application’s components briefly and clearly. It is a fully featured JavaScript framework that helps developing dynamic, single page web apps. It also supports the (MVC) programming structure. Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You. React is a JavaScript library, whereas Angular is a front-end framework. React requires solid JavaScript skills, while Vue. js is more oriented to novice developers. Angular utilizes real DOM, which renders the entire web/app page even when a single component is changed. On the other hand, Vue. js employs Virtual DOM, which only renders the real DOM upon the components that have been changed.',
    },
  ];

  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        {blogs.map((blog) => (
          <div key={blog._key} className="bg-white py-3 px-5 rounded-lg mb-5 border">
            <h2 className="text-3xl font-semibold">{blog.question}</h2>
            <p className="lh-18 mt-3">{blog.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
