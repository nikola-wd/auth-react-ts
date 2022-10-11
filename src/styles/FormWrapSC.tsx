import styled from 'styled-components';

export const FormWrapSC = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 100px auto;

  form > * {
    margin-bottom: 20px;
  }

  footer {
    margin-top: 20px;
    font-size: 14px;

    a {
      color: #8c90da;
      opacity: 0.9;
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
