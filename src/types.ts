export type Container = {
  children: Instance[];
  tag: 'CONTAINER';
};

export type Instance = {
  type?: string;
  props?: object;
  children?: Instance[];
  rootContainerInstance?: Container;
  tag: 'INSTANCE' | 'TEXT';
  text?: string;
};

export type Type = string;
export type Props = object;
export type HydratableInstance = Instance;
export type PublicInstance = Instance;
export type HostContext = object;
export type UpdatePayload = object;
export type ChildSet = undefined; // Unused
export type TimeoutHandle = any;
export type NoTimeout = -1;
