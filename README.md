# Nawy Real Estate Listings Application


## API Documentation

The API documentation is available through Swagger. Once the backend server is running, you can access it at:  
[http://localhost:5000/api/docs](http://localhost:5000/api/docs)

## Getting Started

### Without Docker
To run the application locally without Docker, ensure that the Docker environment variable is set to `FALSE` in the client configuration file (.env).
After that, follow these steps:

1. Clone this repository.
2. Navigate to the frontend and backend directories and install dependencies:
    - `cd client && npm install`
    - `cd server && npm install`
3. Start the backend server:
    - `cd server && npm run start`
4. Start the frontend application:
    - `cd client && npm run dev`

### With Docker

To run the application locally using Docker, follow these steps:

1. Set the Docker environment variable to `TRUE` in the client configuration file (.env).
2. Then run the following command:
   ```bash
   docker-compose up --build
