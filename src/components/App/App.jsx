import { ContactForm } from 'components/ContactForm/ContactForm';
import { Header } from 'components/Header/Header';
import Home from 'components/Home/Home';
import { UserForm } from 'components/UserForm/UserForm';
import { UserLogin } from 'components/UserForm/UserLogin';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const isUserLogin = useSelector(state => state.auth.isLoading);
  const isRefreshing = useSelector(state => state.auth.isFetchingCurrent);
  return (
    isRefreshing && (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {isUserLogin ? (
            <>
              <Route path="/contacts" element={<ContactForm />} />
              <Route path="/register" element={<ContactForm />} />
              <Route path="/login" element={<ContactForm />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<UserForm />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/contacts" element={<UserLogin />} />
            </>
          )}
          <Route path="*" element={<Home />} />
        </Routes>
      </>
    )
  );
};

export default App;
