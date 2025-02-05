# Mini Expense Tracker

## Live Link
[Click here to access the live application](https://render-ke-liye.onrender.com/login)

## Overview
The Mini Expense Tracker is a web application that allows users to track their expenses, view spending insights, and manage their expenses efficiently. The application features authentication, expense CRUD operations, and intelligent spending insights displayed through interactive charts.

## Features

### 1. Authentication
- JWT-based authentication using HTTP-only cookies.
- Secure user registration with first name, last name, email, and password.
- Login and logout functionality with token management.
- Automatic token expiration handling with refresh tokens.

### 2. Expense Management (CRUD)
- Users can add, update, delete, and view expenses.
- Each expense includes:
  - Amount (required, numeric)
  - Category (Food, Travel, etc.)
  - Date (required)
  - Description (optional)
- Expenses are paginated and can be filtered by date range and category.

### 3. Spending Insights
- The app calculates:
  - Total spending per category.
  - Percentage distribution of expenses across categories.
- A bar chart or pie chart displays the spending patterns.
- Backend logic is optimized for handling large datasets.

### 4. Frontend (ReactJS)
- Implemented using React with MUI/Shadcn for UI.
- Features light and dark mode for improved user experience.
- Uses MUI X Charts or Recharts for graphical insights.

### 5. Backend (NodeJS)
- Secure API with JWT authentication and cookie-based sessions.
- RESTful API design with pagination and filtering.
- Efficient data retrieval for large datasets.

### 6. Database (MongoDB)
- Used Mongoose (for MongoDB) 
- Schema designed for optimal querying and indexing.

## Installation and Setup

### 1. Clone the Repository
```bash
 git clone https://github.com/your-github-username/mini-expense-tracker.git
 cd mini-expense-tracker
```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install  # for NodeJS
pip install -r requirements.txt  # for Python
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

### 4. Run the Application
#### Backend
```bash
npm start  # for NodeJS
python app.py  # for Python
```

#### Frontend
```bash
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint        | Description      |
|--------|---------------|----------------|
| POST   | /register     | Register user  |
| POST   | /login        | User login     |
| POST   | /logout       | User logout    |

### Expense Management
| Method | Endpoint        | Description               |
|--------|---------------|---------------------------|
| GET    | /expenses      | Get all expenses          |
| POST   | /expenses      | Add a new expense        |
| PUT    | /expenses/:id  | Update an expense        |
| DELETE | /expenses/:id  | Delete an expense        |

### Insights
| Method | Endpoint        | Description                      |
|--------|---------------|----------------------------------|
| GET    | /insights      | Get category-wise spending data |

## Screenshots

### 1. Login Page
![Login Page)
![image](https://github.com/user-attachments/assets/692d4e2b-6222-4f64-8dd4-9e6b0b12c84d)


### 2. Dashboard
![Dashboard]
![image](https://github.com/user-attachments/assets/33b9aadf-bb2f-40a5-a79b-251802224f38)


### 3. Add Expense
![Add Expense](screenshots/add-expense.png)

### 4. Insights Graph
![Insights Graph](screenshots/insights-graph.png)

## Deployment
The application is deployed on [Render](https://render-ke-liye.onrender.com/login). You can also deploy it on AWS, Vercel, or Heroku.

## Contributing
Feel free to open issues and submit pull requests for improvements.

## License
This project is licensed under the MIT License.

