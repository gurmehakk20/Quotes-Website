const express = require('express')
const axios = require('axios')

const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': process.env.API_KEY,
            },
        })

        res.json(response.data);

    } 
    catch(err) {

        console.error('Error fetching quotes from API:', err)
        res.status(500).json({ msg : 'Error fetching quotes from API', error : err.message})
        
    }
})

module.exports = router