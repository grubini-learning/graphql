import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .submit({
        email: this.state.email,
        password: this.state.password,
      })
      .catch((e) => {
        const errors = e.graphQLErrors.map((error) => error.message);

        if (errors.length > 0) {
          this.setState({ errors: [...errors] });
        } else {
          this.setState({
            email: "",
            password: "",
          });
        }
      });
  }

  render() {
    const { formTitle } = this.props;

    return (
      <div className="row">
        <form className="col s6" onSubmit={this.handleSubmit.bind(this)}>
          <h1>{formTitle}</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="email@email.com"
              required
              value={this.state.email}
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
                })
              }
            />
          </div>
          {this.state.errors.length > 0 && (
            <div className="errors">
              {this.state.errors.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          <button type="submit" className="btn">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
