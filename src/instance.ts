import TerminalRenderer from './TerminalRenderer';
import { Options } from './types';

const createTerminalRenderer = () => {
  const options: Options = {
    input: process.stdin,
    output: process.stdout,
  };

  const theRenderer = new TerminalRenderer(options);

  return {
    render: theRenderer.render,
  };
};

export default createTerminalRenderer;
