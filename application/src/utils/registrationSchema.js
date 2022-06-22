import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .required('Поле "Имя пользователя" обязательно для заполнения!')
    .min(3, 'Длина имени должна быть более 3 символов')
    .max(20, 'Длина имени должна быть менее 20 символов'),
  password: Yup.string()
    .required('Поле "Пароль" обязательно для заполнения!')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  passwordConfirmation: Yup.string()
    .required('Поле "Повторите пароль" обязательно для заполнения!')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});
