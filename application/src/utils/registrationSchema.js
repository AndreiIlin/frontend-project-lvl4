import * as Yup from 'yup';
import i18n from '../i18n.js';

export default Yup.object().shape({
  username: Yup.string()
    .required(i18n.t('registrationPage.errors.usernameReq'))
    .min(3, i18n.t('registrationPage.errors.usernameMin'))
    .max(20, i18n.t('registrationPage.errors.usernameMax')),
  password: Yup.string()
    .required(i18n.t('registrationPage.errors.passwordReq'))
    .min(6, i18n.t('registrationPage.errors.passwordMin')),
  passwordConfirmation: Yup.string()
    .required(i18n.t('registrationPage.errors.passwordConfirmationReq'))
    .oneOf([Yup.ref('password')], i18n.t('registrationPage.errors.passwordConfirmationSame')),
});
