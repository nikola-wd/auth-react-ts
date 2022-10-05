import { createElement } from 'react';
import styled from 'styled-components';

/**
 * Used as a helper to create dynamic styled components tag names
 **/

// TODO: Better types
export const withDynamicTag = (Component: any) => {
  const bucket = Object.create(null);

  // TODO: Better types

  const DynamicTag = (props: { tag?: any }) => {
    const { tag } = props;

    if (typeof tag !== 'string' || !styled.hasOwnProperty(tag)) {
      return createElement(Component, props);
    }

    if (bucket[tag] === undefined) {
      bucket[tag] = Component.withComponent(tag);
    }

    return createElement(bucket[tag], props);
  };

  const name = Component.displayName || Component.constructor.name;

  if (name) {
    DynamicTag.displayName = `DynamicTag(${name})`;
  }

  return DynamicTag;
};
