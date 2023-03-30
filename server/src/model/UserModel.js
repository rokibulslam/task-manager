const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

userSchema.methods.comparePassword = async function (
  pass
) {
  return await bcrypt.compare(pass, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const UsersModel = mongoose.model("users", userSchema);
module.exports = UsersModel;
