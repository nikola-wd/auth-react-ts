import { FieldError } from 'react-hook-form';
import styled from 'styled-components';
// TODO: Add SC suffix

export const FormFieldWrap = styled.div<{ error?: FieldError | undefined }>`
  font-size: 13px;

  label {
    letter-spacing: 0.1em;
    color: #fff;
    font-weight: 300;

    a {
      color: #ffffffb7;
      opacity: 0.9;
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  input,
  textarea {
    margin-top: 8px;
    border-radius: 4px;
    padding: 10px 20px;
    border: 1px solid #cecece;
    color: #fff;
    font-size: 14px;
    background: #1c1c22;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }

  textarea {
    min-height: 70px;
    resize: vertical;
  }

  ${(props) => {
    if (props?.error) {
      return `
        > input, > textarea {
          border-color: #ef5e7a;
        }
      `;
    }
  }}
`;
