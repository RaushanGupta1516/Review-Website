const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reviewRoute = require("./routes/reviewRoute.js");
const userRoute = require("./routes/userRoute.js");
const fileUpload = require("express-fileupload");

const dbUrl = process.env.ATLASDBURL || "mongodb://localhost:27017/staystory";
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use(
	fileUpload({
		createParentPath: true,
		useTempFiles: true,
		tempFileDir: "/tmp/",
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);

async function main() {
	await mongoose.connect(dbUrl);
	console.log("DB Connected!");
}

main().catch((err) => console.log(err));

app.use("/review", reviewRoute);
app.use("/user", userRoute);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});