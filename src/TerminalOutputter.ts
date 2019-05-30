import { Instance, Container } from './types';
import { LogUpdate } from 'log-update';
import autoBind from 'auto-bind';

import textTransform from './textTransform';

export class TerminalOutputter {
  private logger: LogUpdate;

  constructor(logger: LogUpdate) {
    autoBind(this);
    this.logger = logger;
  }

  private allChildrenText(children: Instance[]) {
    let allChildrenAreText = true;

    for (const childNode of children) {
      let theText: string | undefined;

      if ((childNode as Instance).text) {
        theText = (childNode as Instance).text;
      }

      if (!theText) {
        return false;
      }
    }

    return allChildrenAreText;
  }

  private combineChildrenAsText(children: Instance[]) {
    let combinedResult = '';

    for (const childNode of children) {
      let theText: string | undefined;

      if ((childNode as Instance).text) {
        theText = (childNode as Instance).text;
      }

      if (theText) {
        combinedResult += textTransform(theText, childNode.styles);
      }
    }

    return combinedResult;
  }

  private processNode(instance: Container | Instance, output: string[]) {
    let theText: string | undefined;

    if ((instance as Instance).text) {
      theText = (instance as Instance).text;
    }

    if (theText) {
      output.push(textTransform(theText, (instance as Instance).styles));
      return;
    }

    let theChildren: Instance[] | undefined = instance.children;

    if (theChildren) {
      if (this.allChildrenText(theChildren)) {
        output.push(this.combineChildrenAsText(theChildren));
        return;
      }

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
    //console.log(JSON.stringify(container, null, 2));
    //process.stdout.write(loggedOutput);
  }
}

const createTerminalOutputter = (logger: LogUpdate) => {
  return new TerminalOutputter(logger);
};

export default createTerminalOutputter;
