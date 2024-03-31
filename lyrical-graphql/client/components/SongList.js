import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import { deleteSong, fetchSongs } from "../queries";

class SongList extends Component {
  deleteSong(id) {
    this.props
      .mutate({
        variables: { id },
      })
      .then(() => this.props.data.refetch());
  }

  render() {
    const { loading, songs } = this.props.data;

    if (loading) return <p>loading....</p>;

    return (
      <div>
        <ul className="collection">
          {songs.map((song) => (
            <li key={song.id} className="collection-item">
              <Link to={`songs/${song.id}`}>{song.title}</Link>
              <i
                className="material-icons"
                onClick={() => this.deleteSong(song.id)}
              >
                delete
              </i>
            </li>
          ))}
        </ul>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
