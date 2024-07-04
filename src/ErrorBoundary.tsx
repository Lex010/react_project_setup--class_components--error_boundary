import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
  }

  handleThrowError = () => {
    setTimeout(() => {
      throw new Error('Test Error');
    }, 0);
  };

  handleClearLocalStorage = () => {
    localStorage.clear();
    this.setState({ hasError: false }); // Сброс состояния ошибки
    window.location.reload(); // Перезагрузка страницы для восстановления нормального состояния
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>Something went wrong. Please try again later.</div>
          <button onClick={this.handleClearLocalStorage}>
            Clear Local Storage
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
