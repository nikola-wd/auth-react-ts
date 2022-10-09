import styled from 'styled-components';

export const AdminPostCardSC = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 20px 30px;
  background: #222;
  margin-bottom: 15px;
`;

export const AdminPostCardTitleSC = styled.h3`
  font-weight: 600;
  margin-bottom: 10px;

  a {
    color: #fff;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AdminPostCardDateSC = styled.span`
  display: inline-flex;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.3);
  margin-right: 4px;
`;
