import { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';
import './signin.css';
import { toast } from 'react-toastify';


import logo from '../../assets/logo.png';

export default function SignIn(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signIn, loadingAuth} = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();
    if(email !== '' && senha !== ''){
      signIn(email, senha)
    } else {
      toast.info('Preencha os campos!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  return(
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src ={logo} alt="Sistema Logo"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input type="text" placeholder="email@email.com" value={email} 
          onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="********" value={senha}
          onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" class="button"><span>{loadingAuth ? 'Carregando' : 'Acessar' }</span></button>
        </form>

        <Link to="/register">Criar nova conta</Link>


      </div>
    </div>
  )
}

