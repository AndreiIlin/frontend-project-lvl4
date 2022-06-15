import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="text-center">
      <img src="../assets/page404.jpeg" alt="Page not found" className="img-fluid"/>
      <h1 className="h4">Страница не найдена</h1>
      <p>Но вы можете перейти <Link to="/">на главную страницу</Link></p>
    </div>
  )
};

export default Page404;
