// import styled, { css } from 'styled-components';
import styled from 'styled-components';

export const HeaderSC = styled.header`
  // TODO: where to define variables
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1c1c22;
  padding: 10px 20px;
  min-height: 60px;
  color: #fff;
`;

export const HeaderActionsSC = styled.div`
  display: flex;
  justify-content: space-between;

  > * + * {
    margin-left: 8px;
  }

  a {
    text-decoration: none;
    display: inline-flex;

    &.active button {
      box-shadow: inset 0 0 0 2px #fff;
    }
  }
`;
