const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

module.exports.isverified = (req, res, next) => {
	let token = req.headers.token;

	if (!token && req.headers.authorization) {
		const parts = req.headers.authorization.split(" ");
		if (parts.length === 2 && parts[0] === "Bearer") {
			token = parts[1];
		}
	}

	if (!token) {
		return res.status(401).json({ success: false, message: "Not Logged in" });
	}

	try {
		const decodedtoken = jwt.verify(token, jwtSecret);
		req.user = { id: decodedtoken.id }; 
		next();
	} catch (error) {
		console.error("JWT verification error:", error);
		res.status(401).json({ success: false, message: "Invalid token" });
	}
};
