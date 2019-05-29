import React, { useState } from 'react';
import renderer, { Text, Input, Row, COLOR } from '../lib/index';

import SimpleText from './simple-text';
import Counter from './counter';
import Unicorns from './unicorns';

const App = () => {
  const [changedVal, setChangedVal] = useState('');
  const [submittedVal, setSubmittedVal] = useState('');
  const [focusInput, setFocusInput] = useState(true);

  return (
    <React.Fragment>
      <Row>
        <Text styles={{ color: COLOR.GREEN }}>Squash</Text>
        <Text styles={{ color: COLOR.RED }}>All</Text>
        The
        <Text>Text</Text>
      </Row>
      <SimpleText />
      <Counter />
      <Unicorns />
      <Text>----------------</Text>
      <Text>{`Submitted value: ${submittedVal}`}</Text>
      <Text>----------------</Text>
      <Row>
        <Text
          styles={{
            bold: true,
            color: COLOR.BLACK,
            backgroundColor: COLOR.WHITE,
          }}
        >
          Enter some text:
        </Text>
        <Input
          value={changedVal}
          onChange={setChangedVal}
          onSubmit={s => {
            setSubmittedVal(s);
            setFocusInput(false);
          }}
          focus={focusInput}
        />
      </Row>
    </React.Fragment>
  );
};

renderer.render(<App />);
