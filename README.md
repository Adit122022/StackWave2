
# StackWave 💡

**StackWave** is a full-featured, community-driven Q&A platform inspired by Stack Overflow — built with **MERN stack**, **Tailwind CSS**, and powered by modern UI/UX. This platform is designed for developers to ask questions, share answers, collaborate, and grow together.

> 🚧 This project is currently under development by [Aditya Sharma](https://github.com/Adit122022). Stay tuned for awesome features!

---

## 🚀 Vision

StackWave is more than just a Q&A site — it's a **collaborative space** for developers and learners.

Planned future features include:

- 💬 **Developer Groups** – Create or join topic-specific groups to discuss ideas and solve doubts together.
- 🧑‍💻 **Collaborative Code Editor** – Practice, debug, and solve code problems together in real-time.
- ⚙️ **AI-Powered Assistance** – Use GenAI to auto-suggest answers, summarize discussions, and generate code snippets.
- 🔐 **Google Authentication** – Seamless sign-in via Google in addition to standard email/password.
- 📱 **Mobile Responsive Design** – Optimized experience across all devices.

---

## ✨ Core Features (Completed & In Progress)

- 🧠 **Ask & Answer Questions** – Post technical questions and answer others in a structured format.
- 🧾 **Tag System** – Categorize and search content easily with tags.
- 👤 **User Authentication** – Secure sign up / login using JWT (Google login coming soon).
- 🔍 **Search & Filters** – Search by keywords, filter by tags, sort by latest or popular.
- 🌓 **Dark Mode** – Toggle between light and dark modes with persistence.
- 🔐 **Role-Based Access Control** – Admin vs. regular user permissions.
- 📊 **Follow System** – Follow users and get a personalized feed (Coming Soon).
- 🛎️ **Notification System** – Get updates on interactions and followers (Planned).
- 📥 **Media Uploads** – Upload profile images or attach media to posts (via Cloudinary/Supabase).

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Vite)
- **React Router DOM**
- **Zustand** – Lightweight state management
- **Tailwind CSS + DaisyUI** – Utility-first modern UI
- **Axios** – API calls
- **Lucide / Heroicons** – Icon libraries

### Backend
- **Node.js** / **Express.js**
- **MongoDB** (via Mongoose ODM)
- **JWT Authentication**
- **Cloudinary / Supabase** – Media storage
- **Multer** – File uploads

---

## 📁 Project Structure (Frontend)

```

src/
├── assets/              # Images, icons, logos
├── components/          # Reusable UI components
│   ├── common/          # Buttons, inputs, etc.
│   ├── sidebar/         # Sidebar elements
│   └── question/        # Question-specific components
├── context/             # Auth and theme context
├── hooks/               # Custom React hooks
├── layouts/             # Layout wrappers
├── pages/               # All route pages
├── routes/              # Route declarations
├── stores/              # Zustand stores
├── utils/               # Helper functions
└── App.jsx              # Main entry point

````

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Adit122022/StackWave2.git
cd StackWave2
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root and add your API base URL:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

* User registers or logs in using email and password.
* JWT token is generated and stored via cookies (HttpOnly).
* On frontend, routes are protected based on token presence and user role.
* **Google OAuth integration coming soon**.

---

## 🛣️ Roadmap

| Feature                      | Status        |
| ---------------------------- | ------------- |
| Basic Ask/Answer Flow        | ✅ Completed   |
| Tagging System               | ✅ Completed   |
| Dark Mode                    | ✅ Completed   |
| Sidebar Navigation           | ✅ Completed   |
| Search & Filter by Tags      | ✅ Completed   |
| Role-Based Admin Access      | ✅ Completed   |
| Follow System                | ⏳ In Progress |
| Notification System          | 📝 Planned    |
| Google Authentication        | 📝 Planned    |
| Developer Groups             | 📝 Planned    |
| Collaborative Code Editor    | 📝 Planned    |
| AI-Powered Chatbot & CodeGen | 📝 Planned    |

---

## 🤝 Contributing

Want to contribute? Here’s how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/YourFeature

# 3. Commit your changes
git commit -m "Add your message"

# 4. Push to the branch
git push origin feature/YourFeature

# 5. Create a Pull Request 🚀
```

Bug reports, feature suggestions, and PRs are always welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ About Me

**Aditya Sharma**
📧 [Email](mailto:adity122022@gmail.com)
🐙 [GitHub](https://github.com/Adit122022)
🎓 BCA Graduate | Web Developer | React & Node Enthusiast

> Building StackWave to help developers learn, collaborate, and grow together.
> I’m open to feedback and collaboration opportunities. Feel free to reach out!

---


