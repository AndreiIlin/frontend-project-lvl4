import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import page404 from '../assets/page404.jpeg';
import routes from '../utils/routes.js';

const Page404 = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'page404' });
  return (
    <div className="text-center">
      <img src={page404} alt="Page not found" className="img-fluid w-50 my-3" />
      <h1 className="h4">
        {t('pageNotFound')}
      </h1>
      <p>
        {t('navigate')}
        <Link to={routes.chatPage()}>{t('mainPage')}</Link>
      </p>
    </div>
  );
};
export default Page404;
