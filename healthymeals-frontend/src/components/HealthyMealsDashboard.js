'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HealthyMealsDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    calories: '',
    restrictionId: ''
  });
  const [recipeData, setRecipeData] = useState({
    mealType: '',
    cuisineType: '',
    instructions: '',
    ingredients: '',
    dietaryRestrictionMet: false
  });
  const [mealPlanData, setMealPlanData] = useState({
    date: '',
    userId: '',
    totalCalories: ''
  });

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend connection here
      setMessage('User information saved successfully!');
    } catch (error) {
      setMessage('Error saving user information.');
    }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('Recipe saved successfully!');
    } catch (error) {
      setMessage('Error saving recipe.');
    }
  };

  const handleMealPlanSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('Meal plan saved successfully!');
    } catch (error) {
      setMessage('Error saving meal plan.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">HealthyMeals Dashboard</h1>
      
      {message && (
        <Alert className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="mealPlans">Meal Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Daily Calories Target"
                    value={userData.calories}
                    onChange={(e) => setUserData({...userData, calories: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Restriction ID"
                    value={userData.restrictionId}
                    onChange={(e) => setUserData({...userData, restrictionId: e.target.value})}
                  />
                </div>
                <Button type="submit">Save User</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Management</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRecipeSubmit} className="space-y-4">
                <div>
                  <select
                    className="w-full p-2 border rounded"
                    value={recipeData.mealType}
                    onChange={(e) => setRecipeData({...recipeData, mealType: e.target.value})}
                  >
                    <option value="">Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <Input
                    placeholder="Cuisine Type"
                    value={recipeData.cuisineType}
                    onChange={(e) => setRecipeData({...recipeData, cuisineType: e.target.value})}
                  />
                </div>
                <div>
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Instructions"
                    value={recipeData.instructions}
                    onChange={(e) => setRecipeData({...recipeData, instructions: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Ingredients"
                    value={recipeData.ingredients}
                    onChange={(e) => setRecipeData({...recipeData, ingredients: e.target.value})}
                    rows={4}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={recipeData.dietaryRestrictionMet}
                    onChange={(e) => setRecipeData({...recipeData, dietaryRestrictionMet: e.target.checked})}
                    className="mr-2"
                  />
                  <label>Meets Dietary Restrictions</label>
                </div>
                <Button type="submit">Save Recipe</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mealPlans">
          <Card>
            <CardHeader>
              <CardTitle>Meal Plan Management</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMealPlanSubmit} className="space-y-4">
                <div>
                  <Input
                    type="date"
                    value={mealPlanData.date}
                    onChange={(e) => setMealPlanData({...mealPlanData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="User ID"
                    value={mealPlanData.userId}
                    onChange={(e) => setMealPlanData({...mealPlanData, userId: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Total Calories"
                    value={mealPlanData.totalCalories}
                    onChange={(e) => setMealPlanData({...mealPlanData, totalCalories: e.target.value})}
                  />
                </div>
                <Button type="submit">Save Meal Plan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthyMealsDashboard;