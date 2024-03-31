import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const LyricList = (props) => {
  const { lyrics } = props;

  if (lyrics.length === 0) return <p>No lyrics for this song</p>;

  const giveLike = (id, likes) => {
    props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };

  console.log("the lyric is: ", lyrics);

  return (
    <div>
      <ul className="collection">
        {lyrics.map((lyric) => (
          <li key={lyric.id} className="collection-item">
            {lyric.content}
            <div className="vote-box">
              <i
                className="material-icons"
                onClick={() => giveLike(lyric.id, lyric.likes)}
              >
                thumb_up
              </i>
              {lyric.likes}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const likeLyric = gql`
  mutation like($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(likeLyric)(LyricList);
