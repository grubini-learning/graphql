import { useParams } from "react-router-dom";
import { useGetProfile } from "../services/queries/profile.query";
import { AddPostModal, Post } from "../components";

export const Profile = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProfile(Number(id));

  if (isLoading) return <p>Loading ...</p>;
  if (error) {
    console.log("the error profile is: ", error);

    return <p>error</p>;
  }

  const {
    profile: {
      user: { name, posts },
      bio,
    },
    isMyProfile,
  } = data?.profile;

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
        <div>{isMyProfile ? <AddPostModal /> : false}</div>
      </div>
      <div>
        {posts?.map((post) => (
          <Post
            key={post.id}
            {...post}
            user={{ name }}
            isMyProfile={isMyProfile}
          />
        ))}
      </div>
    </div>
  );
};
