import { Container } from 'components/App/App.styled';
import { SectionWrap } from 'components/Home/Home.styled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useCurrentUserQuery, useLoginUserMutation
} from 'redux/auth/auth-operations';
import {
  FormBlock, FormButtonSubmit, FormInput,
  FormLabel, FormRegister
} from './UserForm.styled';

export const UserLogin = ({ nameI = 'User', skip = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addLoginUser] = useLoginUserMutation();
  const isToken = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  if (isToken !== null) {
    skip = false;
  }
  useCurrentUserQuery(nameI, { skip });

  const handelChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const loginUser = () => {
    const newUser = {
      email,
      password,
    };
    addLoginUser(newUser).then(({ error }) => {
      if (error && error.status === 400) {
        return toast.error('Email or password is incorrect ', {theme: "colored"});
      }
      navigate('/contacts', { replace: true });
    });
  };
  const handelSubmit = evt => {
    evt.preventDefault();
    loginUser();
    setEmail('');
    setPassword('');
  };
  return (
    <SectionWrap>
      <Container>
        <FormRegister onSubmit={handelSubmit}>
          <FormBlock className="form-floating mb-3">
            <FormInput
              type="email"
              name="email"
              required
              value={email}
              className="form-control"
              id="floatingInput"
              placeholder="email"
              onChange={handelChange}
            />
            <FormLabel htmlFor="floatingInput">Email address</FormLabel>
          </FormBlock>
          <FormBlock className="form-floating">
            <FormInput
              type="password"
              name="password"
              required
              value={password}
              className="form-control"
              id="floatingPassword"
              placeholder="password"
              onChange={handelChange}
            />
            <FormLabel htmlFor="floatingPassword">Password</FormLabel>
          </FormBlock>
          <FormButtonSubmit className="btn btn-light">
            Sign In{' '}
          </FormButtonSubmit>
        </FormRegister>
      </Container>
    </SectionWrap>
  );
};