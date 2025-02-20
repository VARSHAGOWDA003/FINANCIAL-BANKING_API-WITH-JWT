const Account = require('../models/accountModel');

// Get all accounts for the logged-in user
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.accountId, user: req.user._id });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new account for the logged-in user
const createAccount = async (req, res) => {
  const { accountType, initialDeposit } = req.body;
  
  try {
    const account = new Account({
      user: req.user._id,
      accountType,
      balance: initialDeposit || 0,
    });
    
    const createdAccount = await account.save();
    res.status(201).json(createdAccount);
  } catch (error) {
    res.status(400).json({ message: 'Invalid account data', error });
  }
};

module.exports = { 
  getAccounts,
  getAccountById,  // ✅ Added this!
  createAccount,
};
