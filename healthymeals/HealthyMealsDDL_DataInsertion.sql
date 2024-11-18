CREATE DATABASE IF NOT EXISTS HealthyMeals;
USE HealthyMeals;

-- Create table for Dietary Restrictions
CREATE TABLE IF NOT EXISTS Dietary_Restrictions (
    RestrictionID INT PRIMARY KEY,
    RestrictionType VARCHAR(255) NOT NULL
);

-- Create table for Users
CREATE TABLE IF NOT EXISTS Users (
    User_ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Calories INT,
    RestrictionID INT,
    FOREIGN KEY (RestrictionID) REFERENCES Dietary_Restrictions(RestrictionID)
);

-- Create table for Cuisine Preferences
CREATE TABLE IF NOT EXISTS Cuisine_Preferences(
    User_ID INT,
    Cuisine VARCHAR(255),
    PRIMARY KEY (User_ID, Cuisine),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);

-- Create table for Recipe
CREATE TABLE IF NOT EXISTS Recipe (
    Recipe_ID INT PRIMARY KEY,
    MealType VARCHAR(255) NOT NULL,
    CuisineType VARCHAR(255),
    Instructions TEXT,
    Ingredients TEXT,
    DietaryRestrictionMet TINYINT
);

-- Create table for Nutrients
CREATE TABLE IF NOT EXISTS Nutrients (
    Recipe_ID INT,
    Total_cal INT,
    Proteins DECIMAL(5,2),
    Carbohydrates DECIMAL(5,2),
    Fats DECIMAL(5,2),
    Sugar DECIMAL(5,2),
    PRIMARY KEY (Recipe_ID, Total_cal),
    FOREIGN KEY (Recipe_ID) REFERENCES Recipe(Recipe_ID)
);

-- Create table for Breakfast
CREATE TABLE IF NOT EXISTS Breakfast (
    RecipeID INT,
    BreakfastID INT PRIMARY KEY,  -- Make BreakfastID a primary key
    Name VARCHAR(255),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(Recipe_ID)
);

-- Create table for Lunch
CREATE TABLE IF NOT EXISTS Lunch (
    RecipeID INT,
    LunchID INT PRIMARY KEY,  -- Make LunchID a primary key
    Name VARCHAR(255),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(Recipe_ID)
);

-- Create table for Dinner
CREATE TABLE IF NOT EXISTS Dinner (
    RecipeID INT,
    DinnerID INT PRIMARY KEY,  -- Make DinnerID a primary key
    Name VARCHAR(255),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(Recipe_ID)
);

-- Create table for Snack
CREATE TABLE IF NOT EXISTS Snack (
    RecipeID INT,
    SnackID INT PRIMARY KEY,  -- Make SnackID a primary key
    Name VARCHAR(255),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(Recipe_ID)
);

-- Create table for Meal_Plan
CREATE TABLE IF NOT EXISTS Meal_Plan (
    MealPlanID INT PRIMARY KEY,
    Date DATE NOT NULL,
    UserID INT,
    Total_calories INT,
    FOREIGN KEY (UserID) REFERENCES Users(User_ID)
);

-- Create table for Has_Meal (to associate Meal_Plan with meals)
CREATE TABLE IF NOT EXISTS Has_meal (
    MealPlanId INT,
    BreakfastID INT,
    LunchID INT,
    DinnerID INT,
    SnackID INT,
    PRIMARY KEY (MealPlanId, BreakfastID, LunchID, DinnerID, SnackID),
    FOREIGN KEY (MealPlanId) REFERENCES Meal_Plan(MealPlanID),
    FOREIGN KEY (BreakfastID) REFERENCES Breakfast(BreakfastID),
    FOREIGN KEY (LunchID) REFERENCES Lunch(LunchID),
    FOREIGN KEY (DinnerID) REFERENCES Dinner(DinnerID),
    FOREIGN KEY (SnackID) REFERENCES Snack(SnackID)
);


