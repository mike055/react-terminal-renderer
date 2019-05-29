import { Instance, Container } from './types';

export const createInstance = (type: string) => {
  const instance: Instance = {
    tag: type.toUpperCase(),
    children: [],
  };

  return instance;
};

export const appendChild = (
  parentInstance: Instance | Container,
  child: Instance
) => {
  if (parentInstance.children) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  }
};

export const insertBefore = (
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

export const removeChild = (
  parentInstance: Instance | Container,
  child: Instance
) => {
  if (parentInstance.children) {
    const index = parentInstance.children.indexOf(child);
    parentInstance.children.splice(index, 1);
  }
};
