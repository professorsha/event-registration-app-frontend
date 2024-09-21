import css from './RegisterForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const RegisterForm = ({ eventId }) => {
  // Функция для отправки данных

  const handleSubmit = async (values, actions) => {
    try {
        console.log(values);
      // Отправляем POST-запрос с данными формы, включая eventId
      const response = await axios.post(
        "https://event-registration-app-backend-1.onrender.com/users",
        values // Передаем все значения формы (включая eventId)
      );
      console.log('Response:', response.data); // Логируем успешный ответ
    } catch (error) {
      console.error('Error creating user:', error); // Логируем ошибку, если запрос не удался
    } finally {
      actions.resetForm(); // Сбрасываем форму после отправки
    }
  };

  // Уникальные идентификаторы для полей формы
  const mailFieldId = useId();
  const fullNameFieldId = useId();
  const dateOfBirthFieldId = useId();
  const aboutEventSocialId = useId();
  const aboutEventFriendsId = useId();
  const aboutEventMyselfsId = useId();

  // Валидация данных формы с использованием Yup
  const register = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    fullName: Yup.string()
      .min(8, 'Full name must be at least 8 characters')
      .max(64, 'Full name must be no more than 64 characters')
      .required('Full name is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
  });

  return (
    <>
      <Toaster />
      <h1 className={css.title}>Event registration</h1>
      <Formik
        initialValues={{
          eventId: eventId, // Включаем eventId в начальные значения формы
          fullName: '',
          email: '',
          dateOfBirth: '',
          aboutEvent: 'social',
        }}
        validationSchema={register}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} name="Register">
          {/* Поле полного имени */}
          <label htmlFor={fullNameFieldId} className={css.label}>
            Full name
          </label>
          <Field
            type="text"
            name="fullName"
            id={fullNameFieldId}
            className={css.input}
            placeholder="Full name"
          />
          <ErrorMessage name="fullName" component="span" className={css.error} />

          {/* Поле электронной почты */}
          <label htmlFor={mailFieldId} className={css.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={mailFieldId}
            className={css.input}
            placeholder="Email"
          />
          <ErrorMessage name="email" component="span" className={css.error} />

          {/* Поле даты рождения */}
          <label htmlFor={dateOfBirthFieldId} className={css.label}>
            Date of birth
          </label>
          <Field
            type="date"
            name="dateOfBirth"
            id={dateOfBirthFieldId}
            className={css.input}
            placeholder="Date of birth"
          />
          <ErrorMessage name="dateOfBirth" component="span" className={css.error} />

          {/* Вопрос "Откуда узнали о мероприятии?" */}
          <span>Where did you hear about this event?</span>
          <div className={css.container_radiobox}>
            <Field
              type="radio"
              name="aboutEvent"
              id={aboutEventSocialId}
              className={css.radio_button}
              value="social"
            />
            <label htmlFor={aboutEventSocialId} className={css.label}>
              Social media
            </label>

            <Field
              type="radio"
              name="aboutEvent"
              id={aboutEventFriendsId}
              className={css.radio_button}
              value="friends"
            />
            <label htmlFor={aboutEventFriendsId} className={css.label}>
              Friends
            </label>

            <Field
              type="radio"
              name="aboutEvent"
              id={aboutEventMyselfsId}
              className={css.radio_button}
              value="myself"
            />
            <label htmlFor={aboutEventMyselfsId} className={css.label}>
              Found myself
            </label>
          </div>

          {/* Кнопка отправки */}
          <button type="submit" className={css.button}>
            Register
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
