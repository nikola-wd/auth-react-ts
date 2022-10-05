import styled from 'styled-components';

type FlexWrapProps = {
  cols: 1 | 2 | 3;
};

const gap = 20;

export const FlexWrapSC = styled.div<FlexWrapProps>`
  display: flex;
  justify-content: space-between;

  > * {
    ${(props) => `
      width: calc((100% - (${gap * (props.cols - 1)}px)) / 2);
    `}
  }
`;
