import { ErrorHandler } from './ErrorHandler';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// This is used to catch render errors
// test it by throwing error inside function component
export default class ErrorBoundary extends Component<Props> {
  public static getDerivedStateFromError(error: Error): void {
    ErrorHandler.displayError(error.message);
  }

  public componentDidCatch(error: Error) {
    ErrorHandler.displayError(error.message);
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
