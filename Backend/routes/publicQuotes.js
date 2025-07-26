// const express = require('express')
// const axios = require('axios')
// const router = express.Router()

// router.get('/', async (req, res) => {
//   const category = req.query.category || ''
//   const headers = { 'X-Api-Key': process.env.API_KEY }
//   const requests = []

//   // Create 10 parallel requests
//   for (let i = 0; i < 10; i++) {
//     requests.push(
//       axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, { headers })
//     )
//   }

//   try {
//     const responses = await Promise.all(requests)
//     const quotes = responses.map(r => r.data[0]) // Each response returns an array of 1 quote
//     res.json(quotes)
//   } catch (err) {
//     console.error('Error fetching quotes:', err.message)
//     res.status(500).json({ msg: 'Failed to fetch public quotes' })
//   }
// })

// module.exports = router

const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET public quotes from ZenQuotes
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/quotes');
    
    // Format for frontend consistency and add temporary IDs
    const quotes = response.data.map((quote, index) => ({
        _id: `external_${Date.now()}_${index}`, // Generate temporary ID
        text: quote.q || '',       // quote text
        author: quote.a || 'Unknown', // author name
        source: 'zenquotes'
    }));    


    res.json(quotes);
  } catch (err) {
    console.error('Error fetching from ZenQuotes:', err.message);
    res.status(500).json({ msg: 'Failed to fetch public quotes' });
  }
});

module.exports = router;
