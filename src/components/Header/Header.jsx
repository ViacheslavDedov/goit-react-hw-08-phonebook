import { Container } from 'components/App/App.styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from 'redux/auth/auth-operations';
import {
  HeaderBlock, HeaderWrapper,
  LinkWrapper,
  NavBar, NavButtonStyled, NavLinkStyled,
  UserName
} from './Header.styled';

export const Header = () => {
  const userName = useSelector(state => state.auth.user.name);
  const isUserLogin = useSelector(state => state.auth.isLoading);
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();
  const userExit = () => {
    logout();
    navigate('/', { replace: true });
  };
  return (
    <>
      <NavBar>
        <Container>
          <HeaderWrapper>
            <HeaderBlock>
              <LinkWrapper>
                {!isUserLogin ? (
                  <>
                    <NavLinkStyled to="/">Home</NavLinkStyled>
                    <NavLinkStyled to="/register">Sign Up</NavLinkStyled>
                    <NavLinkStyled to="/login">Login</NavLinkStyled>
                  </>
                ) : (
                  <>
                    <NavLinkStyled to="/contacts">Contacts</NavLinkStyled>
                    <NavButtonStyled onClick={() => userExit()}>
                      Logout
                    </NavButtonStyled>
                  </>
                )}
              </LinkWrapper>
            </HeaderBlock>
            {isUserLogin && (
              <UserName>
                {userName}
              </UserName>
            )}
          </HeaderWrapper>
        </Container>
      </NavBar>
    </>
  );
};