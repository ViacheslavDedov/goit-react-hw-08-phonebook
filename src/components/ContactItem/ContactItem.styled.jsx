import styled from '@emotion/styled';

export const ContactText = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Tel = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  color: black;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  width: 120px;
  text-align: center;
  background-color: orange;
  border-radius: 6px;
  font-weight: bold; 

    :hover {
      background-color: grey;
    }
`;
