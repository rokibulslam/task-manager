const asyncHandler = require("express-async-handler");
const UsersModel = require("../model/UserModel");
const jwt = require('jsonwebtoken')


exports.protect = asyncHandler(async (req, res, next) => {
    let token;
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer")
   ) {
     try {
       token = req.headers.authorization.split(" ")[1];

       // Decode Token
       const decoded = jwt.verify(token, "Seceretkey123456789");
       res.locals.user = await UsersModel.findById(decoded.id).select("-password");
       next();
     } catch (error) {
       res.status(401);
       throw new Error("Not Authorized, token failed");
     }
   }
})