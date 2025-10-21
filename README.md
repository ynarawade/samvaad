# Samvaad (संवाद)

<!-- ![Samvaad Banner](https://via.placeholder.com/1200x300.png?text=Samvaad+-+Your+Team+Communication+Hub) -->

Samvaad is a real-time chat application inspired by Slack, designed for seamless team communication and collaboration. The name "Samvaad" is a Hindi word for "conversation" or "dialogue".

---

## ✨ Features

-   **Real-time Messaging:** Instantaneous message delivery in channels and direct messages.
-   **Channels:** Organize conversations by creating public or private channels for specific topics, projects, or teams.
-   **Direct Messages:** Send private, one-on-one messages to other users.
-   **User Authentication:** Secure user registration and login system.
-   **User Profiles:** View and manage your user profile.
-   **File Sharing:** (Coming Soon) Share images and files directly in chats.

---

## 🛠️ Tech Stack

This project is built with the following technologies:

-   **Framework:** Next.js (React)
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Real-time Engine:** Socket.IO
-   **Styling:** Tailwind CSS
-   **Authentication:** Kinde

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

You need to have the following software installed on your machine:

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/ynarawade/samvaad.git](https://github.com/ynarawade/samvaad.git)
    cd samvaad
    ```

2.  **Install Dependencies**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    -   Create a `.env` file in the root of the project by copying the example file:
        ```sh
        cp .env.example .env
        ```
    -   Update the `DATABASE_URL` in the `.env` file with your PostgreSQL connection string. It should look something like this:
        ```env
        DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
        JWT_SECRET="your_super_secret_jwt_key"
        # Add other environment variables as needed
        ```

4.  **Run Database Migrations**
    -   Push the schema changes to your database using Prisma:
        ```sh
        npx prisma migrate dev
        ```
    -   This will create the necessary tables in your PostgreSQL database.

5.  **Run the Application**
    -   Start the development server:
        ```sh
        npm run dev
        ```

The application should now be running! Open your browser and navigate to `http://localhost:3000`.

---

##  Usage

After starting the application:
1.  Register for a new account.
2.  Log in with your credentials.
3.  Create a new channel or join an existing one.
4.  Start sending messages in real-time!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.