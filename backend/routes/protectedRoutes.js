const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');

// Route accessible only to authenticated users (Dashboard)
router.get('/dashboard-data', protect, (req, res) => {
  res.json({
    message: 'Welcome to the User Dashboard!',
    userRole: req.user.role,
    data: 'This is protected data available to any logged-in user.'
  });
});

// Route accessible only to 'admin' role
router.get('/admin-data', protect, roleCheck('admin'), (req, res) => {
  res.json({
    message: 'Welcome to the Admin Dashboard!',
    userRole: req.user.role,
    data: 'This is super secret data only available to admins.'
  });
});

module.exports = router;
