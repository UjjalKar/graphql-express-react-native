import GraphqlDate from "graphql-date";

import TweetResolvers from "./tweet.resolvers";
import UserResolvers from "./user.resolvers";

import User from "../../models/User";

export default {
  Date: GraphqlDate,
  Tweet: {
    // user: (parent)
    user: ({ user }) => User.findById(user)
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    me: UserResolvers.me,
    getUserTweets: TweetResolvers.getUserTweets
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  }
};
