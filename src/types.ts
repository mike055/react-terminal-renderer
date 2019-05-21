import { HostConfig } from 'react-reconciler';
import { FrameCallbackType, CallbackNode } from 'scheduler';

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

export interface ExtendedHostConfig
  extends HostConfig<
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
  > {
  schedulePassiveEffects: (
    callback: FrameCallbackType,
    deprecated_options?: { timeout: number }
  ) => CallbackNode;
  cancelPassiveEffects: (callbackNode: CallbackNode) => void;
}
