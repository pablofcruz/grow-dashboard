import React, { useEffect } from 'react';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Home = () => {
  
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);

    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <h1>Hola : {localStorage.getItem("email")}</h1>
      <Link to='/'>
        <button onClick={logOut}>Cerrar sesión</button>
      </Link>
    </div>
  );
};

export default Home;
