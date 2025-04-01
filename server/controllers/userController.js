
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWTSECRET);
};

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const existing = await User.findOne({ email });
		if (existing) {
			return res.json({ success: false, message: "User already Exists" });
		}
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: "Please enter a valid Email",
			});
		}
		if (password.length < 4) {
			return res.json({
				success: false,
				message: "Please enter a strong password",
			});
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name: name,
			email: email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		const token = createToken(savedUser._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "ERORR OCCURED---" });
	}
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.json({ success: false, message: "User does not Exist" });
		}
		const match = await bcrypt.compare(password, userExist.password);
		if (!match) {
			return res.json({ success: false, message: "Wrong Password" });
		}

		const token = createToken(userExist._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "ERROR OCCCURED----" });
	}
};

