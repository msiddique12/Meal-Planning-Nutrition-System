const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Generic table operations
router.get('/:table', mealController.queryTable);
router.post('/:table', mealController.insertIntoTable);
router.delete('/:table/:id', mealController.deleteFromTable);
router.put('/:table/:id', mealController.updateTable);

// Test connection route
router.get('/test', mealController.testConnection);

// Add this line with the other routes
router.get('/special/:queryType', mealController.specialQueries);

module.exports = router;
