import React from 'react';
import PQueue from 'p-queue';
import delay from 'delay';
import ms from 'ms';

import TestResult from './TestResult';
import SummaryBar from './SummaryBar';

const paths = [
  'tests/login.js',
  'tests/signup.js',
  'tests/forgot-password.js',
  'tests/reset-password.js',
  'tests/view-profile.js',
  'tests/edit-profile.js',
  'tests/delete-profile.js',
  'tests/posts.js',
  'tests/post.js',
  'tests/comments.js',
];

type AppProps = {};

export type Test = {
  path: string;
  status: string;
};
type AppState = {
  startTime: number;
  completedTests: Test[];
  runningTests: Test[];
};

class Jest extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      startTime: Date.now(),
      completedTests: [],
      runningTests: [],
    };
  }

  render() {
    const { startTime, completedTests, runningTests } = this.state;

    return (
      <React.Fragment>
        {completedTests.map(test => (
          <TestResult key={test.path} test={test} />
        ))}

        {runningTests.map(test => (
          <TestResult key={test.path} test={test} />
        ))}
        <SummaryBar
          timeTaken={ms(Date.now() - startTime)}
          completedTests={completedTests}
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    const queue = new PQueue({ concurrency: 4 });

    paths.forEach(path => {
      queue.add(this.runTest.bind(this, path));
    });
  }

  async runTest(path) {
    this.setState(prevState => ({
      runningTests: [
        ...prevState.runningTests,
        {
          status: 'runs',
          path,
        },
      ],
    }));

    await delay(1000 * Math.random());

    this.setState(prevState => ({
      runningTests: prevState.runningTests.filter(test => test.path !== path),
      completedTests: [
        ...prevState.completedTests,
        {
          status: Math.random() < 0.5 ? 'pass' : 'fail',
          path,
        },
      ],
    }));
  }
}

export default Jest;
