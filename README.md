![cover](https://github.com/user-attachments/assets/d567a002-b2ce-4256-bf1f-3c949ea792d9)

# FireGrid 🔥📋  
**A Real-Time Collaborative Task Management App**  

FireGrid is a powerful, real-time task management application designed for both personal use and team collaboration. With seamless drag-and-drop functionality, advanced fuzzy search, customizable task cards, and dynamic filters, managing your tasks has never been easier!  

---


## 🔑 **Key Features** 

### 1. **Real-Time Task Management**  
- **Collaborate effortlessly**: Updates on tasks are instantly synced across all devices.  
- Work on shared boards with your team or manage personal boards.  

### 2. **FireGrid AI Assistance**  
- Integrated **FireGrid AI Bot** to assist you if you're stuck while using the app.  
- Get step-by-step guidance and suggestions from the AI directly in the app.

### 3. **Board Forking**  
- Fork other users' board templates by simply clicking the **Fork** button.  
- Create a copy and make it your own instantly.  

### 4. **Real-Time Cursor Presence**  
- See other users' cursors in real time when working on the same board or organization.  
- Enhanced collaboration with visual feedback of who is editing what.

### 5. **Customizable Task Cards and Tables**  
- Change colors to categorize tasks (e.g., priority levels, task types).  
- Add tags, due dates, and other metadata to keep everything organized. 

### 6. **Seamless Drag-and-Drop Functionality**  
- Intuitive drag-and-drop to rearrange tasks.  
- Move tasks between columns or boards with ease.

### 7. **Advanced Fuzzy Search**  
- Quickly locate tasks using keywords, even with typos or partial matches.  
- Search across all boards and its categories.

### 8. **Filters boards**  
- Filter boards by:  
  - Order (asc, desc).  
  - Dates.  
  - Categories.  

### 9. **Seamless Login with Clerk Auth System**  
- Log in effortlessly using GitHub, Google, or email authentication powered by Clerk.

### 10. **Favoriting Boards**  
- Favorite and unfavorite boards to quickly access the ones that matter most.  
### 11. **Light and Dark Theme**  
- Switch between light and dark modes to suit your preference and reduce eye strain.  

---

## 🚀 **Tech Stack**  

- **Frameworks and Libraries**: Next.js, React.js, ShadCN UI Component Library, Tailwind CSS.  
- **Real-Time Collaboration**: Liveblocks for real-time presence and collaboration.  
- **Backend**: Hono for APIs, Vercel AI for AI integrations.  
- **AI Bot**: LangChain and Gemini, integrated with Datastax for efficient query processing.  
- **Database**: Neon PostgreSQL with Drizzle ORM for structured and scalable data management.  
- **State Management**: TanStack Query for efficient data fetching and caching.  
- **DevOps and Monitoring**: Docker for containerization, Sentry for error tracking.  
- **Deployment**: Vercel for seamless CI/CD and hosting.

---

## 📂 **Modules**  

### 1. **Personal Task Boards**  
- Create boards for personal goals and daily task management.  

### 2. **Team Collaboration**  
- Invite team members to collaborate on boards.  
- Assign tasks to specific members and track progress.  

### 3. **Customization**  
- Change board themes and colors to suit your style.  
- Organize columns based on workflows like Kanban (e.g., To-Do, In Progress, Done).  

---

## 🌟 **Future Enhancements**  

- **Notifications**: Get real-time notifications for task updates.  
- **Analytics**: Insights into task progress, team productivity, and deadlines.  
- **Integrations**: Connect with tools like Google Calendar, Slack, and Trello. 
- **Stripe**: Implementing the stripe to pay bills of FireGrid. 

---


## 🛠️ **Installation**

Follow these steps to install and set up FireGrid:

### 1. **Prerequisites**
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) (if using containerized deployment)
- [Git](https://git-scm.com/) (to clone the repository)
- A database instance (e.g., [Neon PostgreSQL](https://neon.tech/))
- Optional: [Vercel CLI](https://vercel.com/) for deployment on Vercel.

---
Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/khalidkhankakar/Fire-Grid.git
   cd fire-grid
   ```
2. **Setup the Enviroment key**:
   ```bash
    # Postgress database key
    # https://neon.tech/
    POSTGRES_URL=postgresql://neondb_owner:***********************

    # Clerk Env Keys
    # https://clerk.com/
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_****************
    WEBHOOK_SECRET=*********************
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    CLERK_SECRET_KEY=sk_test_ynGfbMyuNwmP3OV3pSEgvV9EQynQgJgyBdmFt9H34j
    
    # https://sentry.io/welcome/
    SENTRY_AUTH_TOKEN=****
    
    # https://aistudio.google.com/app/apikey
    GOOGLE_API_KEY=*****
    
    # https://www.datastax.com/
    ASTRA_DB_APPLICATION_TOKEN=******
    ASTRA_DB_API_ENDPOINT=*****
    ASTRA_DB_NAMESPACE=*****
   
   # Also add your own liveblocks key and project
   # https://liveblocks.io/
   

   ```
3. **Install Dependencies**:
   ```bash
    npm install --force 
    or
    pnpm install
   ```
4. **Run the Development Server**:
   ```bash
    npm run dev
    or 
    pnpm run dev
    
    ```

---

## 🎯 **Why Choose FireGrid?**  

Whether you're a solo professional or managing a large team, FireGrid empowers you to stay organized, productive, and connected. Experience task management that's:  
- **Efficient**: Real-time updates mean no more delays.  
- **Flexible**: Customize workflows and collaborate your way.  
- **Powerful**: AI integration, search, and filter tools to find exactly what you need.  

---
## 🤝 Contribution Guidelines
  We welcome contributions! Follow these steps:

  1. Fork the repository 🍴
  2. Create a new branch: git checkout -b feature-name 🌿
  3. Commit changes: git commit -m "Add new feature" 📝
  4. Push to branch: git push origin feature-name 🚀
  5. Submit a pull request 🔄

## 👩‍💻 Authors
  [khalidkhankakar](https://github.com/khalidkhankakar/) 💻

## 🌐 Connect With Us
  💬 Have questions or feedback? Open an issue.
  ⭐ Enjoyed the project? Give us a star!

## 📌 Note
This project is under active development. Stay tuned for updates! 🚧✨
