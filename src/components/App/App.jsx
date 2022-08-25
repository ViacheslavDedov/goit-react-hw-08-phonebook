import ContactForm from '../ContactForm';
import ContactList from "../ContactList";
import Filter from '../Filter';
import css from './App.module.css';

const App = () => {
    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
          <ContactForm/>
            <h2>Contacts</h2>
          <Filter/>
        <ContactList/>
      </div>
    )
};

export default App;
