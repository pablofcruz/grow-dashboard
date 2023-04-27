
import { Button } from '@mui/material'
import { Link} from 'react-router-dom';
import {  signInWithGoogle, auth, db} from '../Firebase'
import React, { useState, useEffect } from 'react';
import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore';
const Registro = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState();
  const [showRedirect, setRedirect] = useState()
  const usersCollectionRef = collection(db, "empresas")
  const docId = localStorage.getItem("email")
  const [formData, setFormData] = useState({
      rut: '',
      nombreEmpresa: '',
      cantidadBoletas: '',
      total: '',
      datosBancarios: ''
  });

  const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        const docId = user.email;
        const docRef = doc(usersCollectionRef, docId);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setRedirect(true)
            setShowForm(false);
          } else {
           
            setShowForm(true);
          }
        }).catch((error) => {
          console.error("Error al obtener el documento:", error);
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleFormChange = (event) => {
      setFormData({
          ...formData,
          [event.target.name]: event.target.value
      });
  };

  const handleSubmit = async () => {
    await setDoc(doc(usersCollectionRef, docId), {
      rut: formData.rut,
      nombreEmpresa: formData.nombreEmpresa,
      cantidadBoletas: formData.cantidadBoletas,
      total: formData.total,
      datosBancarios: formData.datosBancarios
    });

  };
  const pages = [
      { id: 'page-1', label: '1' },
      { id: 'page-2', label: '2' },
      { id: 'page-3', label: '3' },
      { id: 'page-4', label: '4' },
  ];

  return (
      <div>
        {user ? null: (<Button variant="contained" onClick={signInWithGoogle}>Iniciar sesión con Google</Button>)}
        
        {showForm && (
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
             <input type="text" placeholder="12345678-9" name="rut" value={formData.rut} onChange={handleFormChange} />
         </div>
     )}
     {currentPage === 2 && (
         <div>
             <input type="text" placeholder="Nombre de la empresa" name="nombreEmpresa" value={formData.nombreEmpresa} onChange={handleFormChange} />
             <h5>Boletas</h5>
             <input type="text" placeholder="Cantidad de boletas" name="cantidadBoletas" value={formData.cantidadBoletas} onChange={handleFormChange} />
             <input type="text" placeholder="Total" name="total" value={formData.total} onChange={handleFormChange} />
         </div>
     )}
     {currentPage === 3 && (
         <div>
             <h1>Ingresa tus datos bancarios</h1>
             <input type="number" name="datosBancarios" value={formData.datosBancarios} onChange={handleFormChange} />
         </div>
     )}
     {currentPage === 4 && (
         <div>
             <h1>Gracias por registrarte</h1>
         </div>
     )}
{currentPage === pages.length ? (
<Link to="/Home">
<Button onClick={handleSubmit} variant="contained" size='large' color="success">
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
{showRedirect &&(<h5>Esta cuenta ya tiene una empresa asociada, inicia sesión</h5>)}

         
        </div>
    );
};

export default Registro;