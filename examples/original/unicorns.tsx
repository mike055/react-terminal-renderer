import React, { useState, useEffect } from 'react';
import { Text } from '../../lib/index';

const frames = ['-', '\\', '|', '/'];

const Unicorns = () => {
  const [frame, setFrame] = useState<string>(frames[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame(frame => {
        const currentIndex = frames.indexOf(frame);

        if (currentIndex + 1 < frames.length) {
          return frames[currentIndex + 1];
        }

        return frames[0];
      });
    }, 10);

    return () => clearInterval(id);
  }, []);

  const text = `
      ♥♥
    ${frame} unicorns ${frame}
      ♥♥
    `;

  return (
    <React.Fragment>
      <Text>{text}</Text>
    </React.Fragment>
  );
};

export default Unicorns;
