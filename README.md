# EchoVerse

Welcome to **EchoVerse** – A modern and interactive forum-style platform where users can express ideas, share knowledge, interact, and build community through meaningful posts and comments.

🌐 **Live Site:** [EchoVerse](https://echoverse-80b56.web.app/)

---

## 📌 Features Overview

### 🔝 Navbar

* Logo + Website Name
* Home | Membership | Notification Icon | Join Us (Login)
* If Logged in: Show profile picture with a dropdown:

  * Username (non-clickable)
  * Dashboard
  * Logout

### 🎯 Banner Section

* Search bar (backend-based search by tags)
* Displays results below banner

### 🏷️ Tags Section

* Displays all available tags (used to search posts)

### 📢 Announcement Section

* Only visible if there are announcements
* Notification icon shows count (data from collection)

### 🏠 Homepage

* Shows all posts sorted by **newest to oldest**
* Each post displays:

  * Author image + name
  * Title, Tags, Time
  * Comments count, Upvotes/Downvotes
* **Sort by Popularity** based on `(UpVote - DownVote)`
* **Pagination:** 5 posts per page

### 📄 Post Details Page

Route: `/post/:id`

* Shows:

  * Author image + name
  * Title, Description, Tags, Time
  * UpVote / DownVote / Comment / Share (with `react-share`)
* Below details: Comments section

  * Only logged-in users can comment, vote, and share

---

## 💰 Membership Page *(Private Route)*

* Secure payment to become a member
* Cost: N taka/dollar
* Gold Badge given to members
* Members can post **more than 5 posts**

---

## 📊 User Dashboard *(Private Route)*

### 🧑 My Profile

* Name, image, email, badge(s), 3 recent posts
* Badges:

  * 🥉 Bronze: Registered user
  * 🥇 Gold: Member user

### 📝 Add Post

* Form fields:

  * Author Name, Image, Email
  * Title, Description, Tag (via `react-select` dropdown)
  * Upvote/Downvote (default 0)
* Limit:

  * Non-members: Max 5 posts
  * Members: Unlimited posts
* If limit reached: Show **Become a Member** button instead of form

### 📚 My Posts

* Table format:

  * Title | Vote Count | Comment | Delete
* Comment Page: `/comments/:postId`

  * View all comments in table:

    * Email | Comment Text | Feedback | Report
  * **Feedback dropdown** activates Report button
  * Text > 20 chars? Show `...Read More` link (opens modal)

---

## 🔐 Join Us Page

* Authentication page with **Email/Password + Social Login**
* Toggle link for Register/Login
* Badge assignment on first registration (🥉 Bronze)
* Form built with `react-hook-form`
* No email verification / password reset required (per instruction)

---

## 🛠️ Admin Dashboard *(Private Route)*

### 👤 Admin Profile

* Name, Image, Email
* Stats:

  * Number of Posts, Comments, Users
* Pie Chart showing all data using `recharts`

### 👥 Manage Users

* Table with:

  * Name | Email | Make Admin | Membership Status
* Search users by username (server-side search)
* Pagination (10 users/page)

### 🚨 Reported Comments

* View reports submitted by users
* Admin actions (delete comment, warn user, etc.)
* Custom feedback system

### 📢 Make Announcement

* Form:

  * Author Image + Name
  * Title + Description
* Visible on Home if exists

### 🏷️ Add Tags

* Admin can add new tags from this panel
* Tags appear in post form dropdown (via React Select)

---

## 🔐 Authentication & Security

* JWT implemented
* Token stored securely on login (email/password & social)

---

## 📦 Tech Stack

| Frontend              | Backend       | Others       |
| --------------------- | ------------- | ------------ |
| React.js              | Express.js    | JWT Auth     |
| TailwindCSS + DaisyUI | MongoDB       | React Router |
| React Hook Form       | Firebase Auth | React Share  |
| React Select          | Node.js       | Recharts     |

---

## 🧪 Bonus Features

* Admin dashboard UI with chart visualizations
* Modal preview for long comments
* Responsive & accessible UI design
* Smooth navigation with private routing

---

## 📞 Contact

**Project Name:** EchoVerse
**Developed by:** Kawser Ahmed Nihad
**Email:** [kawserahmednihad@gmail.com](mailto:kawserahmednihad@gmail.com)
**City:** Mymensingh, Bangladesh

---

## 📢 Final Notes

* Authentication, authorization, and access control properly implemented
* Admin and User dashboards built with role-based layouts

🌟 Thank you for checking out **EchoVerse**!
