import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

import { fetchSongs } from "../queries";

export const SongCreate = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let title = "";

    for (const value of formData.values()) {
      title = value;
    }
    props
      .mutate({
        variables: {
          title,
        },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => {
        hashHistory.push("/");
        e.currentTarget.reset();
      });
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <form onSubmit={handleSubmit}>
        <h1>Create a song</h1>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

const createSong = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
    }
  }
`;

export default graphql(createSong)(SongCreate);
