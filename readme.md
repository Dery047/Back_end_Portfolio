To Do List Project  
A Django-powered To Do List application featuring a RESTful API backend combined with a simple, clean React frontend for an enhanced user experience. This project allows users to manage tasks efficiently with full CRUD operations, showcasing integration between Django REST Framework and a user-friendly interface.

🔄 Update  
I added a secure authentication system using JWT (JSON Web Tokens). Now, users must register and log in to access and manage their tasks. The token-based authentication is handled via Django REST Framework and the djangorestframework-simplejwt package, where the users can get a token by creating.

### Features:  
- Full CRUD operations for task management, including user login via access token (using a previously created superuser)  
- Simple, minimal frontend built with React for a clean user experience  

### 🔧 Upcoming features:  
- 🗑️ A view to display deleted tasks  
- 👤 User registration  
- 🔐 JWT-based authentication with access and refresh tokens for user creation and providing extended access through token-based sessions  
- ✅ Ability to mark tasks as completed and view completed tasks
