import * as Yup from 'yup';
import i18n from '../i18n.js';

export default Yup.object().shape({
  username: Yup.string()
    .required(i18n.t('loginPage.errors.usernameReq')),
  password: Yup.string()
    .required(i18n.t('loginPage.errors.passwordReq')),
});
