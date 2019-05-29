import { HostConfig } from 'react-reconciler';
import { FrameCallbackType, CallbackNode } from 'scheduler';

import { COLOR } from './colors';

export type Container = {
  children: Instance[];
  tag: 'CONTAINER';
};

export type Instance = {
  props?: object;
  children?: Instance[];
  rootContainerInstance?: Container;
  tag: string;
  text?: string;
  styles?: TextStyles;
};

export type TextStyles = {
  bold?: boolean;
  color?: COLOR;
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

/* eslint-disable @typescript-eslint/camelcase */
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
/* eslint-enable @typescript-eslint/camelcase */

export type Options = {
  input: NodeJS.ReadStream;
  output: NodeJS.WriteStream;
};
