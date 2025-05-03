import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <div className={css.contact}>
        <p>
          <FaUser className={css.margin} size={20} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.margin} size={20} />
          {number}
        </p>
      </div>
      <button className={css.btn} type='button' onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
