import s from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const notifySuccess = () => toast.success('login success');
const notifyError = () => toast.error('login error');

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        notifySuccess();
      })
      .catch(() => {
        notifyError();
      });
    actions.resetForm();
  };

  const emailFieldId = useId();
  const pswrdFieldId = useId();

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
        <Form className={s.form}>
          <label htmlFor={emailFieldId}>Email</label>
          <Field className={s.input} type='email' name='email' id={emailFieldId} />
          <ErrorMessage className={s.error} name='email' component='span' />

          <label htmlFor={pswrdFieldId}>Password</label>
          <Field className={s.input} type='password' name='password' id={pswrdFieldId} />
          <ErrorMessage className={s.error} name='password' component='span' />

          <button className={s.btn} type='submit'>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