SHOW TABLES;
SELECT * FROM Dietary_Restrictions;
SELECT * FROM Users;
SELECT * FROM Recipe;
SELECT * FROM Nutrients;
SELECT * FROM Breakfast;
SELECT * FROM Lunch;
SELECT * FROM Dinner;
SELECT * FROM Snack;
SELECT * FROM Meal_Plan;
SELECT * FROM Has_meal;



-- Populating Dietary_Restrictions table
INSERT INTO Dietary_Restrictions (RestrictionID, RestrictionType) VALUES
(1, 'Vegetarian'),
(2, 'Vegan'),
(3, 'Halal'),
(4, 'Kosher'),
(5, 'Gluten-Free'),
(6, 'Dairy-Free'),
(7, 'Nut-Free'),
(8, 'Pescatarian'),
(9, 'Low-Carb'),
(10, 'Paleo');

-- Populating User table
INSERT INTO Users (User_ID, Name, Email, Calories, RestrictionID) VALUES
(1, 'John Doe', 'john.doe@example.com', 2000, 1),
(2, 'Jane Smith', 'jane.smith@example.com', 1500, 2),
(3, 'Ahmed Ali', 'ahmed.ali@example.com', 1800, 3),
(4, 'Sarah Cohen', 'sarah.cohen@example.com', 1700, 4),
(5, 'Emily Johnson', 'emily.johnson@example.com', 1600, 5),
(6, 'David Lee', 'david.lee@example.com', 2200, 6),
(7, 'Anna Gupta', 'anna.gupta@example.com', 1900, 7),
(8, 'Paul Martin', 'paul.martin@example.com', 2100, 8),
(9, 'Olivia Taylor', 'olivia.taylor@example.com', 1400, 9),
(10, 'Carlos Ramirez', 'carlos.ramirez@example.com', 2000, 10);

-- Populating Cuisine_Preferences table
INSERT INTO Cuisine_Preferences (User_ID, Cuisine) VALUES
(1, 'Indian'),
(1, 'Italian'),
(2, 'Mediterranean'),
(2, 'Mexican'),
(3, 'Middle Eastern'),
(3, 'South Asian'),
(4, 'Jewish'),
(5, 'French'),
(6, 'Chinese'),
(7, 'Thai'),
(8, 'Japanese'),
(9, 'Keto'),
(10, 'Paleo');

-- Populating Recipe table
INSERT INTO Recipe (Recipe_ID, MealType, CuisineType, Instructions, Ingredients, DietaryRestrictionMet) VALUES
(1, 'Lunch', 'Indian', 'Cook roti and curry', 'wheat flour, vegetables, spices', TRUE),
(2, 'Dinner', 'Italian', 'Bake pizza with cheese and sauce', 'wheat flour, cheese, tomato sauce', FALSE),
(3, 'Lunch', 'Indian', 'Cook biryani', 'rice, chicken, spices', FALSE),
(4, 'Breakfast', 'American', 'Prepare scrambled eggs', 'eggs, butter, salt', FALSE),
(5, 'Snack', 'American', 'Prepare french fries', 'potatoes, oil, salt', FALSE),
(6, 'Dinner', 'Indian', 'Cook dal with spices', 'lentils, turmeric, cumin', TRUE),
(7, 'Lunch', 'Mexican', 'Make tacos', 'corn tortillas, meat, cheese, lettuce', FALSE),
(8, 'Snack', 'Italian', 'Bake garlic bread', 'bread, garlic, butter', FALSE),
(9, 'Breakfast', 'French', 'Make croissants', 'flour, butter, sugar', FALSE),
(10, 'Dinner', 'Mediterranean', 'Grill fish with veggies', 'fish, olive oil, vegetables', TRUE);

-- Populating Nutrients table
INSERT INTO Nutrients (Recipe_ID, Total_cal, Proteins, Carbohydrates, Fats, Sugar) VALUES
(1, 400, 10.5, 60.3, 8.2, 2.1),
(2, 800, 20.3, 90.1, 30.5, 5.2),
(3, 650, 25.2, 70.5, 15.8, 3.4),
(4, 300, 20.0, 2.0, 25.0, 1.0),
(5, 500, 5.2, 50.5, 25.3, 0.5),
(6, 450, 12.5, 60.0, 10.0, 2.5),
(7, 550, 15.8, 65.3, 20.2, 3.0),
(8, 350, 8.5, 40.0, 10.5, 2.5),
(9, 600, 12.3, 55.5, 35.0, 6.0),
(10, 480, 25.0, 20.0, 18.0, 0.5);

