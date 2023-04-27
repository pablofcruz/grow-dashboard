import React, { useState, useEffect } from 'react';
import '../components/Register.css';
import { auth, signInWithGoogle, db} from '../Firebase'

import {collection,getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import Registro from '../components/Registro';

const Register = () => {
  const [newName, setnewName]= useState("")
  const [newAge, setnewAge]= useState(0)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  const UpdateUser = async (id, edad) => {
   
    const userDoc = doc(db, "users", id);
    const newFields = { edad: edad + 1 };
    await updateDoc(userDoc, newFields);
  }

  const createUser= async () =>{
    await addDoc(usersCollectionRef, {nombre: newName, edad: Number(newAge)})
  }
  const deleteUser = async (id) =>{
    const userDoc = doc (db, "users", id)
    await deleteDoc(userDoc)

  }

  const getDocumentId = (index) => {
    const userDoc = users[index];
    return userDoc.id;
  }

  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, []);

  return (
    <div>
      {users.map((user, index)=>
      {return(
        <div key={index}>
          <h1>nombre: {user.nombre}</h1> 
          <h1>edad: {user.edad}</h1> 
          <button onClick={()=> {UpdateUser(getDocumentId(index), user.edad)}}>añadir un año</button>
          <button onClick={()=>{deleteUser(getDocumentId(index))}}>Eliminar usuario</button>
        </div>
      )})}
      <Registro/>
     
</div>
);
}
export default Register;




