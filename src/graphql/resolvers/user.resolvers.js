import User from "../../models/User";
import { compareSync } from "bcrypt-nodejs";

export default {
  // ...rest = email, avatar, password, username,
  signup: (_, { fullName, ...rest }) => {
    // const [firstName, ...lastname] = fullname.split(' '); == "Ujjal Kar" => "Ujjal=firstname-> Kumar Kar = ...lastname"
    const [firstName, ...lastName] = fullName.split(" ");
    return User.create({
      firstName,
      lastName,
      ...rest
    });
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User doesn't exist!`);
    }

    if (!user._authCheck(password)) {
      throw new Error(`Passwod don't match`);
    }

    return user;
  }
};
