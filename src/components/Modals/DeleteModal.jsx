import { Modal, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactToDelete, selectIsDeleteModalOpen } from '../../redux/contacts/selectors';
import { closeDeleteModal } from '../../redux/contacts/slice';
import { deleteContact } from '../../redux/contacts/operations';

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
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
};

export default function DeleteModal() {
  const dispatch = useDispatch();

  const id = useSelector(selectContactToDelete);

  const isModalOpen = useSelector(selectIsDeleteModalOpen);

  const handleClose = () => dispatch(closeDeleteModal());

  const handleDeleteClick = () => {
    dispatch(deleteContact(id));
    handleClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h6'>Delete?</Typography>
        <Button variant='contained' color='success' type='button' onClick={handleDeleteClick}>
          Yes
        </Button>
        <Button variant='contained' color='error' type='button' onClick={handleClose}>
          No
        </Button>
      </Box>
    </Modal>
  );
}
