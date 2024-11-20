const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/export/excel', isAuthenticated, fileController.exportPostsToExcel);

module.exports = router;