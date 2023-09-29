// Importing the 'verify' function from the 'jsonwebtoken' library
const { verify } = require('jsonwebtoken');

// Defining a middleware function called 'validateToken' that takes 'req', 'res', and 'next' as parameters
const validateToken = (req, res, next) => {

    // Extracting the access token from the request headers
    const accessToken = req.header("accessToken");

    // Checking if there is no access token in the headers
    if (!accessToken) {
        return res.json({ error: 'User not logged in' });
    }

    try {
        // Verifying the access token using a secret ('importantSecret')
        const validToken = verify(accessToken, "importantSecret");
        // { This is the example of valid token, it is in json format
        //     "username": "john_doe",
        //        id: 223
        // }
        // To make this user information available to other parts of your Express.js application
        req.user = validToken //adding user to the comments

        //example: If the car (request) passes the checkpoint successfully, the checkpoint (middleware) may modify or add something to the car (request). In this case, it adds a passenger named req.user who carries information about the user.


        // If the token is valid, call the 'next' middleware (i.e., proceed to the next function)
        if (validToken) {
            return next();
        }
    } catch (error) {
        // If there's an error during token verification, return an error response
        return res.json({ error: error });
    }
}

// Exporting the 'validateToken' middleware function
module.exports = { validateToken };
