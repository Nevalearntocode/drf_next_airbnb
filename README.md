# Airbnb Clone

A web app that allows users to list their properties for rent, make reservations and chat with other users.

[Link to live app](#)

## App Structure

- Each property belongs to a category
- Users can list their properties and make reservations
- Users can chat with each other in real-time
- Users can manage their properties and reservations
- Users can search for properties with advanced filters

## Features

- User authentication and registration
- Property listing and reservation
- Real-time messaging
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS and Redux
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Message broker:** Celery
- **Cloud Storage:** 
- **Deployment:** 

## Getting Started

### Prerequisites

- Node.js (LTS version)
- Python (LTS version)
- Docker and Docker Compose (if run locally)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/Nevalearntocode/drf_next_airbnb
    ```

2. **Install frontend dependencies**
    ```bash
    cd frontend
    npm install
    ```

3. **Set up environment variables**
    - Create `.env.local` file in frontend and `.env.dev` file backend directory.
    - Follow the .env.example files in frontend and backend directory.

### Running with Docker

- In settings.py, comment out the following lines: 
- ![Redis and Database Configs](/images/redis-and-database-configs.png)

### Running the Application

- **Frontend**: Run `npm run dev` in the frontend directory.
- **Backend**: Run `docker compose up --build` in the backend directory.

### Deployment

- The following Github repo is a guide to how to deploy the application with separate PostgreSQL database and Redis service.
- [Deployment guide](#)
- Notes: 

## Images

### Home Page
![home page](/images/home-page.png)

### Property Page
![property page](/images/property-page.png)

### Chat interface
![chat interface](/images/chat-interface.png)

### Search Pages
![search 1](/images/search.png)
![search 2](/images/search-2.png)

## Mobile

### Home Page
![mobile home page 1](/images/mobile-home-page.png)
![mobile home page 2](/images/mobile-home-page-2.png)

### Mobile Chat Interface
![mobile chat interface](/images/mobile-chat-interface.png)

### Mobile Property Page
![mobile property page](/images/mobile-property-page.png)

Please note that I've added some comments and placeholders where information is missing. You can fill in the missing information and update the file as needed.