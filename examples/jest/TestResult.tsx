import React from 'react';

import { Test } from '.';
import { Text, Row, COLOR } from '../../lib/index';

type TestResultProps = {
  test: Test;
};

const getStatusStyle = (status: string) => {
  const baseStyles = {
    color: COLOR.BLACK,
    bold: true,
    paddingLeft: 2,
    paddingRight: 2,
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

const TestResult = ({ test }: TestResultProps) => {
  const testPath = `${test.path.split('/')[0]}/`;
  const testName = test.path.split('/')[1];

  const statusStyle = getStatusStyle(test.status);

  return (
    <Row>
      <Text styles={statusStyle}>{test.status.toUpperCase()}</Text>
      <Text styles={{ paddingLeft: 1 }}>{testPath}</Text>
      <Text styles={{ bold: true }}>{testName}</Text>
    </Row>
  );
};

export default TestResult;
