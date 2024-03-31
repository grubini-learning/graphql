import PostQueries, { Post } from "./Post.query";
import UserQueries, { User } from "./User.query";
import ProfileQueries, { Profile } from "./Profile.query";

export default {
  ...PostQueries,
  ...UserQueries,
  ...ProfileQueries,
};

export { User, Profile, Post };
