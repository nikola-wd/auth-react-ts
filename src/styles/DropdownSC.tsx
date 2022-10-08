import styled from 'styled-components';

type DropdownStateType = {
  isOpen: boolean;
};

export const DropdownWrapSC = styled.div<DropdownStateType>`
  position: relative;
`;

export const DropdownContentSC = styled.div<DropdownStateType>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 4px;
  padding: 10px;
  max-width: 200px;
  background: #222;
  right: 0;
  top: calc(100% + 20px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  span {
    display: inline-flex;
    padding: 4px 0;
    margin-bottom: 6px;
  }
`;
