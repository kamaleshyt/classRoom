const jwt=require('jsonwebtoken')

// Middleware to verify JWT
 function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({msg:'Unauthorized Member'}); // Unauthorized
    }

    jwt.verify(token, 'jjkps', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (invalid token)
        }
        req.user = user; // Attach decoded user payload to the request
        next(); // Proceed to the next middleware/route handler
    });
}
module.exports={authenticateToken}


