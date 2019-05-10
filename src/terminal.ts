import { Instance, Container } from './types';

const processNode = (instance: Container | Instance) => {
  let theText: string | undefined;

  if ((instance as Instance).text) {
    theText = (instance as Instance).text;
  }

  if (theText) {
    process.stdout.write(theText + '\n');
  }

  let theChildren: Instance[] | undefined = instance.children;

  if (theChildren) {
    for (const childNode of theChildren) {
      processNode(childNode);
    }
  }
};

const flushToTerminal = (container: Container): void => {
  processNode(container);
};

export default flushToTerminal;
