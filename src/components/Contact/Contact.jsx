import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { deleteContact } from '../../redux/contacts/operations';
import { Button } from '@mui/material';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={s.container}>
      <div className={s.contact}>
        <p>
          <FaUser className={s.margin} size={20} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={s.margin} size={20} />
          {number}
        </p>
      </div>
      <Button
        variant='contained'
        color='error'
        type='button'
        className={s.btn}
        onClick={handleClick}
      >
        Delete
      </Button>
    </div>
  );
};

export default Contact;
