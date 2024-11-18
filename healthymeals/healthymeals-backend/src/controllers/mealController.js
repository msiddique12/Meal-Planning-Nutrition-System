const pool = require('../config/db');

// Table name and primary key mappings
const TABLE_CONFIG = {
  'users': {
    name: 'Users',
    primaryKey: 'User_ID',
    columns: {
      'User_ID': 'User_ID',
      'Name': 'Name',
      'Email': 'Email',
      'Calories': 'Calories',
      'RestrictionID': 'RestrictionID'
    }
  },
  'recipe': {
    name: 'Recipe',
    primaryKey: 'Recipe_ID',
    columns: {
      'Recipe_ID': 'Recipe_ID',
      'MealType': 'MealType',
      'CuisineType': 'CuisineType',
      'Instructions': 'Instructions',
      'Ingredients': 'Ingredients',
      'DietaryRestrictionMet': 'DietaryRestrictionMet'
    }
  },
  'nutrients': {
    name: 'Nutrients',
    primaryKey: 'Recipe_ID',
    columns: {
      'Recipe_ID': 'Recipe_ID',
      'Calories': 'Calories',
      'Protein': 'Protein',
      'Carbohydrates': 'Carbohydrates',
      'Fat': 'Fat'
    }
  },
  'meal_plan': {
    name: 'Meal_Plan',
    primaryKey: 'MealPlanID',
    columns: {
      'MealPlanID': 'MealPlanID',
      'Date': 'Date',
      'UserID': 'UserID',
      'Total_calories': 'Total_calories'
    }
  },
  'has_meal': {
    name: 'Has_meal',
    primaryKey: 'MealPlanId',
    columns: {
      'MealPlanId': 'MealPlanId',
      'RecipeId': 'RecipeId'
    }
  },
  'breakfast': {
    name: 'Breakfast',
    primaryKey: 'BreakfastID',
    columns: {
      'BreakfastID': 'BreakfastID',
      'Recipe_ID': 'Recipe_ID'
    }
  },
  'lunch': {
    name: 'Lunch',
    primaryKey: 'LunchID',
    columns: {
      'LunchID': 'LunchID',
      'Recipe_ID': 'Recipe_ID'
    }
  },
  'dinner': {
    name: 'Dinner',
    primaryKey: 'DinnerID',
    columns: {
      'DinnerID': 'DinnerID',
      'Recipe_ID': 'Recipe_ID'
    }
  },
  'snack': {
    name: 'Snack',
    primaryKey: 'SnackID',
    columns: {
      'SnackID': 'SnackID',
      'Recipe_ID': 'Recipe_ID'
    }
  },
  'dietary_restrictions': {
    name: 'Dietary_Restrictions',
    primaryKey: 'RestrictionID',
    columns: {
      'RestrictionID': 'RestrictionID',
      'RestrictionType': 'RestrictionType'
    }
  },
  'cuisine_preferences': {
    name: 'Cuisine_Preferences',
    primaryKey: 'User_ID',  // Part of composite key
    columns: {
      'User_ID': 'User_ID',
      'Cuisine': 'Cuisine'
    }
  }
};

