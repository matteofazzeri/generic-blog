# Blog App

## Overview

A responsive and modern blog application built with React for the front-end and Express with Node.js for the RESTful API. Hosted on Vercel with a PostgreSQL database. Only authorized staff members can create, edit, or delete posts. Designed with scalability and future enhancements in mind.

## Features

### Front-end
- **React:** A dynamic and interactive user interface.
- **Responsive Design:** Optimized for various devices, including desktops, tablets, and smartphones.

### Back-end
- **Express & Node.js:** RESTful API for handling all server-side operations.
  
### Database
- **PostgreSQL on Vercel:** Manages data for posts, users, and comments.
- **Future Plans:** Considering a switch to MongoDB for enhanced flexibility and scalability, and moving to a different host provider.

### User Management
- **Authentication:**  
  Secure registration and login system utilizing JWT (JSON Web Tokens) for managing user sessions, ensuring that only authenticated users can access protected resources.
- **User Roles:**  
  Role-based access control where only "staff" users have the privileges to create, edit, or delete blog posts. User roles are currently managed via SQL GUI on Vercel.

### Blog Management
- **CRUD Operations:** Staff can create, update, and delete blog posts; users can only read posts.

## Technologies Used

- **Front-end:** React
- **Back-end:** Express, Node.js
- **Database:** PostgreSQL (hosted on Vercel), with plans to migrate to MongoDB
- **Hosting:** Vercel
- **Version Control:** Git, GitHub
- **Other Tools:** Vercel SQL GUI for database management

## Future Enhancements
- [ ] **Database Migration:**  
  Transition from PostgreSQL to MongoDB for better scalability and flexibility, which will accommodate the growing needs of the application.

- [ ] **User Role Management:**  
  Develop a user-friendly interface to assign and manage staff roles directly from the application, eliminating the need for manual updates through the SQL GUI.

- [ ] **Real Payment Integration:**  
  Implement real payment gateways to handle transactions securely, enabling future monetization features such as an e-commerce store.

- [ ] **Enhanced Security:**  
  Strengthen the application's security by implementing advanced authentication and authorization mechanisms, ensuring data protection and user privacy.

- [ ] **Advertisement Integration:**  
  Integrate an advertising platform to monetize the blog through targeted ads, generating additional revenue as the user base expands.

- [ ] **E-Commerce Store:**  
  Launch an e-commerce platform within the blog to sell custom merchandise such as t-shirts and other branded products, utilizing the integrated payment system.

- [ ] **UI Enhancements for Responsive Design**:
  Refine the user interface to ensure full responsiveness across all device types, providing a seamless experience for users on mobile, tablet, and desktop devices.

- [ ] **Post Review System**:
  Implement a star-based review system for blog posts, allowing users to rate content on a scale (e.g., 1 to 5 stars). This feature will enhance user engagement by letting readers provide feedback directly on the posts.

- [ ] **Social Login Integration**:
  Implement social login options for Google and Facebook, allowing users to sign in or register quickly using their existing social media accounts. This will streamline the authentication process and potentially increase user engagement.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
