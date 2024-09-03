# Airbnb clone with django backend and nextjs frontend

## Overview
- Web app that allows users to list their properties for rent, make reservations and chat with other users.

## Tech-stack
- Backend: 
  - Django rest framework for API building
  - PostgreSQL for database
  - Djoser for authentication
  - Celery for update reservations status daily
  - Channels for real-time communication 

- Frontend:
  - Nextjs with typescript
  - Tailwindcss, shadcn ui for styling
  - Redux for state management and rtk query for data fetching

## How to run

### Clone the project
```
git clone https://github.com/Nevalearntocode/drf_next_airbnb
```

### Environment variables:
```
echo > .env.dev
```
```python
DEBUG=
SECRET_KEY=
ALLOWED_HOSTS=
LOCAL=

CELERY_BROKER=
CELERY_BACKEND=

SQL_DATABASE=
SQL_ENGINE=

DOCKER_SQL_USER=
DOCKER_SQL_PASSWORD=
DOCKER_SQL_HOST=
DOCKER_SQL_PORT=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

AUTH_COOKIE_HTTPONLY=
AUTH_COOKIE_SECURE=
AUTH_COOKIE_SAMESITE=
AUTH_COOKIE_PATH=

SIGNING_KEY=
CORS_ALLOWED_ORIGINS=
WEBSITE_URL=
REDIRECT_URIS=

GOOGLE_OAUTH2_KEY=
GOOGLE_OAUTH2_SECRET=

R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_BUCKET_URL=
```

### django development server on docker:
Run docker with or without celery
- Create images and run containers for the first time:
    ```
    docker compose up --build
    ```

- Without celery (only django server and database):
    ```
    docker compose up
    ```
- With celery (update reservations status daily): 
    ```
    docker compose --profile celery up
    ```

### install nextjs dependencies

```
cd .\frontend\
npm install
```

### nextjs development server:
    ```
    npm run dev
    ``` 

## Known issues:
- Google authentication is currently having the error "State could not be found in server-side session data."
- Real-time communication only works for sending messages (update and delete will be updated later).
- Paginations are not added for properties and messages at the moment.
