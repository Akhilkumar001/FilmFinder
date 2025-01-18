# FilmFinder

FilmFinder is a web application built with Angular and .NET that allows users to browse, rate, review, and manage movies. The application supports two primary user roles: **Regular Users** and **Admins**. Regular users can explore movies, set reminders, and manage their profiles, while admins oversee movie and user management.

---

## 📋 High-Level Overview

### 🎯 Project Description
The FilmFinder application serves as a comprehensive movie platform:
- **Users** can browse and filter movies, leave ratings and reviews, set reminders for upcoming releases, and track their watch history.
- **Admins** manage movie entries, moderate user reviews, and oversee user accounts. Admin accounts are pre-configured and cannot be created via registration.

---

## 👤 User Roles and Privileges

### **Regular User Features**
- **Authentication**: Login and register functionality.
- **Movie Browsing**: Access a list of all movies with filtering options by genre, language, rating, and release year.
- **Rating & Review**: Share opinions and rate movies after watching.
- **Upcoming Movies**: View and set reminders for upcoming movie releases.
- **Watch History**: Maintain a list of watched movies.
- **Profile Management**: Update personal profile information.

### **Admin Features**
- **Authentication**: Admin login (no registration option).
- **User Management**: Edit, delete, or ban user accounts.
- **Movie Management**: Add, update, or delete movies from the platform.
- **Review Moderation**: Approve or delete user reviews.
- **User Features Access**: All regular user functionalities.

---

## 🚀 Functional Requirements

### **User Management**
- **Registration**: Users can sign up with a username, email, and password.
- **Login**: Both users and admins can securely log in to access their respective dashboards.

### **Movie Browsing**
- Explore released movies with advanced filtering options (genre, rating, release date, etc.).

### **Reminders & Watch History**
- **Reminders**: Add upcoming movies to a personal reminder list and get notified upon release.
- **Watch History**: Keep track of watched movies, including title and viewing date.

### **Admin-Specific Features**
- **Add Movie**: Input new movie details like title, genre, release date, and description.
- **Update Movie**: Modify existing movie details.
- **Delete Movie**: Remove movies from the platform.
- **Manage User Profiles**: Review and manage user statuses (active/blocked).

---

## 🛠️ Technical Stack

- **Frontend**: Angular 16
- **Backend**: .NET for REST APIs
- **Database**: MongoDB (stores user profiles, movies, reviews, and reminders)
- **Authentication**: JSON Web Tokens (JWT) for secure login
- **Styling**: Tailwind CSS, Bootstrap, or Angular Material

---

## 📂 Project Flow

1. Users and admins log in to access their respective dashboards.
2. Regular users explore movies, set reminders, rate and review, and track their watch history.
3. Admins perform movie and user management tasks, including moderating reviews and altering user statuses.

---

### 💡 Future Enhancements
- Add a recommendation system based on user preferences.
- Implement social sharing features for movie ratings and reviews.
- Introduce analytics for admins to monitor platform usage.
