import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/auth/auth-operations';
import Loader from '../Loader/Loader';
import { ContactText, DeleteButton, Tel } from './ContactItem.styled';

const ContactName = ({ id, name, tel }) => {

    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
    
    return (
    <ContactText>
      {name}: <Tel>{tel}</Tel>
      <DeleteButton onClick={() => deleteContact(id)} disabled={isDeleting}>
        {isDeleting ? <Loader /> : 'Delete'}
      </DeleteButton>
    </ContactText>
    )
};

ContactName.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
};

export default ContactName;