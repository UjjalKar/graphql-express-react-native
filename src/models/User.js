import mongoose, { Schema } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcrypt-nodejs";

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
  _authCheck(password) {
    return compareSync(password, this.password);
  }
};

export default mongoose.model("User", UserSchema);
