import styled from '@emotion/styled';

export const FormName = styled.form`
  width: 300px;
  border: 1px solid black;
  padding: 15px;
  margin-bottom: 20px;
`;

export const InputName = styled.input`
  width: 180px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Button = styled.button`
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

