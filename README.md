# Mood Logging API

A minimal back-end service for mood tracking, inspired by El Consulto’s concept of mood logging and personalized support.

---

## Objective

The **Mood Logging API** allows users to:  
1. Log a "mood score" using a RESTful API.  
2. Retrieve recent mood entries for a user.  
3. Provide recommendations if the user's average mood score is low.

---

## Features

1. **Endpoints:**
   - `POST /mood`: Log a mood score.
   - `GET /mood/recent/:userId`: Retrieve the last 7 mood entries and calculate an average score.  

2. **Bonus:** If the average score is below 4, a recommendation is returned to help users.

3. **Validation:** Ensures mood scores are between 1 and 10, with appropriate HTTP status codes for invalid data.

4. **In-Memory Data Storage:** Uses an in-memory array (or SQLite) for simplicity and easy setup.

---

## Requirements

### Functional Requirements
1. **Log a Mood:**  
   `POST /mood`  
   Request Body:  
   ```json
   {
     "userId": "<string>",
     "score": <number>,
     "timestamp": "<ISO-8601 string>"
   }
2. **Error Messages and Edge Case Handling:**
    - If `userId` is missing or invalid, return a `400 Bad Request` error.
    - If no mood entries are found for a user in `GET /mood/recent/:userId`, return an empty array and a `200 OK` status.
    - If the mood `score` is not a number or falls outside the range of 1–10, return a `400 Bad Request` error with a descriptive error message.
  
## Error Handling and Validation
   **Validation**: Ensures that the mood score is a number between 1 and 10.
   **Error Codes**:
  - 400 Bad Request: Returned if required fields are missing or invalid.
  - 404 Not Found: Returned if no recent mood entries are found for the specified user.

## Design Decisions

1. **Data Storage:**

  - **Choice**: Used MongoDB as the database.
  - **Reason**:
    - Provides persistent and scalable storage.
    - Suitable for handling structured data like mood logs with user-specific relationships.
  **Trade-offs**:
    - Slightly more complex setup than an in-memory array.
    - Requires connection handling and proper indexing for performance. 

2. **Validation:**
   - **Choice**: Input validation ensures that score is a number between 1 and 10, and userId is a non-empty string.  
   - **Reason**: 
     - Protects the system from invalid or malicious input.  
     - Ensures data integrity for accurate mood tracking and calculations.  

3. **Framework (Node.js + Express):**
   - **Choice**: Node.js and Express.js were chosen to build the API.  
   - **Reason**: 
     - Lightweight and fast for building RESTful services.  
     - Popular choice with a large ecosystem of libraries for rapid development.  

4. **Error Handling:**
   - **Choice**: Basic error handling with appropriate HTTP status codes (e.g., 400 Bad Request, 404 Not Found).  
   - **Reason**:  
     - Provides clear feedback to users about issues with their requests.  
     - Aligns with RESTful API standards.  
   - **Trade-offs**: Does not include advanced error logging or monitoring, which would be necessary for a production system.
  
## Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js**  

### Installation  

1. **Clone the Repository:**  
   -bash  
   -git clone https://github.com/Hobz118/Task.git  
   -cd Task  
2.	**Install Dependencies**:
   -npm install  
3.	**Start the Application:**
   -nodemon index.js  

The application will be accessible at http://localhost:3000.
