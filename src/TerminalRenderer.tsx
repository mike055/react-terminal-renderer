import React from 'react';
import ReactReconciler, { Reconciler } from 'react-reconciler';
import autoBind from 'auto-bind';
import logUpdate from 'log-update';

import App from './components/App';
import createTerminalOutputter from './TerminalOutputter';
import createReconcilerConfig from './reconciler';
import { PublicInstance, Instance, Container, Options } from './types';

export default class TerminalRenderer {
  private reconciler: Reconciler<Instance, Instance, Container, PublicInstance>;
  private container: ReactReconciler.FiberRoot;
  private options: Options;

  constructor(options: Options) {
    autoBind(this);

    this.options = options;

    const logger = logUpdate.create(options.output, {
      showCursor: false,
    });

    const terminalOutputter = createTerminalOutputter(logger);
    const reconcilerConfig = createReconcilerConfig(terminalOutputter);
    this.reconciler = ReactReconciler(reconcilerConfig);

    this.container = this.reconciler.createContainer(
      {
        children: [],
        tag: 'CONTAINER',
      },
      false,
      false
    );
  }

  public render(children: React.ReactNode) {
    const app = <App options={this.options}>{children}</App>;
    this.reconciler.updateContainer(app, this.container, null, () => {});
  }
}
