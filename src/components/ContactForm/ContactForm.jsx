import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './ContactForm.module.css';
import { useId } from 'react';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { Button } from '@mui/material';

const style = {
  borderRadius: '5px',
  padding: '0',
  width: '320px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  fontSize: '20px',
};

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  number: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const initialValues = {
  id: '',
  name: '',
  number: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    dispatch(addContact(values));
    actions.resetForm();
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactSchema}>
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Name
        </label>
        <Field
          className={css.field}
          type='text'
          name='name'
          id={nameFieldId}
          placeholder='Your name'
        />
        <ErrorMessage className={css.error} name='name' component='span' />

        <label className={css.label} htmlFor={numberFieldId}>
          Number
        </label>
        <Field
          className={css.field}
          type='text'
          name='number'
          id={nameFieldId}
          placeholder='123-45-67'
        />
        <ErrorMessage className={css.error} name='number' component='span' />
        <Button variant='contained' color='success' sx={style} type='submit'>
          Add Contact
          <FaUserPlus size={20} />
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
