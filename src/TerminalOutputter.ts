//import logUpdate from 'log-update';
import { Instance, Container } from './types';

export class TerminalOutputter {
  private processNode(instance: Container | Instance) {
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
        this.processNode(childNode);
      }
    }
  }

  public output(container: Container) {
    this.processNode(container);
  }
}

const createTerminalOutputter = () => {
  return new TerminalOutputter();
};

export default createTerminalOutputter;
