USE HealthyMeals;

-- This view gives the meal plan for each user on a given day including meal types and total calories.
CREATE VIEW DailyMealPlan 
AS SELECT 
    MP.MealPlanID,
    MP.Date,
    U.Name AS User_Name,
    U.Calories AS User_Calorie_Goal,
    B.Name AS Breakfast,
    L.Name AS Lunch,
    D.Name AS Dinner,
    S.Name AS Snack,
    MP.Total_calories AS Total_MealPlan_Calories
FROM 
    Meal_Plan MP
JOIN 
    Users U ON MP.UserID = U.User_ID
LEFT JOIN 
    Has_meal HM ON MP.MealPlanID = HM.MealPlanId
LEFT JOIN 
    Breakfast B ON HM.BreakfastID = B.BreakfastID
LEFT JOIN 
    Lunch L ON HM.LunchID = L.LunchID
LEFT JOIN 
    Dinner D ON HM.DinnerID = D.DinnerID
LEFT JOIN 
    Snack S ON HM.SnackID = S.SnackID;
SELECT * FROM DailyMealPlan;

-- This view gives each recipe with its nutrient breakdown
CREATE VIEW RecipeNutritionalInfo 
AS SELECT 
    R.Recipe_ID,
    R.MealType,
    R.CuisineType,
    R.Ingredients,
    N.Total_cal AS Calories,
    N.Proteins,
    N.Carbohydrates,
    N.Fats,
    N.Sugar
FROM 
    Recipe R
LEFT JOIN 
    Nutrients N ON R.Recipe_ID = N.Recipe_ID;
SELECT * FROM RecipeNutritionalInfo;

