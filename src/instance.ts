import TerminalRenderer from './TerminalRenderer';

const createTerminalRenderer = () => {
  const theRenderer = new TerminalRenderer();

  return {
    render: theRenderer.render,
  };
};

export default createTerminalRenderer;
