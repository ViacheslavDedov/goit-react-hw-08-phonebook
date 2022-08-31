import ContactName from 'components/ContactItem';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import { Heading } from 'components/Section/Section.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/auth/auth-operations';
import { ContactItem, ContactList } from './Contacts.styled';

const Contacts = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);
  const isUserLogin = useSelector(state => state.auth.isLoading);
  if (isUserLogin) {
  }
  const filterContacts = () => {
    if (!data) {
      return;
    } else
      return data.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
  };
  return (
    <>
      <Heading>Contacts</Heading>
      <Filter />
      <ContactList>
        {isLoading && <Loader />}
        {filterContacts() &&
          filterContacts().map(item => (
            <ContactItem key={item.id}>
              <ContactName name={item.name} tel={item.number} id={item.id} />
            </ContactItem>
          ))}
        {error && Notify.failure('Sorry request failed')}
      </ContactList>
    </>
  );
};

export default Contacts;