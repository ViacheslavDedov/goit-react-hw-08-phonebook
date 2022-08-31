import { Container } from 'components/App/App.styled';
import ContactList from 'components/Contacts';
import Loader from 'components/Loader/Loader';
import Section from 'components/Section/Section';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAddContactMutation, useGetContactsQuery } from 'redux/auth/auth-operations';
import { Button, FormName, InputName, Label } from './ContactForm.styled';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

  const [addContact, { isLoading }] = useAddContactMutation();
  const { data } = useGetContactsQuery();

const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
        case 'name':
            setName(value);
            break;
        case 'number':
            setNumber(value);
            break;
        default:
            break;
    }
};
    
const handleSubmit = async evt => {
    evt.preventDefault();

    if (data.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
    resetForm();
        return Notify.failure(`${name} is already in contacts!`);
    }

    if (data.some(contact => contact.number === number)) {
    resetForm();
        return Notify.failure(`${number} is already in contacts!`);
    }
    
    if (name && number) {
        await addContact({ name: name, number: number });
        Notify.success(`${name} added to contacts!`);
    resetForm();
    }
  };
    
const resetForm = () => {
    setName('');
    setNumber('');
    }
    
    return (
        <Container>
            <Section title={'Phonebook'}>
            <FormName onSubmit={handleSubmit}>

                <Label>
                Name
                    <InputName
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                    </Label>{' '}

                <br />

                    <Label>
                    Phone
                    <InputName
                    type="tel"
                    name="phone"
                    value={number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                    </Label>

                <Button type="submit">
            {isLoading ? <Loader /> : 'Add contact'}
          </Button>

            </FormName>
            <ContactList />
            </Section>
            </Container>
    )}

export default ContactForm;