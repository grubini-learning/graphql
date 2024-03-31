import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import { getSong } from "../queries";
import LyricList from "./LyricList";
import LyricsCreate from "./LyricsCreate";

const SongDetail = (props) => {
  const { loading, song } = props.data;

  if (loading) return <p>Loading...</p>;

  console.log("ma song: ", props.data);

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricsCreate id={song.id} />
    </div>
  );
};

export default graphql(getSong, {
  options: (props) => {
    return { variables: { id: props.routeParams.id } };
  },
})(SongDetail);
