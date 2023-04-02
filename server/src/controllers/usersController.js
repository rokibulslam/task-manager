const UsersModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const asyncHandler =require("express-async-handler");
const { generateToken } =require("../utility/jwt");

// Registration
exports.registration = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    res.status(400);
    throw new Error("Input field can not be empty!");
  }
  const userExist = await UsersModel.findOne({ email });
  if (userExist) {
    throw new Error("User already exist")
    
  }
  const user = await UsersModel.create(req.body);
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      picture: user.photo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});



// Login
exports.login= asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});


// Profile Updates
exports.profileUpdate = asyncHandler(async (req, res) => {
  const email = res.locals.user.email;
  const reqBody = req.body;
  const user = await UsersModel.updateOne({ email: email }, reqBody);
  if (user) {
     res.status(200).json({ status: "success", data: user });
  }
  else {
    throw new Error("Update Failed")
  }
})


// Profile Details
exports.profileDetails = asyncHandler(async (req, res) => {
  const email = res.locals.user.email;
  const user =await UsersModel.findOne({ email })
  if (user) {
    res.status(200).json({ status: "success", data: user });
  } else {
    throw new Error("User Details Not Found!")
  }

})