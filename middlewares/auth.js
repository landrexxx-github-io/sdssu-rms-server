const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if(typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // VERIFY if this token is NOT valid.
            if(!verifiedToken) {
                return res.status(401)
                    .json({
                        success: false,
                        message: "Token verification failed, authorized denied."
                    })
            } else {
                req.user_id = verifiedToken.id;
                next();
            }
        } else {
            return res.status(401)
                .json({
                    success: false,
                    message: "Unauthorized user to access this site."
                })
        }
    } catch (error) {
        return res.status(401)
            .json({
                success: false,
                message: error.message
            })
    }
}

module.exports = isAuthenticated;