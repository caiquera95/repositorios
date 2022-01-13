import { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';
import './signup.css';

import logo from '../../assets/logo.png';

export default function SignIn(){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    if(nome !== '' && email !== '' && senha !== ''){
      signUp(nome, email, senha)
    }
  }

  return(
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src ={logo} alt="Sistema Logo"/>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="titulos">
            <h3>Cadastre-se</h3>
            <p className="rapid">É rápido e fácil.</p>
          </div>
          
          <input type="text" placeholder="Nome" value={nome} 
          onChange={(e) => setNome(e.target.value)}
          />
          <input type="text" placeholder="email@email.com" value={email} 
          onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="********" value={senha}
          onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" class="button"><span>{loadingAuth ? 'Carregando' : 'Cadastrar' }</span></button>

        </form>

        <Link to="/">Já tem uma conta? Entre</Link>


      </div>
    </div>
  )
}

