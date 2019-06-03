import React, {Fragment} from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<Fragment>
        <h1>Something went wrong.</h1>;
          <p>Context: {this.props.context}</p>
          <p>Error: {this.state.error}</p>
      </Fragment>
      );}

    return this.props.children;
  }
}