HealthyMeals Dashboard Setup Guide
=================================

Prerequisites
------------
1. Node.js (v14 or higher)
2. MySQL (v8.0 or higher) - You should be able to run a MySQL server.
3. npm (Node Package Manager)

Database Setup
-------------
1. Open MySQL and log in with your credentials
2. Copy and run all SQL statements from 'HealthyMealsDDL_DataInsertion.sql'
   - This will create the database, tables, and insert sample data
   - Make sure all statements execute successfully

Backend Setup
------------
1. Navigate to the backend directory:
   cd healthymeals-backend

2. Install dependencies:
   npm install

3. Configure database connection:
   - Create a environment file(.env) in the root directory which contains the frontend and backend folder.
   - Add the following in the .env file and fill in your MySQL credentials:
     host=localhost
     user=your_username #Change this
     password=your_password #Change this
     database=HealthyMeals

4. Start the backend server:
   npm start
   
   The server should start on port 5001
   You should see: "Server running on port 5001"

Frontend Setup
-------------
1. Open a new terminal

2. Navigate to the frontend directory:
   cd healthymeals-frontend

3. Install dependencies:
   npm install

4. Start the frontend development server:
   npm start
   
   The application should open in your default browser at http://localhost:3000

Testing the Setup
----------------
1. The dashboard should load with four tabs:
   - Query
   - Insert
   - Update
   - Delete

2. Try a simple query:
   - Select "Query" tab
   - Choose "Users" from the dropdown
   - You should see the sample user data

3. Test insertion:
   - Select "Insert" tab
   - Choose a table
   - Fill in the required fields
   - Click "Insert Data"



Support
-------
For issues or questions, please reach out to:
Muhammad Siddique
MXS210155
If needed, I can to come to office hours, or meet on a teams call, to show that everything works.
