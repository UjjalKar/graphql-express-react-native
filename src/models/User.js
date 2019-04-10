import mongoose, { Schema } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import constants from "../config/constants";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    firstName: String,
    lastName: String,
    avatar: String,
    password: String,
    email: String
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

// UserSchema.methods = {

//   authenticateUser(password) {
//     return compareSync(password, this.password);
//   }
// };

UserSchema.methods = {
  _hashPassword(password) {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  },
  authCheck(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    );
  }
};

export default mongoose.model("User", UserSchema);
