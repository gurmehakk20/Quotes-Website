const express = require("express")
const router = express.Router()
const Quote = require("../models/Quotes")
const { verifyToken } = require("../middlewares/authMiddleware")

router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find({ approved: true }).populate("submittedBy", "username")
    res.json(quotes)
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch quotes", error: err.message })
  }
})

// POST /api/quotes/submit
router.post("/submit", verifyToken, async (req, res) => {
  try {
    const { text, author, category } = req.body

    const newQuote = new Quote({
      text,
      author,
      category,
      submittedBy: req.user.id, // coming from token
    })

    await newQuote.save()
    res.status(201).json({ msg: "Quote submitted for approval" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: "Server error submitting quote" })
  }
})

module.exports = router