const mealController = {
  // Generic query handler
  async queryTable(req, res) {
    const requestedTable = req.params.table.toLowerCase();
    const tableConfig = TABLE_CONFIG[requestedTable];
    
    if (!tableConfig) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    try {
      const [rows] = await pool.query(`SELECT * FROM ${tableConfig.name}`);
      res.json(rows);
    } catch (error) {
      console.error('Query error:', error);
      res.status(500).json({ 
        error: error.message,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
        sql: error.sql
      });
    }
  },

  // Generic update handler
  async updateTable(req, res) {
    const requestedTable = req.params.table.toLowerCase();
    const tableConfig = TABLE_CONFIG[requestedTable];
    
    if (!tableConfig) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    const { id, ...updateData } = req.body;
    
    try {
      // Filter out any fields that don't exist in the table schema
      const validData = {};
      Object.entries(updateData).forEach(([key, value]) => {
        if (tableConfig.columns[key]) {
          validData[key] = value;
        }
      });

      if (Object.keys(validData).length === 0) {
        return res.status(400).json({ 
          error: 'No valid columns to update',
          validColumns: Object.keys(tableConfig.columns)
        });
      }

      const updates = Object.entries(validData)
        .map(([key, _]) => `${key} = ?`)
        .join(', ');
      const values = [...Object.values(validData), id];
      
      const query = `UPDATE ${tableConfig.name} SET ${updates} WHERE ${tableConfig.primaryKey} = ?`;
      console.log('Update query:', query, 'Values:', values); // Debug log
      
      await pool.query(query, values);
      res.json({ 
        message: 'Update successful',
        updatedFields: Object.keys(validData)
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ 
        error: error.message,
        sqlMessage: error.sqlMessage,
        sql: error.sql 
      });
    }
  },

  // Generic delete handler
  async deleteFromTable(req, res) {
    const requestedTable = req.params.table.toLowerCase();
    const tableConfig = TABLE_CONFIG[requestedTable];
    
    if (!tableConfig) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    const { id } = req.params;
    try {
      await pool.query(
        `DELETE FROM ${tableConfig.name} WHERE ${tableConfig.primaryKey} = ?`,
        [id]
      );
      res.json({ message: 'Delete successful' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ 
        error: error.message,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
        sql: error.sql
      });
    }
  },

  // Generic insert handler with improved error handling
  async insertIntoTable(req, res) {
    const requestedTable = req.params.table.toLowerCase();
    const tableConfig = TABLE_CONFIG[requestedTable];
    
    if (!tableConfig) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    try {
      // Filter out any fields that don't exist in the table schema
      const validData = {};
      Object.entries(req.body).forEach(([key, value]) => {
        if (tableConfig.columns[key]) {
          validData[key] = value;
        }
      });

      const columns = Object.keys(validData).join(', ');
      const values = Object.values(validData);
      const placeholders = values.map(() => '?').join(', ');
      
      const query = `INSERT INTO ${tableConfig.name} (${columns}) VALUES (${placeholders})`;
      console.log('Insert query:', query, 'Values:', values); // Debug log
      
      const [result] = await pool.query(query, values);
      res.json({ 
        id: result.insertId, 
        message: 'Insert successful',
        query: query,
        values: values
      });
    } catch (error) {
      console.error('Insert error:', error);
      res.status(500).json({ 
        error: error.message,
        sqlMessage: error.sqlMessage,
        sql: error.sql 
      });
    }
  },

  // Test connection
  async testConnection(req, res) {
    try {
      const [result] = await pool.query('SHOW TABLES');
      res.json({ 
        message: 'Database connection successful',
        tables: result 
      });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ 
        error: error.message,
        details: 'Database connection failed'
      });
    }
  },

  // Complex query handlers
  async specialQueries(req, res) {
    const { queryType } = req.params;
    
    try {
      let query, rows;
      
      switch (queryType) {
        case 'meal-calories':
          // Get all meals with their calorie content and sort by highest calories
          query = `
            SELECT r.Recipe_ID, r.MealType, r.CuisineType, 
                   n.Total_cal as Calories, n.Proteins, n.Carbohydrates, n.Fats
            FROM Recipe r
            JOIN Nutrients n ON r.Recipe_ID = n.Recipe_ID
            ORDER BY n.Total_cal DESC`;
          break;

        case 'user-restrictions':
          // Get users with their dietary restrictions and cuisine preferences
          query = `
            SELECT u.Name, u.Email, dr.RestrictionType,
                   GROUP_CONCAT(DISTINCT cp.Cuisine) as Cuisine_Preferences
            FROM Users u
            LEFT JOIN Dietary_Restrictions dr ON u.RestrictionID = dr.RestrictionID
            LEFT JOIN Cuisine_Preferences cp ON u.User_ID = cp.User_ID
            GROUP BY u.User_ID`;
          break;

        case 'meal-plan-summary':
          // Get meal plan summary with total calories and meal details
          query = `
            SELECT 
              mp.MealPlanID, 
              mp.Date, 
              u.Name as User_Name,
              b.Name as Breakfast_Name,
              l.Name as Lunch_Name,
              d.Name as Dinner_Name,
              s.Name as Snack_Name,
              mp.Total_calories
            FROM Meal_Plan mp
            JOIN Users u ON mp.UserID = u.User_ID
            JOIN Has_meal hm ON mp.MealPlanID = hm.MealPlanId
            LEFT JOIN Breakfast b ON hm.BreakfastID = b.BreakfastID
            LEFT JOIN Lunch l ON hm.LunchID = l.LunchID
            LEFT JOIN Dinner d ON hm.DinnerID = d.DinnerID
            LEFT JOIN Snack s ON hm.SnackID = s.SnackID
            ORDER BY mp.Date DESC`;
          break;

        default:
          return res.status(400).json({ error: 'Invalid query type' });
      }

      console.log('Executing query:', query); // Debug log
      [rows] = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Special query error:', error);
      res.status(500).json({ 
        error: error.message,
        sqlMessage: error.sqlMessage,
        sql: error.sql 
      });
    }
  }
};

module.exports = mealController;
