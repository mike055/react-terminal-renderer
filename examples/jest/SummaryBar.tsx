import React from 'react';

import { Test } from '.';
import { Text, Row, COLOR } from '../../lib/index';
import { TextStyles } from '../../lib/types';

type SummaryBarProps = {
  completedTests: Test[];
  timeTaken: number;
};

const getStatusStyle = (status: string) => {
  const baseStyles = {
    color: COLOR.BLACK,
    bold: true,
  };

  if (status === 'pass') {
    return {
      ...baseStyles,
      backgroundColor: COLOR.GREEN,
    };
  }

  if (status === 'fail') {
    return {
      ...baseStyles,
      backgroundColor: COLOR.RED,
    };
  }

  return {
    ...baseStyles,
    backgroundColor: COLOR.YELLOW,
  };
};

const SummaryBar = ({ completedTests, timeTaken }: SummaryBarProps) => {
  const failedTests = completedTests.filter(t => t.status === 'fail').length;
  const passedTests = completedTests.filter(t => t.status === 'pass').length;

  return (
    <React.Fragment>
      <Row>
        <Text styles={{ bold: true }}>Tests: </Text>
        {failedTests > 0 && (
          <React.Fragment>
            <Text styles={{ color: COLOR.RED }}>{failedTests}</Text>
            <Text
              styles={{ color: COLOR.RED, paddingLeft: 1, paddingRight: 1 }}
            >
              failed,
            </Text>
          </React.Fragment>
        )}
        {passedTests > 0 && (
          <React.Fragment>
            <Text styles={{ color: COLOR.GREEN }}>{passedTests}</Text>
            <Text
              styles={{ color: COLOR.GREEN, paddingLeft: 1, paddingRight: 1 }}
            >
              passed,
            </Text>
          </React.Fragment>
        )}
        <Text>{completedTests.length}</Text>
        <Text styles={{ paddingLeft: 1, paddingRight: 1 }}>total</Text>
      </Row>
      <Row>
        <Text styles={{ bold: true, paddingRight: 1 }}>Time:</Text>
        <Text>{timeTaken}</Text>
      </Row>
    </React.Fragment>
  );
};

export default SummaryBar;
