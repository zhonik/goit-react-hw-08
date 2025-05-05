import { Modal, Box, Button, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditableContact, selectIsEditModalOpen } from '../../redux/contacts/selectors';
import { closeEditModal, updateEditableContact } from '../../redux/contacts/slice';
import { editContact } from '../../redux/contacts/operations';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default function EditModal() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectIsEditModalOpen);
  const editableContact = useSelector(selectEditableContact);

  const handleClose = () => dispatch(closeEditModal());

  const handleEditContact = () => {
    dispatch(editContact(editableContact));
    handleClose();
  };

  if (!isModalOpen || !editableContact) return null;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      // aria-labelledby='modal-modal-title'
      // aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <b>Name</b>
        <Input
          type='text'
          autoFocus={true}
          value={editableContact.name}
          onChange={e => dispatch(updateEditableContact({ name: e.target.value }))}
          sx={{ mb: 2, padding: '3px 8px' }}
        />
        <b>Number</b>
        <Input
          type='text'
          value={editableContact.number}
          onChange={e => dispatch(updateEditableContact({ number: e.target.value }))}
          sx={{ mb: 2, padding: '3px 8px' }}
        />
        <Button variant='contained' color='primary' type='button' onClick={handleEditContact}>
          Edit
        </Button>
      </Box>
    </Modal>
  );
}
