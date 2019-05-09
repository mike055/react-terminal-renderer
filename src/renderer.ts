import ReactReconciler, { HostConfig } from 'react-reconciler';

interface Container {
  children: Instance[];
  tag: 'CONTAINER';
}

interface Instance {
  type?: string;
  props?: object;
  children?: Instance[];
  rootContainerInstance?: Container;
  tag: 'INSTANCE' | 'TEXT';
  text?: string;
}

const processNode = (instance: Container | Instance) => {
  let theText: string | undefined;

  if ((instance as Instance).text) {
    theText = (instance as Instance).text;
  }

  if (theText) {
    process.stdout.write(theText);
  }

  let theChildren: Instance[] | undefined = instance.children;

  if (theChildren) {
    for (const childNode of theChildren) {
      processNode(childNode);
    }
  }
};

const flush = (container: Container) => {
  processNode(container);
};

type Type = string;
type Props = object;
type HydratableInstance = Instance;
type PublicInstance = Instance;
type HostContext = object;
type UpdatePayload = object;
type ChildSet = undefined; // Unused
type TimeoutHandle = any;
type NoTimeout = -1;

const HOST_CONTEXT: HostContext = {};
const UPDATE_SIGNAL = {};

const appendChild = (parentInstance: Instance | Container, child: Instance) => {
  //console.log('appendInitialChild', parentInstance, child);

  if (parentInstance.children) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  }
};

const insertBefore = (
  parentInstance: Instance | Container,
  child: Instance,
  beforeChild: Instance
) => {
  if (parentInstance.children) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild);
    parentInstance.children.splice(beforeIndex, 0, child);
  }
};

const removeChild = (parentInstance: Instance | Container, child: Instance) => {
  //console.log('removeChild');
  if (parentInstance.children) {
    const index = parentInstance.children.indexOf(child);
    parentInstance.children.splice(index, 1);
  }
};

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
    flush(containerInfo);
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
