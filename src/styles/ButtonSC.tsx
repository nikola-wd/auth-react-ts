import styled from 'styled-components';

export const ButtonSC = styled.button<{
  primary?: boolean;
  isWide?: boolean;
  size?: undefined | 'small' | 'large';
  type?: 'button' | 'submit';
  onClick?: undefined | (() => void);
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  ${(props) => {
    // medium is default
    let sizeCSS = `
      padding: 10px 20px;
      font-size: 12px;
    `;

    if (props?.size === 'small') {
      sizeCSS = `
        padding: 8px 16px;
        font-size: 10px;
    `;
    }

    if (props?.size === 'large') {
      sizeCSS = `
        padding: 12px 22px;
        font-size: 16px;
    `;
    }
    return sizeCSS;
  }}
  color: #fff;
  cursor: pointer;
  border: 0;
  transition: all 0.2s ease-in-out;

  background: ${(props) => (props?.primary ? '#555ab9' : '#555555')};

  ${(props) =>
    props?.isWide &&
    `
    width: 100%;
  `}

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 15px;
    height: 15px;
    margin-left: 6px;
    animation: spin 2s infinite linear;
  }
`;
