import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddContactMutation, useGetContactsQuery } from 'redux/operations';
import css from './ContactForm.module.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

  const [addContacts] = useAddContactMutation();
  const { data } = useGetContactsQuery();

const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
        case 'name':
            setName(value);
            break;
        case 'phone':
            setPhone(value);
            break;
        default:
            break;
    }
};
    
const handleSubmit = async evt => {
    evt.preventDefault();

    if (data.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
    resetForm();
        return toast.error(`${name} is already in contacts!`, {theme: "colored"});
    }

    if (data.some(contact => contact.phone === phone)) {
    resetForm();
        return toast.error(`${phone} is already in contacts!`, {theme: "colored"});
    }
    
    if (name && phone) {
        await addContacts({ name: name, phone: phone });
        toast.success(`${name} added to contacts!`, {theme: "colored"});
    resetForm();
    }
  };
    
const resetForm = () => {
    setName('');
    setPhone('');
    }
    
    return (
        <>
          <ToastContainer
                autoClose={3000}
                position="top-center"
          />
            <form className={css.form} onSubmit={handleSubmit}>

                <label className={css.form__label}>
                Name
                    <input
                    className={css.form__input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                    </label>

                <br />

                    <label className={css.form__label}>
                    Phone
                    <input
                    className={css.form__input}
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                    </label>

                <button className={css.form__btn} type="submit">Add contact</button>

            </form>
            </>
    )}

export default ContactForm;