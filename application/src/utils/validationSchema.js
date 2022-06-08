import * as Yup from 'yup';

export default Yup.object().shape({
  nickname: Yup.string()
    .required('Поле "Ваш ник" обязательно для заполнения!'),
  password: Yup.string()
    .required('Поле "Пароль" обязательно для заполнения!'),
});
