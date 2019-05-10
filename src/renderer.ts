import ReactReconciler, { HostConfig } from 'react-reconciler';

import flushToTerminal from './terminal';
import { appendChild, removeChild, insertBefore } from './tree';

import {
  Type,
  Props,
  Container,
  Instance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout,
} from './types';

const HOST_CONTEXT: HostContext = {};
const UPDATE_SIGNAL = {};

const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  Instance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  getRootHostContext() {
    //console.log('getRootHostContext', rootContainerInstance);
    return HOST_CONTEXT;
  },

  getChildHostContext() {
    //console.log('getChildHostContext', parentHostContext, type, rootContainerInstance);
    return HOST_CONTEXT;
  },

  getPublicInstance(instance) {
    //console.log('getPublicInstance', instance);
    return instance;
  },

  prepareForCommit() {
    //console.log('prepareForCommit', containerInfo);
  },

  resetAfterCommit(containerInfo) {
    //console.log('resetAfterCommit', containerInfo);
    flushToTerminal(containerInfo);
  },

  createInstance(type, props, rootContainerInstance) {
    // //console.log('createInstance', type,
    // props,
    // rootContainerInstance,
    // hostContext,
    // internalInstanceHandle);

    return {
      type,
      props,
      children: [],
      rootContainerInstance,
      tag: 'INSTANCE',
    };
  },

  appendInitialChild(parentInstance, child) {
    //console.log('appendInitialChild', parentInstance, child);

    appendChild(parentInstance, child);
  },

  finalizeInitialChildren() {
    //console.log('finalizeInitialChildren', domElement,
    // type,
    // props,
    // rootContainerInstance,
    // hostContext);
    return false;
  },

  prepareUpdate() {
    //console.log('prepareUpdate', domElement,
    // type,
    // oldProps,
    // newProps,
    // rootContainerInstance,
    // hostContext);
    return UPDATE_SIGNAL;
  },

  shouldSetTextContent: () => {
    //console.log('shouldSetTextContent', type, props);
    return false;
  },

  shouldDeprioritizeSubtree() {
    //console.log('shouldDeprioritizeSubtree', type, props);
    return false;
  },

  createTextInstance(text) {
    // console.log('createTextInstance', text,rootContainerInstance,
    // hostContext,
    // internalInstanceHandle);
    return {
      text,
      tag: 'TEXT',
    };
  },

  now: Date.now,

  isPrimaryRenderer: true,
  scheduleDeferredCallback: (): number => {
    return 0;
  },
  cancelDeferredCallback: (): void => {},

  // -------------------
  //     Mutation
  // -------------------

  supportsMutation: true,
  supportsPersistence: true,
  supportsHydration: true,

  commitMount() {
    //console.log('commitMount', domElement, type, newProps, internalInstanceHandle);
  },

  commitUpdate() {
    //console.log('commitUpdate', domElement, type, oldProps, newProps, internalInstanceHandle);
  },

  resetTextContent() {
    //console.log('resetTextContent');
  },

  commitTextUpdate(textInstance, oldText, newText) {
    //console.log('commitTextUpdate');
    textInstance.text = newText;
  },

  appendChild(parentInstance, child) {
    //console.log('appendChild');
    appendChild(parentInstance, child);
  },

  appendChildToContainer(parentInstance, child) {
    //console.log('appendChildToContainer', container, child);
    appendChild(parentInstance, child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    //console.log('insertBefore', parentInstance, child, beforeChild);
    insertBefore(parentInstance, child, beforeChild);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    //console.log('insertInContainerBefore', container, child, beforeChild);
    insertBefore(parentInstance, child, beforeChild);
  },

  removeChild(parentInstance, child) {
    //console.log('removeChild');
    removeChild(parentInstance, child);
  },

  removeChildFromContainer(parentInstance, child) {
    //console.log('removeChildFromContainer');
    removeChild(parentInstance, child);
  },
  setTimeout: () => -1,
  clearTimeout: () => {},
  noTimeout: -1,
};

const renderer = (tree: React.ReactNode) => {
  const reconciler = ReactReconciler(hostConfig);

  //console.log('--------create container----------');
  const container = reconciler.createContainer(
    {
      children: [],
      tag: 'CONTAINER',
    },
    false,
    false
  );
  //console.log('--------create container----------');

  //console.log('--------upodate container----------');
  reconciler.updateContainer(tree, container, null, () => {});
  //console.log('--------upodate container----------');
};

export default renderer;
