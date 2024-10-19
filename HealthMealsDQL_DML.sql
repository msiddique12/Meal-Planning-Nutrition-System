USE HealthyMeals;

-- Sample execution instructions
-- Dietary_Restrictions
SELECT * FROM Dietary_Restrictions WHERE RestrictionType = 'Vegan';
INSERT INTO Dietary_Restrictions (RestrictionID, RestrictionType) VALUES (12, 'NO BANANAS');
DELETE FROM Dietary_Restrictions WHERE RestrictionID = 11 AND RestrictionType = 'Vegetarian';
UPDATE Dietary_Restrictions SET RestrictionType = 'Vegetarian' WHERE RestrictionID = 1;

-- Users
SELECT * FROM Users WHERE Calories > 1800;
INSERT INTO Users (User_ID, Name, Email, Calories, RestrictionID) VALUES (11, 'Mia Wong', 'mia.wong@example.com', 1700, 2);
DELETE FROM Users WHERE User_ID = 10;
UPDATE Users SET Calories = 2000 WHERE User_ID = 2;

-- Cuisine_Preferences
SELECT * FROM Cuisine_Preferences WHERE Cuisine = 'Italian';
INSERT INTO Cuisine_Preferences (User_ID, Cuisine) VALUES (11, 'Japanese');
DELETE FROM Cuisine_Preferences WHERE User_ID = 2 AND Cuisine = 'Mediterranean';
UPDATE Cuisine_Preferences SET Cuisine = 'Thai' WHERE User_ID = 1 AND Cuisine = 'Indian';

-- Recipe
SELECT * FROM Recipe WHERE MealType = 'Dinner';
INSERT INTO Recipe (Recipe_ID, MealType, CuisineType, Instructions, Ingredients, DietaryRestrictionMet) VALUES (11, 'Snack', 'Greek', 'Mix yogurt with honey', 'yogurt, honey', 1);
DELETE FROM Recipe WHERE Recipe_ID = 10;
UPDATE Recipe SET Ingredients = 'lentils, spices' WHERE Recipe_ID = 6;

-- Nutrients
SELECT * FROM Nutrients WHERE Total_cal < 500;
INSERT INTO Nutrients (Nutrient_ID, Recipe_ID, Total_cal, Proteins, Carbohydrates, Fats, Sugar) VALUES (11, 11, 250, 10.0, 30.0, 5.0, 3.0);
DELETE FROM Nutrients WHERE Nutrient_ID = 10;
UPDATE Nutrients SET Total_cal = 450 WHERE Recipe_ID = 2;

-- Breakfast
SELECT * FROM Breakfast WHERE Name LIKE '%Eggs%';
INSERT INTO Breakfast (RecipeID, BreakfastID, Name) VALUES (4, 11, 'Avocado Toast');
DELETE FROM Breakfast WHERE BreakfastID = 10;
UPDATE Breakfast SET Name = 'Vegan Scrambled Eggs' WHERE BreakfastID = 1;

-- Lunch
SELECT * FROM Lunch WHERE Name LIKE '%Biryani%';
INSERT INTO Lunch (RecipeID, LunchID, Name) VALUES (3, 11, 'Veg Biryani');
DELETE FROM Lunch WHERE LunchID = 8;
UPDATE Lunch SET Name = 'Spicy Tacos' WHERE LunchID = 3;

-- Dinner
SELECT * FROM Dinner WHERE Name LIKE '%Fish%';
INSERT INTO Dinner (RecipeID, DinnerID, Name) VALUES (10, 11, 'Grilled Salmon');
DELETE FROM Dinner WHERE DinnerID = 2;
UPDATE Dinner SET Name = 'Veg Dal' WHERE DinnerID = 5;

-- Snack
SELECT * FROM Snack WHERE Name LIKE '%Fries%';
INSERT INTO Snack (RecipeID, SnackID, Name) VALUES (5, 11, 'Baked Sweet Potato Fries');
DELETE FROM Snack WHERE SnackID = 4;
UPDATE Snack SET Name = 'Garlic Hummus' WHERE SnackID = 2;

-- Meal_Plan
SELECT * FROM Meal_Plan WHERE Date = '2024-10-18';
INSERT INTO Meal_Plan (MealPlanID, Date, UserID, Total_calories) VALUES (11, '2024-10-25', 2, 1600);
DELETE FROM Meal_Plan WHERE MealPlanID = 10;
UPDATE Meal_Plan SET Total_calories = 1800 WHERE MealPlanID = 3;

-- Has_meal
SELECT * FROM Has_meal WHERE BreakfastID = 1;
INSERT INTO Has_meal (MealPlanId, BreakfastID, LunchID, DinnerID, SnackID) VALUES (11, 2, 3, 1, 4);
DELETE FROM Has_meal WHERE MealPlanId = 10;
UPDATE Has_meal SET LunchID = 4 WHERE MealPlanId = 2;
