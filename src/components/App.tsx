import React from 'react';

type AppProps = {
  children: React.ReactNode;
};

class App extends React.Component<AppProps> {
  render() {
    return this.props.children;
  }
}

export default App;
