import { Instance, Container } from './types';
import { LogUpdate } from 'log-update';
import autoBind = require('auto-bind');

export class TerminalOutputter {
  private logger: LogUpdate;

  constructor(logger: LogUpdate) {
    autoBind(this);
    this.logger = logger;
  }

  private processNode(instance: Container | Instance, output: string[]) {
    let theText: string | undefined;

    if ((instance as Instance).text) {
      theText = (instance as Instance).text;
    }

    if (theText) {
      output.push(theText);
    }

    let theChildren: Instance[] | undefined = instance.children;

    if (theChildren) {
      for (const childNode of theChildren) {
        this.processNode(childNode, output);
      }
    }
  }

  public output(container: Container) {
    const output: string[] = [];
    this.processNode(container, output);

    const loggedOutput = output.map(line => line.trimRight()).join('\n');
    this.logger(loggedOutput);
  }
}

const createTerminalOutputter = (logger: LogUpdate) => {
  return new TerminalOutputter(logger);
};

export default createTerminalOutputter;
