const express = require('express');
const { getAccounts, createAccount, getAccountById } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes
router.route('/').get(protect, getAccounts).post(protect, createAccount);
router.route('/:accountId').get(protect, getAccountById); // ✅ Added this!

module.exports = router;
