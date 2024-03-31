import { useUpdatePost } from "../../services/mutations";
import { User } from "../../types/User.types";
import "./Post.styles.css";

type PostArgs = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: Partial<User>;
  published: boolean;
  isMyProfile: boolean;
};

export const Post = ({
  id,
  createdAt,
  published,
  isMyProfile,
  title,
  user,
  content,
}: PostArgs) => {
  const formattedDate = new Date(Number(createdAt));
  const { mutate } = useUpdatePost();

  const publishPost = (published: boolean) => {
    mutate({ variables: { id, post: { published } } });
  };

  return (
    <div
      className="post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <button className="post__publish" onClick={() => publishPost(true)}>
          publish
        </button>
      )}

      {isMyProfile && published === true && (
        <button className="post__publish" onClick={() => publishPost(false)}>
          unpublish
        </button>
      )}
      <div className="post__header-container">
        <h2>{title}</h2>
        <h4>
          Created at {`${formattedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user.name}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
};
