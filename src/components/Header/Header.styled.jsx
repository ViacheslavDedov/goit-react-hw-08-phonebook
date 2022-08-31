import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const NavBar = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 90px;
  font-weight: 400;
  font-size: 34px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavLinkStyled = styled(NavLink)`
  color: orange;
  font-weight: 400;
  margin-right: 30px;
`;

export const NavButtonStyled = styled.button`
  color: black;
  font-weight: 400;
  cursor: pointer;
  background-color: orange;
  border-radius: 6px;
  padding: 10px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 30px;
`;

export const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
