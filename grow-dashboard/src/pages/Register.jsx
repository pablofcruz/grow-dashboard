import React, { useState, useEffect } from 'react';
import '../components/Register.css';
import { auth, signInWithGoogle} from '../Firebase'
import { Button } from '@mui/material'
import { Link} from 'react-router-dom';

const Register = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const pages = [
    { id: 'page-1', label: '1' },
    { id: 'page-2', label: '2' },
    { id: 'page-3', label: '3' },
    { id: 'page-4', label: '4' },
  ];

  const isLastPage = currentPage === pages.length;

 

  return (
    <div>
      {user && (
        <div className="registro">
          <div className="registro__nav">
            {pages.map((page, index) => (
              <div
                key={page.label}
                className={`registro__nav-item ${
                  index < currentPage ? 'registro__nav-item--active' : ''
                }`}
              ></div>
            ))}
          </div>
          <div className="registro__page">
            {currentPage === 1 && (
              <div>
                <h1>Digita el rut de tu empresa</h1>
                <input type="text" placeholder="12345678-9" />
              </div>
            )}
            {currentPage === 2 && (
              <div>
                <input type="text" placeholder="Nombre de la empresa" />
                <h5>Boletas</h5>
                <select type="text" placeholder="Ciudad" />
                <h5>¿Qué facturador electrónico utilizas?</h5>
                <select type="text" placeholder="Ciudad" />
              </div>
            )}
            {currentPage === 3 && (
              <div>
                <h1>Conecta con el SII</h1>
                <input type="password" placeholder="Contraseña del SII" />
              </div>
            )}
            {currentPage === 4 && (
              <div>
                <h5>Conexión a tu banco</h5>
              </div>
            )}
          
            {currentPage === pages.length ? (
        <Link to="/Home">
          <Button variant="contained" size='large' color="success">
            Crear cuenta
          </Button>
        </Link>
             ) : (
        <Button variant="contained" size='large' onClick={handleNextPage} color="success">
          Siguiente
        </Button>
             )}
                </div>
              </div>
            )}

            <button onClick={signInWithGoogle}>Sign In With Google</button>
            
   

    </div>
  );
};
export default Register
