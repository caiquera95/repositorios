import { useState, useEffect, useContext } from 'react';

import firebase from '../../services/firebaseConnection';
import { useHistory, useParams} from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

import './edit.css';

export default function Edit(){
  const {id}  = useParams();
  const history = useHistory();
  
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [idCustomer, setIdCustomer] = useState(false);

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

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      setCustomerSelected(index);
      setIdCustomer(true);
    })

    .catch((err) =>{
      console.log('Erro ID passado: ', err);
      setIdCustomer(false);
    })
  }


  async function handleRegister(e){
    e.preventDefault();

    if(idCustomer){
      await firebase.firestore().collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nomeCliente,
        clienteId: customers[customerSelected].id,
        nomePeca: nomePeca,
        quantidade: quantidade,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() =>{
        toast.success('Editado com Sucesso!');
        setCustomerSelected(0);
        setComplemento('');
        history.push('/dashboard');
      })
      .catch((err) =>{
        toast.error('Erro ao Editar');
        console.log(err);
      })
      return;
    }

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
        <Title name="Editar Pedido">
        </Title>

        <div className="container">

          <form className="form-profile"  onSubmit={handleRegister} >
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

            

            <label className='labels'>Status</label>
            <div className="status">
              <input 
              type="radio"
              name="radio"
              value="Aberto"
              onChange={handleOptionChange}
              checked={ status === 'Aberto' }
              />
              <span>Aberto</span>

              <input 
              type="radio"
              name="radio"
              value="Progresso"
              onChange={handleOptionChange}
              checked={ status === 'Progresso' }
              />
              <span>Progresso</span>

              <input 
              type="radio"
              name="radio"
              value="Atendido"
              onChange={handleOptionChange}
              checked={ status === 'Atendido' }
              />
              <span>Atendido</span>
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