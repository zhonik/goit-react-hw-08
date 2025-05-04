import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts } from './operations';
import { logOut } from '../auth/operations';
import toast from 'react-hot-toast';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const notifySuccess = () => toast.success('Contact successfully deleted');
const notifyError = () => toast.success('Не вдалося вилалити контакт');
const notifyAdd = () => toast.success('Contact successfully added');

const slice = createSlice({
  name: 'contacts',

  initialState: {
    items: [],
    isLoading: false,
    error: null,
    editableContact: null,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    contactToDelete: null,
  },

  reducers: {
    openEditModal: (state, action) => {
      state.editableContact = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal: state => {
      state.isEditModalOpen = false;
      state.editableContact = null;
    },
    updateEditableContact: (state, action) => {
      state.editableContact = {
        ...state.editableContact,
        ...action.payload,
      };
    },
    openDeleteModal: state => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: state => {
      state.isDeleteModalOpen = false;
      state.contactToDelete = null;
    },
    setContactToDelete: (state, action) => {
      state.contactToDelete = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
        notifyAdd();
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload);
        notifySuccess();
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        notifyError();
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      })
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const {
  openEditModal,
  closeEditModal,
  updateEditableContact,
  closeDeleteModal,
  openDeleteModal,
  setContactToDelete,
} = slice.actions;

export default slice.reducer;
