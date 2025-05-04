# Smart Parking Backend

This is the backend system for a smart parking lot management application. It provides APIs for managing vehicles, parking spots, and transactions.

## Features

- Vehicle check-in and check-out
- Dynamic parking spot allocation based on vehicle type
- Fee calculation based on parking duration
- API to add parking spots
- MongoDB integration for data persistence

## Technologies Used

- **Node.js**: Backend runtime
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **MongoDB**: Database
- **dotenv**: Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-parking-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with live reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Vehicle Management

- **Check-in Vehicle**
  - **POST** `/api/parking/check-in`
  - **Request Body**:
    ```json
    {
      "license_plate": "ABC123",
      "vehicle_type": "Car"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Vehicle checked in successfully.",
      "spot_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "floor_id": "floor1",
      "entry_time": "2023-10-01T12:00:00.000Z"
    }
    ```

- **Check-out Vehicle**
  - **POST** `/api/parking/check-out`
  - **Request Body**:
    ```json
    {
      "license_plate": "ABC123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Vehicle checked out successfully.",
      "exit_time": "2023-10-01T14:00:00.000Z",
      "duration_minutes": 120,
      "fee": 40
    }
    ```

### Parking Spot Management

- **Add Parking Spots**
  - **POST** `/api/parking/add-spots`
  - **Request Body**:
    ```json
    {
      "spots": [
        { "floorId": "floor1", "spotType": "Compact" },
        { "floorId": "floor1", "spotType": "Regular" },
        { "floorId": "floor1", "spotType": "Large" }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Parking spots added successfully.",
      "spots": [
        { "_id": "64f1a2b3c4d5e6f7g8h9i0j1", "floorId": "floor1", "spotType": "Compact", "isOccupied": false },
        { "_id": "64f1a2b3c4d5e6f7g8h9i0j2", "floorId": "floor1", "spotType": "Regular", "isOccupied": false }
      ]
    }
    ```

## Project Structure

```
smart-parking-backend/
├── controllers/         # API controllers
├── models/              # Mongoose models
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility functions
├── middlewares/         # Middleware (e.g., error handling)
├── app.js               # Application entry point
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Development

- Use `nodemon` for live reload during development:
  ```bash
  npm run dev
  ```

- Run MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Future Enhancements

- Add authentication and authorization
- Implement rate limiting for APIs
- Add unit and integration tests
- Enhance logging with tools like Winston or Morgan
- Add support for multiple parking lots

