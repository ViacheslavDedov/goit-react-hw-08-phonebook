import ContactItem from 'components/ContactItem';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/operations';
import css from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(state => state.contacts.filter);
  const {data, isLoading} = useGetContactsQuery();

  const filterContacts = () => {
  
return (data && data.filter(contact =>
  contact.name.toLowerCase().includes(filter.toLowerCase()))
  );
};

  return (
    <>
      {isLoading && <Loader />}
        <ul className={css.contacts}>
          { data && !isLoading && filterContacts().length > 0
          ? (
                filterContacts().map(({id, name, phone}) =>  (
          
          <ContactItem
            key={id}
            id={id}
            name={name}
            phone={phone}
          />
              ))
            )
          : (<p className={css.contacts__message}>Your phonebook is empty !!!</p>)
          }
        </ul>
    </>
  )
}

export default ContactList;