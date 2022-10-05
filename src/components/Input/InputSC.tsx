import styled from 'styled-components';
import { withDynamicTag } from '../../styles/stylesUtils/withDynamicTag';

export type InputProps = {
  tag?: string | undefined;
  id?: string;
  type?: string;
};

const InputSCBase = styled.input<InputProps>`
  border-radius: 4px;
  padding: 10px 20px;
  border: 1px solid #cecece;
  color: #fff;
  font-size: 14px;
  background: #1c1c22;
  width: 100%;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.tag === 'textarea' &&
    `
    min-height: 70px;
    resize: vertical;
  `}
`;

// TODO: Maybe export default, and for types, named export
export const InputSC = withDynamicTag(InputSCBase);
