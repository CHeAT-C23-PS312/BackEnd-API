#CHeAT Application Readme

This repository contains the source code for a Node.js application that provides functionality for a calorie tracking and recipe recommendation system. The application utilizes MySQL as the database management system and integrates with a machine learning model to provide recipe recommendations.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Database](#database)
- [Contributing](#contributing)


## Getting Started

These instructions will guide you on setting up and running the application on your local machine.

### Prerequisites

To run this application, you need to have the following software installed:

- Node.js (version 14 or higher)
- MySQL (or compatible RDBMS)

### Installation

1. Clone the repository to your local machine:

   ```
   git clone <repository-url>
   ```

2. Change to the project directory:

   ```
   cd <project-directory>
   ```

3. Install the dependencies using npm:

   ```
   npm install
   ```

### Configuration

The application requires configuration for the MySQL database connection. The configuration can be specified in the `database.js` file located in the root directory of the project. Modify the following section with your MySQL database credentials:

```javascript
const connection = mysql.createConnection({
    host: '<database-host>',
    user: '<database-username>',
    password: '<database-password>',
    database: '<database-name>',
});
```

Replace `<database-host>`, `<database-username>`, `<database-password>`, and `<database-name>` with your actual MySQL database information.

### Usage

To start the application, run the following command in the project directory:

```
npm start
```

The application will start and listen for incoming HTTP requests on the specified port (default is `3000`).

## Endpoints

The application exposes several endpoints for user authentication, recipe recommendation, and calorie tracking. The following endpoints are available:

- `POST /signup`: Sign up a new user with a unique username and password.
- `POST /login`: Authenticate a user with their username and password.
- `POST /logout`: Log out the currently authenticated user.
- `POST /chatbot`: Get recipe recommendations based on user messages.
- `GET /recipes/{id}`: Get the details of a recipe by its ID.
- `POST /calorie-tracker/add-meal`: Add a meal to the user's calorie tracker.
- `GET /calorie-tracker/daily-tracker`: Get the daily calorie tracker for the authenticated user.
- `GET /calorie-tracker/daily-tracker/{date}`: Get the total calories for a specific date in the user's calorie tracker.
- `GET /recipes/search?query={query}`: Search for recipes based on a query.

## Database

The application uses MySQL as the database management system. The database connection details are configured in the `database.js` file. The application interacts with the following tables:

- `users`: Stores user information, including username and password.
- `calorie_tracker`: Tracks the user's calorie intake, including date, total calories, meal title, meal photo, and meal calories.

## Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make the necessary changes.
4. Commit and push your changes.
5. Submit a pull request.


