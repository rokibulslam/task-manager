const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  
  return jwt.sign({id}, "Seceretkey123456789", { expiresIn: "30d" });
};
