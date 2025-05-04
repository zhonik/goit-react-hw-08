import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
// import { deleteContact } from '../../redux/contacts/operations';
import { Button } from '@mui/material';
import { openDeleteModal, openEditModal, setContactToDelete } from '../../redux/contacts/slice';
import EditModal from '../Modals/EditModal';
import DeleteModal from '../Modals/DeleteModal';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(openEditModal(contact));
  };

  const handleDeleteClick = () => {
    dispatch(setContactToDelete(contact.id));
    dispatch(openDeleteModal());
  };

  return (
    <>
      <EditModal />
      <DeleteModal />
      <div className={s.container}>
        <div className={s.contact}>
          <p>
            <FaUser className={s.margin} size={20} />
            {contact.name}
          </p>
          <p>
            <FaPhoneAlt className={s.margin} size={20} />
            {contact.number}
          </p>
        </div>
        <div className={s.btnBox}>
          <Button
            variant='contained'
            color='primary'
            type='button'
            className={s.btnEdit}
            onClick={handleEditClick}
          >
            Edit
          </Button>

          <Button
            variant='contained'
            color='error'
            type='button'
            className={s.btn}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default Contact;
