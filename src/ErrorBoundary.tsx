import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
  }

  handleThrowError = () => {
    try {
      throw new Error('Test Error');
    } catch (error) {
      this.setState({ hasError: true });
      console.error('Error caught by ErrorBoundary: ', error);
    }
  };

  handleClearLocalStorage = () => {
    localStorage.clear();
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>Something went wrong. Please try again later.</div>
          <button onClick={this.handleClearLocalStorage}>
            Clear Local Storage AND Refresh Page
          </button>
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.handleThrowError}>Throw Error</button>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
