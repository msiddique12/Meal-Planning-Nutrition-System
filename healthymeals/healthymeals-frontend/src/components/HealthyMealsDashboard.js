'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '../services/api';

const HealthyMealsDashboard = () => {
  const [activeTab, setActiveTab] = useState('query');
  const [message, setMessage] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [formData, setFormData] = useState({});
  const [errorDetails, setErrorDetails] = useState(null);
  const [queryType, setQueryType] = useState('regular');

  const insertableTables = [
    'Users',
    'Recipe',
    'Nutrients',
    'Dietary_Restrictions',
    'Cuisine_Preferences',
    'Meal_Plan'
  ];

  const handleQuery = async (table) => {
    try {
      const response = await api.queryTable(table);
      setQueryResults(response);
      setMessage(`Successfully queried ${table}`);
      setErrorDetails(null);
    } catch (error) {
      console.error('Query error:', error);
      setMessage(`Error querying ${table}`);
      setErrorDetails(error.response?.data || error);
    }
  };

  const handleSpecialQuery = async (type) => {
    try {
      const response = await api.specialQuery(type);
      setQueryResults(response);
      setMessage(`Successfully executed ${type} query`);
      setErrorDetails(null);
    } catch (error) {
      console.error('Special query error:', error);
      setMessage(`Error executing ${type} query`);
      setErrorDetails(error.response?.data || error);
    }
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await api.insertIntoTable(selectedTable, formData);
      setMessage(`Successfully inserted into ${selectedTable}`);
      setFormData({});
      setErrorDetails(null);
    } catch (error) {
      console.error('Insert error:', error);
      setMessage(`Error inserting data`);
      setErrorDetails(error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteFromTable(selectedTable, id);
      setMessage(`Successfully deleted from ${selectedTable}`);
      handleQuery(selectedTable);
      setErrorDetails(null);
    } catch (error) {
      console.error('Delete error:', error);
      setMessage(`Error deleting data`);
      setErrorDetails(error.response?.data || error);
    }
  };

  const handleUpdate = async (e, row) => {
    e.preventDefault();
    try {
      await api.updateTable(selectedTable, formData);
      setMessage(`Successfully updated ${selectedTable}`);
      handleQuery(selectedTable);
      setErrorDetails(null);
    } catch (error) {
      console.error('Update error:', error);
      setMessage(`Error updating data`);
      setErrorDetails(error.response?.data || error);
    }
  };

  const handleQuit = () => {
    window.close();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">HealthyMeals Dashboard</h1>
      
      {message && (
        <Alert className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {errorDetails && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            <div className="space-y-2">
              <p><strong>Error:</strong> {errorDetails.error}</p>
              {errorDetails.sqlMessage && (
                <p><strong>SQL Message:</strong> {errorDetails.sqlMessage}</p>
              )}
              {errorDetails.sql && (
                <p><strong>SQL Query:</strong> {errorDetails.sql}</p>
              )}
              {errorDetails.sqlState && (
                <p><strong>SQL State:</strong> {errorDetails.sqlState}</p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="query">Query</TabsTrigger>
          <TabsTrigger value="insert">Insert</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="quit">Quit</TabsTrigger>
        </TabsList>

        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>Query Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setQueryType(e.target.value)}
                  value={queryType}
                >
                  <option value="regular">Regular Table Query</option>
                  <option value="meal-calories">Meal Calories Analysis</option>
                  <option value="user-restrictions">User Dietary Profiles</option>
                  <option value="meal-plan-summary">Meal Plan Summary</option>
                </select>

                {queryType === 'regular' ? (
                  <select
                    className="w-full p-2 border rounded"
                    onChange={(e) => handleQuery(e.target.value)}
                  >
                    <option value="">Select Table</option>
                    {insertableTables.map(table => (
                      <option key={table} value={table}>{table}</option>
                    ))}
                  </select>
                ) : (
                  <Button 
                    onClick={() => handleSpecialQuery(queryType)}
                    className="w-full"
                  >
                    Execute Query
                  </Button>
                )}
                
                {queryResults.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr>
                          {Object.keys(queryResults[0]).map(key => (
                            <th key={key} className="px-4 py-2">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value, j) => (
                              <td key={j} className="border px-4 py-2">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insert">
          <Card>
            <CardHeader>
              <CardTitle>Insert Data</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInsert} className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setSelectedTable(e.target.value)}
                  value={selectedTable}
                >
                  <option value="">Select Table</option>
                  {insertableTables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>

                {selectedTable && (
                  <div className="space-y-4">
                    {selectedTable === 'Users' && (
                      <>
                        <Input
                          placeholder="User_ID"
                          name="User_ID"
                          type="number"
                          onChange={(e) => setFormData({...formData, User_ID: e.target.value})}
                        />
                        <Input
                          placeholder="Name"
                          name="Name"
                          onChange={(e) => setFormData({...formData, Name: e.target.value})}
                        />
                        <Input
                          placeholder="Email"
                          name="Email"
                          type="email"
                          onChange={(e) => setFormData({...formData, Email: e.target.value})}
                        />
                        <Input
                          placeholder="Calories"
                          name="Calories"
                          type="number"
                          onChange={(e) => setFormData({...formData, Calories: e.target.value})}
                        />
                        <Input
                          placeholder="RestrictionID"
                          name="RestrictionID"
                          type="number"
                          onChange={(e) => setFormData({...formData, RestrictionID: e.target.value})}
                        />
                      </>
                    )}

                    {selectedTable === 'Recipe' && (
                      <>
                        <Input
                          placeholder="Recipe_ID"
                          name="Recipe_ID"
                          type="number"
                          onChange={(e) => setFormData({...formData, Recipe_ID: e.target.value})}
                        />
                        <Input
                          placeholder="MealType"
                          name="MealType"
                          onChange={(e) => setFormData({...formData, MealType: e.target.value})}
                        />
                        <Input
                          placeholder="CuisineType"
                          name="CuisineType"
                          onChange={(e) => setFormData({...formData, CuisineType: e.target.value})}
                        />
                        <textarea
                          className="w-full p-2 border rounded"
                          placeholder="Instructions"
                          name="Instructions"
                          onChange={(e) => setFormData({...formData, Instructions: e.target.value})}
                        />
                        <textarea
                          className="w-full p-2 border rounded"
                          placeholder="Ingredients"
                          name="Ingredients"
                          onChange={(e) => setFormData({...formData, Ingredients: e.target.value})}
                        />
                        <Input
                          placeholder="DietaryRestrictionMet (0 or 1)"
                          name="DietaryRestrictionMet"
                          type="number"
                          min="0"
                          max="1"
                          onChange={(e) => setFormData({...formData, DietaryRestrictionMet: e.target.value})}
                        />
                      </>
                    )}

                    {selectedTable === 'Nutrients' && (
                      <>
                        <Input
                          placeholder="Recipe_ID"
                          name="Recipe_ID"
                          type="number"
                          onChange={(e) => setFormData({...formData, Recipe_ID: e.target.value})}
                        />
                        <Input
                          placeholder="Total_cal"
                          name="Total_cal"
                          type="number"
                          onChange={(e) => setFormData({...formData, Total_cal: e.target.value})}
                        />
                        <Input
                          placeholder="Proteins"
                          name="Proteins"
                          type="number"
                          step="0.01"
                          onChange={(e) => setFormData({...formData, Proteins: e.target.value})}
                        />
                        <Input
                          placeholder="Carbohydrates"
                          name="Carbohydrates"
                          type="number"
                          step="0.01"
                          onChange={(e) => setFormData({...formData, Carbohydrates: e.target.value})}
                        />
                        <Input
                          placeholder="Fats"
                          name="Fats"
                          type="number"
                          step="0.01"
                          onChange={(e) => setFormData({...formData, Fats: e.target.value})}
                        />
                        <Input
                          placeholder="Sugar"
                          name="Sugar"
                          type="number"
                          step="0.01"
                          onChange={(e) => setFormData({...formData, Sugar: e.target.value})}
                        />
                      </>
                    )}

                    {selectedTable === 'Dietary_Restrictions' && (
                      <>
                        <Input
                          placeholder="RestrictionID"
                          name="RestrictionID"
                          type="number"
                          onChange={(e) => setFormData({...formData, RestrictionID: e.target.value})}
                        />
                        <Input
                          placeholder="RestrictionType"
                          name="RestrictionType"
                          onChange={(e) => setFormData({...formData, RestrictionType: e.target.value})}
                        />
                      </>
                    )}

                    {selectedTable === 'Cuisine_Preferences' && (
                      <>
                        <Input
                          placeholder="User_ID"
                          name="User_ID"
                          type="number"
                          onChange={(e) => setFormData({...formData, User_ID: e.target.value})}
                        />
                        <Input
                          placeholder="Cuisine"
                          name="Cuisine"
                          onChange={(e) => setFormData({...formData, Cuisine: e.target.value})}
                        />
                      </>
                    )}

                    {selectedTable === 'Meal_Plan' && (
                      <>
                        <Input
                          placeholder="MealPlanID"
                          name="MealPlanID"
                          type="number"
                          onChange={(e) => setFormData({...formData, MealPlanID: e.target.value})}
                        />
                        <Input
                          placeholder="Date (YYYY-MM-DD)"
                          name="Date"
                          type="date"
                          onChange={(e) => setFormData({...formData, Date: e.target.value})}
                        />
                        <Input
                          placeholder="UserID"
                          name="UserID"
                          type="number"
                          onChange={(e) => setFormData({...formData, UserID: e.target.value})}
                        />
                        <Input
                          placeholder="Total_calories"
                          name="Total_calories"
                          type="number"
                          onChange={(e) => setFormData({...formData, Total_calories: e.target.value})}
                        />
                      </>
                    )}

                    <Button type="submit">Insert Data</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete">
          <Card>
            <CardHeader>
              <CardTitle>Delete Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    setSelectedTable(e.target.value);
                    if (e.target.value) handleQuery(e.target.value);
                  }}
                >
                  <option value="">Select Table</option>
                  {insertableTables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>

                {queryResults.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr>
                          {Object.keys(queryResults[0]).map(key => (
                            <th key={key} className="px-4 py-2">{key}</th>
                          ))}
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value, j) => (
                              <td key={j} className="border px-4 py-2">{value}</td>
                            ))}
                            <td className="border px-4 py-2">
                              <Button 
                                variant="destructive"
                                onClick={() => handleDelete(row[Object.keys(row)[0]])}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update">
          <Card>
            <CardHeader>
              <CardTitle>Update Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    setSelectedTable(e.target.value);
                    if (e.target.value) handleQuery(e.target.value);
                  }}
                >
                  <option value="">Select Table</option>
                  {insertableTables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>

                {queryResults.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr>
                          {Object.keys(queryResults[0]).map(key => (
                            <th key={key} className="px-4 py-2">{key}</th>
                          ))}
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value, j) => (
                              <td key={j} className="border px-4 py-2">
                                <Input
                                  defaultValue={value}
                                  onChange={(e) => {
                                    const key = Object.keys(row)[j];
                                    setFormData({
                                      ...formData,
                                      id: row[Object.keys(row)[0]],
                                      [key]: e.target.value
                                    });
                                  }}
                                />
                              </td>
                            ))}
                            <td className="border px-4 py-2">
                              <Button 
                                onClick={handleUpdate}
                              >
                                Update
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quit">
          <Card>
            <CardHeader>
              <CardTitle>Quit Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Are you sure you want to quit?</p>
                <Button onClick={handleQuit} variant="destructive">
                  Yes, Quit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default HealthyMealsDashboard;