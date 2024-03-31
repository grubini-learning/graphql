import React, { Component } from "react";
import { graphql } from "react-apollo";
import { createLyric } from "../queries";

class LyricsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.id,
        },
        // refetchQueries: [{ query: getSong, arguments: { id: this.props.id } }],
      })
      .then(() => {
        this.setState({ content: "" });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="add-lyric">Add lyric</label>
        <input
          type="text"
          id="add-lyric"
          name="lyric-content"
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}

export default graphql(createLyric)(LyricsCreate);
