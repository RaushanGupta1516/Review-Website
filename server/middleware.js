const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET || "fallbackSecret"; // fallback for dev

module.exports.isverified = (req, res, next) => {
	let token = null;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.headers.token) {
		token = req.headers.token;
	}

	if (!token) {
		return res.status(401).json({ success: false, message: "Not logged in or token missing" });
	}

	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = { id: decoded.id }; 
		next();
	} catch (error) {
		console.error("JWT verification error:", error.message);
		return res.status(401).json({ success: false, message: "Invalid or expired token" });
	}
};
