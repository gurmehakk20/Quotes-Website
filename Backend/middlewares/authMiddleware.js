const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization

    // Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Access Denied. No token provided." })
    }

    const token = authHeader.split(" ")[1] // Get the token after "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // decoded contains user's id, email, etc.
        next() // move to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: "Invalid or expired token." })
    }

}

module.exports = { verifyToken }