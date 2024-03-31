import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import { CurrentUserQuery } from "../../queries";
import { logOut } from "../../mutations";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  handleLogOut() {
    this.props.mutate().then((res) => {
      this.props.data.refetch();
    });
  }

  renderButtons() {
    const {
      loading,
      data: { user },
    } = this.props;

    if (loading) return <div />;

    if (user) {
      return (
        <li>
          <a onClick={this.handleLogOut.bind(this)}>Logout</a>
        </li>
      );
    }

    return (
      <div>
        {[
          { key: "signup-route", to: "signup", label: "Sign up" },
          { key: "signin-route", to: "signin", label: "Sign in" },
        ].map((route) => (
          <li key={route.key}>
            <Link to={route.to}>{route.label}</Link>
          </li>
        ))}
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logOut)(graphql(CurrentUserQuery)(Nav));
