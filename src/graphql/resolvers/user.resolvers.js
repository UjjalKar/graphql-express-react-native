import User from "../../models/User";
import { requireAuth } from "../../services/Auth";

export default {
  // ...rest = email, avatar, password, username,
  signup: async (_, { fullName, ...rest }) => {
    try {
      // const [firstName, ...lastname] = fullname.split(' '); == "Ujjal Kar" => "Ujjal=firstname-> Kumar Kar = ...lastname"
      const [firstName, ...lastName] = fullName.split(" ");
      const user = await User.create({ firstName, lastName, ...rest });

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`User doesn't exist!`);
      }

      if (!user.authCheck(password)) {
        throw new Error(`Passwod don't match`);
      }

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },
  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      return me;
    } catch (error) {
      throw error;
    }
  }
};
