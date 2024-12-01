const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (request, response, next) => {
    let token;
    const authHeader = request.headers.Authorization || request.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token
        token = authHeader.split(" ")[1]; // Use space to split correctly

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                response.status(401);
                throw new Error("User is not authorized");
            }
            // Attach the decoded user to the request object
            request.user = decoded.user;
            next(); // Proceed to the next middleware
        });
    } else {
        response.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;
