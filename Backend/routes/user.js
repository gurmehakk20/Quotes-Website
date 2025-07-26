const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Quote = require('../models/Quotes');

const {verifyToken} = require('../middlewares/authMiddleware.js');

// GET /user/saved-quotes - Get all saved quotes for the logged-in user
router.get('/saved-quotes', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedQuotes',
      model: 'Quote',
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ savedQuotes: user.savedQuotes || [] });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch saved quotes', error: err.message });
  }
});

// Check if a quote is saved by user
router.get('/is-saved/:quoteId', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const { quoteId } = req.params;
        
        const user = await User.findById(userId);
        const isSaved = user.savedQuotes.includes(quoteId);
        
        res.status(200).json({ isSaved });
    } catch (error) {
        res.status(500).json({ message: 'Error checking saved status', error: error.message });
    }
});

router.post('/save-quote/:quoteId', verifyToken, async (req, res) => {

    try {

        const userId = req.user._id; 
        const { quoteId } = req.params;
        const { text, author, source } = req.body; // Get quote data for external quotes

        const user = await User.findById(userId);

        // Check if it's an external quote (starts with 'external_')
        if (quoteId.startsWith('external_')) {
            // Check if user already has this external quote saved
            if (user.savedQuotes.includes(quoteId)) {
                return res.status(400).json({ message: 'Quote already saved' });
            }

            // For external quotes, we'll store the ID as is
            user.savedQuotes.push(quoteId);
            await user.save();  

            res.status(200).json({ message: 'External quote saved successfully' });
        } else {
            // Handle regular database quotes
            if (user.savedQuotes.includes(quoteId)) {
                return res.status(400).json({ message: 'Quote already saved' });
            }
            user.savedQuotes.push(quoteId);
            await user.save();  

            res.status(200).json({ message: 'Quote saved successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error saving quote', error: error.message });
    }

})

module.exports = router;
