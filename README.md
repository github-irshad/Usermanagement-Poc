# User Management POC  

This project is a full-stack Proof of Concept (POC) demonstrating a simple **User Management System** with CRUD operations.  

- **Frontend:** React (Vite) + Material UI  
- **Backend:** .NET 8 Web API (Clean Architecture)  
- **Persistence:** In-memory repository (swappable with SQL Server)  

---

## 📂 Project Structure  

/project-root
├── backend/ # .NET Solution
│ ├── Api/ # API Layer (controllers, startup)
│ ├── Core/ # Entities, DTOs, Enums
│ ├── Service/ # Business logic (interfaces + implementations)
│ ├── Repository/ # Data access (interfaces + implementations)
│ ├── Tests/ # Unit Tests
│ └── UserManagement.sln # Solution file
│
├── frontend/ # React App (Vite + Material UI)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── features/ # Feature-based folders (User Management)
│ │ ├── services/ # API calls
│ │ ├── hooks/ # Custom hooks
│ │ └── App.tsx
│ └── package.json
│
└── README.md # This file


---

## 🚀 Getting Started  

### Backend Setup (.NET 8)  

cd backend/Api
dotnet restore
dotnet run

API available at:
👉 https://localhost:5001/swagger

Frontend Setup (React + Vite + MUI)

cd frontend
npm install
npm run dev

App available at:
👉 http://localhost:5173

