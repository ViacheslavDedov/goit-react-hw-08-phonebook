import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/operations';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, phone }) => {

    const [deleteContact] = useDeleteContactMutation();
    
    return (
    <li key={id} className={css.contacts__item}>
        <p>
            {name}:&nbsp; 
            <span>
            {phone}
            </span>
        </p>
        <button
            className={css.contacts__btn}
            type="button"
            onClick={() => deleteContact(id)} 
        >
            Delete
        </button>
    </li>
    )
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactItem;