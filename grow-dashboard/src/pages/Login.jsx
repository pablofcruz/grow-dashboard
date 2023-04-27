import { Button } from '@mui/material';
import React from 'react';
import {  signInWithGoogle, auth} from '../Firebase'
import { Link } from 'react-router-dom';



const Login = () => {
    return (
        <div>
           <h1>kieee</h1>
           <img src="" alt="traba" />
           <Link to="/Home">
           <Button variant="contained" onClick={signInWithGoogle}>Iniciar sesión con Google</Button>
           </Link>
         
        </div>
    );
};

export default Login;