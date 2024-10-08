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
    - Follow the .env.example files in frontend and root directory.

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
![homepage](/images/homepage-1.png)
![homepage 3](/images/homepage-3.png)
![homepage 2](/images/homepage-2.png)

### Property
![property](/images/property-1.png)
![property 2](/images/property-2.png)

### Chat interface
![chat interface](/images/chat-interface-1.png)
![chat interface 2](/images/chat-interface-2.png)
![chat interface 3](/images/chat-interface-3.png)

### Search
![search 1](/images/search-1.png)
![search 2](/images/search-2.png)

### Reservation
![reservation 1](/images/reservation-1.png)
![reservation 2](/images/reservation-2.png)

### Login
![login 1](/images/login.png)

### Register
![register 1](/images/register.png)