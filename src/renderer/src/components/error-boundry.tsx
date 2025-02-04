import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<
  {
    fallback: (error?: Error | null, errorInfo?: React.ErrorInfo | null) => React.ReactNode
    children: React.ReactNode
  },
  ErrorBoundaryState
> {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error or send it to an error reporting service
    console.error(error, errorInfo)
    // Update state to show the fallback UI
    this.setState({ hasError: true, error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error, this.state.errorInfo)
    }
    return this.props.children
  }
}

export default ErrorBoundary
