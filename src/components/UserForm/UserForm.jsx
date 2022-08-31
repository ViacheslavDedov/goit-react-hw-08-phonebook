import { Container } from 'components/App/App.styled';
import { SectionWrap } from 'components/Home/Home.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useAddUserMutation,
  useCurrentUserQuery
} from 'redux/auth/auth-operations';
import {
  FormBlock, FormButtonSubmit, FormInput,
  FormLabel, FormRegister
} from './UserForm.styled';

export const UserForm = ({ nameI = 'User', skip = true }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addNewUser] = useAddUserMutation();
  const isToken = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  
  if (isToken !== null) {
    skip = false;
  }
  useCurrentUserQuery(nameI, { skip });

  const handelChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
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
  const addUser = () => {
    const newUser = {
      name,
      email,
      password,
    };
    addNewUser(newUser).then(({ error }) => {
      
      if (error) {
        const newName = error.data.name;
        const errorPassword = error.data.message;
        if (newName && newName === 'MongoError') {
          return Notify.failure(`A user email  ${email} already exists`);
        }
        if (errorPassword) {
          return Notify.failure(`${errorPassword}`);
        }
      }
      navigate('/contacts', { replace: true });
    });
  };
  const handelSubmit = evt => {
    evt.preventDefault();
    addUser();
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <SectionWrap>
      <Container>
        <FormRegister onSubmit={handelSubmit}>
          <FormBlock className="form-floating mb-3">
            <FormInput
              type="text"
              name="name"
              required
              value={name}
              className="form-control"
              id="floatingName"
              placeholder="name"
              onChange={handelChange}
            />
            <FormLabel htmlFor="floatingInput"></FormLabel>
          </FormBlock>

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
            <FormLabel htmlFor="floatingInput"></FormLabel>
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
            <FormLabel htmlFor="floatingPassword"></FormLabel>
          </FormBlock>
          <FormButtonSubmit className="btn btn-light">Sign Up</FormButtonSubmit>
        </FormRegister>
      </Container>
    </SectionWrap>
  );
};