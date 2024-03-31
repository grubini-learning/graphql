import { Post } from "../components";
import { useGetPosts } from "../services";

export const Posts = () => {
  const { data, error, isLoading } = useGetPosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.log("the error is: ", error);

    return <p>error</p>;
  }

  return (
    <div>
      {data?.posts.map((post) => (
        <Post key={post.id} {...post} isMyProfile={false} />
      ))}
    </div>
  );
};