-- Populating Breakfast table
INSERT INTO Breakfast (RecipeID, BreakfastID, Name) VALUES
(4, 1, 'Scrambled Eggs'),
(9, 2, 'Croissants'),
(10, 3, 'Fish with veggies'),
(6, 4, 'Dal with spices'),
(1, 5, 'Roti and curry'),
(2, 6, 'Pizza'),
(5, 7, 'French fries'),
(8, 8, 'Garlic Bread'),
(7, 9, 'Tacos'),
(3, 10, 'Biryani');

-- Populating Lunch table
INSERT INTO Lunch (RecipeID, LunchID, Name) VALUES
(1, 1, 'Roti with Curry'),
(3, 2, 'Chicken Biryani'),
(7, 3, 'Tacos'),
(5, 4, 'French Fries'),
(6, 5, 'Dal with rice'),
(9, 6, 'Croissants with jam'),
(8, 7, 'Garlic bread with dipping'),
(10, 8, 'Grilled fish'),
(2, 9, 'Cheese Pizza'),
(4, 10, 'Scrambled eggs');

-- Populating Dinner table
INSERT INTO Dinner (RecipeID, DinnerID, Name) VALUES
(3, 1, 'Mutton Biryani'),
(1, 2, 'Roti with Curry'),
(4, 3, 'Scrambled Eggs'),
(2, 4, 'Cheese Pizza'),
(6, 5, 'Dal with spices'),
(7, 6, 'Tacos'),
(5, 7, 'French fries'),
(9, 8, 'Croissants'),
(8, 9, 'Garlic bread'),
(10, 10, 'Fish with veggies');

-- Populating Snack table
INSERT INTO Snack (RecipeID, SnackID, Name) VALUES
(5, 1, 'French Fries'),
(8, 2, 'Garlic Bread'),
(7, 3, 'Tacos'),
(9, 4, 'Croissants'),
(1, 5, 'Roti and Curry'),
(3, 6, 'Biryani'),
(10, 7, 'Grilled Fish'),
(2, 8, 'Cheese Pizza'),
(6, 9, 'Dal with spices'),
(4, 10, 'Scrambled Eggs');

-- Populating Meal_Plan table
INSERT INTO Meal_Plan (MealPlanID, Date, UserID, Total_calories) VALUES
(1, '2024-10-15', 1, 2000),
(2, '2024-10-16', 2, 1500),
(3, '2024-10-17', 3, 1800),
(4, '2024-10-18', 4, 1700),
(5, '2024-10-19', 5, 1600),
(6, '2024-10-20', 6, 2200),
(7, '2024-10-21', 7, 1900),
(8, '2024-10-22', 8, 2100),
(9, '2024-10-23', 9, 1400),
(10, '2024-10-24', 10, 2000);

-- Populating Has_Meal table
INSERT INTO Has_meal (MealPlanId, BreakfastID, LunchID, DinnerID, SnackID) VALUES
(1, 1, 1, 1, 1),
(2, 2, 2, 2, 2),
(3, 3, 3, 3, 3),
(4, 4, 4, 4, 4),
(5, 5, 5, 5, 5),
(6, 6, 6, 6, 6),
(7, 7, 7, 7, 7),
(8, 8, 8, 8, 8),
(9, 9, 9, 9, 9),
(10, 10, 10, 10, 10);


SELECT * FROM Dietary_Restrictions;
SELECT * FROM Users;
SELECT * FROM Recipe;
SELECT * FROM Nutrients;
SELECT * FROM Breakfast;
SELECT * FROM Lunch;
SELECT * FROM Dinner;
SELECT * FROM Snack;
SELECT * FROM Meal_Plan;
SELECT * FROM Has_meal;
SELECT * FROM Cuisine_Preferences;



