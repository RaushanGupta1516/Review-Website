


const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;


module.exports.isverified = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Logged in"})
    }
    try {
        const decodedtoken = jwt.verify(token, jwtSecret);
        req.body.userid = decodedtoken.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Occured"})
    }
 
}
