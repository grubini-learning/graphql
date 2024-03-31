import gql from "graphql-tag";

export const createLyric = gql`
  mutation addLyrics($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        likes
        content
      }
    }
  }
`;
