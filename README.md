# Airbnb Clone

A web app that allows users to list their properties for rent, make reservations and chat with other users.

[Link to live app](#)

## App Structure

- Each property belongs to a category (14 categories for now, make dynamic if needed)
- Users can list their properties for rent
- Users can make reservations for properties, landlord and guests (property and reservation's owner) can manage reservations

## Features

- User authentication and registration
- Property listing and reservation
- Real-time messaging
- Responsive design for mobile and desktop
- Pagination for property listings

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS and Redux
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL Neon (Docker for local development)
- **Message broker:** Redis Cloud (Docker for local development)
- **Cloud Storage:** Cloudflare R2
- **Deployment:** AWS EC2 for Django Backend and Vercel for Next.js Frontend

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
    - Create  `.env.dev` file in root and `.env.local` file in frontend directory.
    - Follow the .env.example files in frontend and backend directory.

### Running the Application

- **Backend**: Run `docker compose up --build` in the root directory.
- **Frontend**: Run `npm run dev` in the frontend directory.

### Deployment

**AWS services** Route 53, EC2
**Domain name** [NameCheap](https://www.namecheap.com/)
**Cloudflare** R2
**Vercel** Free deployment tier

- I won't go into deployment details here.

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