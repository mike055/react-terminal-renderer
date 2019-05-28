import React from 'react';

type AppProps = {
  children: React.ReactNode;
};

class App extends React.Component<AppProps> {
  render() {
    return this.props.children;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error: Error) {
    console.log('componentDidCatch', error);
  }
}

export default App;
