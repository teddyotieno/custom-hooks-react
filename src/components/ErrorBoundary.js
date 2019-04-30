import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Error boundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing,{" "}
          <Link to="/">
            Click here to go back to the homepage of wait five seconds{" "}
          </Link>{" "}
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoudary;
