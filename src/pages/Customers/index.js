import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import firebase from '../../services/firebaseConnection';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import InputMask from 'react-input-mask';

import './customers.css';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

export default function Customers(){
    const { signOut } = useContext(AuthContext);
    const [nomeCliente, setNomeCliente] = useState ('');
    const [telefone, setTelefone] = useState ('');
    const [endereco, setEndereco] = useState ('');


    const [cpfCnpj, setCpfCnpj] = useState("");
    const [mask, setMask] = useState("");



    async function handleAdd(e){
             e.preventDefault();
             if (nomeCliente !== '' && cpfCnpj !== '' & telefone !== '' && endereco !== ''){
              await firebase.firestore().collection('customers')
              .add({
                nomeCliente: nomeCliente,
                cpfCnpj: cpfCnpj,
                telefone: telefone,
                endereco: endereco
              })
              .then(()=>{
                setNomeCliente('');
                setCpfCnpj('');
                setTelefone('');
                setEndereco('');
                toast.success('Empresa Cadastrada!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              })
              .catch((error)=>{
                console.log(error);
                toast.error('Erro ao cadastrar!');
              })
            }else{
              toast.error('Preencha todos os campos!', {
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
    <div>
      <Header/>

    <div className="content">
      <Title name="Clientes"/ >

      <div className="container">
        <form className="form-profile customers" onSubmit={handleAdd}>
          <div className="center">
          
                            <label className='labels'>Nome</label>
                            <input type="text" value={nomeCliente} 
                            placeholder="Nome da Empresa"
                            onChange={(e) => setNomeCliente(e.target.value)}/>

                            <label className='labels'> CPF/CNPJ</label>
                            <CpfCnpj
                                    value={cpfCnpj}
                                    placeholder="CPF/CNPJ da Empresa"
                                    onChange={(e, type) => {
                                    setCpfCnpj(e    .target.value);
                                    setMask(type === "CPF");
                                    }}
                                />
                            
                            <label className='labels'>Telefone</label>
                            <InputMask type="tel" name="telefone" id="telefone" 
                            placeholder="(99) 99999-9999" mask="(99) 99999-9999"  value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                             />

                            <label className='labels'>Endereço</label>
                            <input type="text" value={endereco} 
                            placeholder="Endereço da Empresa"
                            onChange={(e) => setEndereco(e.target.value)}/> 

                        
                        <button type="submit">Cadastrar</button>
          </div>

        </form>
      </div>

    </div>

    </div>
  )
}