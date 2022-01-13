import { useState, useEffect, useContext } from 'react';

import firebase from '../../services/firebaseConnection';
import { useHistory, useParams} from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

import './new.css';

export default function New(){
  const {id}  = useParams();
  const history = useHistory();
  
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [nomePeca, setNomePeca] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  const { user } = useContext(AuthContext);


  useEffect(()=> {
    async function loadCustomers(){
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeCliente: doc.data().nomeCliente
          })
        })

        if(lista.length === 0){
          console.log('NENHUMA EMPRESA ENCONTRADA');
          setCustomers([ { id: '1', nomeCliente: 'FREELA' } ]);
          setLoadCustomers(false);
          return;
        }

        setCustomers(lista);
        setLoadCustomers(false);

        if(id){
          loadId(lista);
        }

      })
      .catch((error)=>{
        console.log('DEU ALGUM ERRO!', error);
        setLoadCustomers(false);
        setCustomers([ { id: '1', nomeCliente: '' } ]);
      })

    }

    loadCustomers();

  }, []);

  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot) => {
      setNomePeca(snapshot.data().nomePeca);
      setQuantidade(snapshot.data().quantidade);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);
    })
  }


  async function handleRegister(e){
    e.preventDefault();

    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nomeCliente,
      clienteId: customers[customerSelected].id,
      nomePeca: nomePeca,
      quantidade: quantidade,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then(()=> {
      toast.success('Chamado criado com sucesso!');
      setComplemento('');
      setCustomerSelected(0);
      setNomePeca('');
      setQuantidade('');
      setComplemento('');

    })
    .catch((err)=> {
      toast.error('Ops erro ao registrar, tente mais tarde.')
      console.log(err);
    })


  }



  //Chamado quando troca o status
  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  //Chamado quando troca de cliente
  function handleChangeCustomers(e){
    //console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
    //console.log('Cliente selecionado ', customers[e.target.value])
    setCustomerSelected(e.target.value);
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Novo Pedido">
        </Title>

        <div className="container">

          <form className="form-profile newOrder"  onSubmit={handleRegister} >
            <div className="center">
            <label className='labels'>Cliente</label>
            {loadCustomers ? (
              <input type="text" disabled={true} value="Carregando clientes..." />
            ) : (
              // <div className='cliente'>
                <select value={customerSelected} onChange={handleChangeCustomers} >
                {customers.map((item, index) => {
                  return(
                    <option key={item.id} value={index} >
                      {item.nomeCliente}
                    </option>
                  )
                })}
              </select>
            // </div>
            )}

          <label className='labels'>Nome Peça</label>
            <input
              type="text"
              placeholder="Ex: TBL"
              value={nomePeca}
              onChange={ (e) => setNomePeca(e.target.value) }
            />

            <label className='labels'>Quantidade</label>
            <input type="number" 
            placeholder='Ex: 10'
            maxLength={ 2 } 
            value={quantidade}
            onChange={ (e) => setQuantidade(e.target.value) }
            />

            <div className="statusNew">
            <label >Status</label> 
              <input 
              type="radio"
              name="radio"
              value="Aberto"
              onChange={handleOptionChange}
              checked={ status === 'Aberto' }
              />
              <span>Em Aberto</span>

            </div>

            <label className='labels'>Complemento</label>
            <textarea className="textarea"
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complemento}
              onChange={ (e) => setComplemento(e.target.value) }
            />
            
            <button type="submit">Registrar</button>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}