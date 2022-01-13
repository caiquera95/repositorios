import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import './dashboard.css';
import {FaPlus} from 'react-icons/fa';
import { FiSearch, FiEdit2 } from 'react-icons/fi';
import {Link } from 'react-router-dom';
import Modal from '../../components/Modal';

import { format } from 'date-fns';
import Header from '../../components/Header';
import Title from '../../components/Title';

import firebase from '../../services/firebaseConnection';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){
    const { signOut, user  } = useContext(AuthContext);
    const [chamados, setChamados] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    

    useEffect(()=> {

        async function loadChamados(){
          await listRef.limit(3)
          .get()
          .then((snapshot) => {
            updateState(snapshot)
          })
          .catch((err)=>{
            console.log('Deu algum erro: ', err);
            setLoadingMore(false);
          })
          setLoading(false);
        }
    
        loadChamados();
    
        return () => {
    
        }
      }, []);


      async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;
    
        if(!isCollectionEmpty){
          let lista = [];
    
          snapshot.forEach((doc)=>{
            lista.push({
              id: doc.id,
              cliente: doc.data().cliente,
              clienteId: doc.data().clienteId,
              created: doc.data().created,
              createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
              status: doc.data().status,
              nomePeca: doc.data().nomePeca,
              quantidade: doc.data().quantidade,
              complemento: doc.data().complemento
            })
          })
    
          const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado
          
          setChamados(chamados => [...chamados, ...lista]);
          setLastDocs(lastDoc);
    
        }else{
          setIsEmpty(true);
        }
        setLoadingMore(false);
      }
    
    
      async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot)=>{
          updateState(snapshot)
        })
      }
    
    
      function togglePostModal(item){
        setShowPostModal(!showPostModal) //trocando de true pra false
        console.log(item);
        setDetail(item);
      }

      if(loading){
        return(
          <div>
            <Header/>
    
            <div className="content">
             
              <Title name="Dashboard"> 
              </Title>  
    
              <div className="container dashboard">
                <span>Buscando chamados...</span>
              </div>
    
            </div>      
          </div>
        )
      }


    return(
        <div>
            <Header />

                {chamados.length === 0 ? (

                    <>  
                    <div className="content"> 
                        <div className="content-Dashboard">
                       
                            <Title name="Dashboard" />
                            
                                
                        </div>

                        <div className="container dashboard">
                            <span>Nenhum pedido registrado... </span>
                                <Link to="/new" className="new">
                                    <FaPlus />
                                    Novo Pedido
                                </Link>
                        </div>
                    </div>
                    
                    </>
                       
                ) : (
                    <>

                            <div className="content"> 
                                <div className="content-Dashboard">
                                    <Title name="Dashboard"></Title>
                                        <Link to="/new" className="new2">
                                            <FaPlus />
                                            Pedido
                                        </Link>
                                </div>

                            <table>
                                <thead>
                                    <tr>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">Nome Peça</th>
                                    <th scope="col">Quantidade</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {chamados.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                        <td data-label="Cliente">{item.cliente}</td>
                                        <td data-label="Nome Peça">{item.nomePeca}</td>
                                        <td data-label="QTD">{item.quantidade} PÇS</td>
                                        <td data-label="Status">
                                          <span className="badge" style={{ backgroundColor: 
                                            item.status === 'Aberto' ? '#F6a921' : '#5cb85c' 
                                            }}>{item.status}</span>
                                        </td>
                                        <td data-label="Cadastrado">{item.createdFormated}</td>
                                        <td data-label="#">
                                          <button className="action" style={{backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(item) }>
                                            <FiSearch color="#FFF"  />
                                          </button>
                                          <button className="action" style={{backgroundColor: '#F6a935' }}  >
                                            <Link to={`/edit/${item.id}`}>
                                            <FiEdit2 color="#FFF"  />
                                            </Link>
                                          </button>
                                         
                                        </td>
                                      </tr>
                                    )
                                    })}
                                </tbody>
                            </table>
                            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
                            { !loadingMore && !isEmpty && 
                            <button className="btn-more" onClick={handleMore}><FaPlus /><span>Buscar mais</span></button> 
                            }
                            

                            </div>
                           
                    </>
                )}

                {showPostModal && (
                    <Modal
                    conteudo={detail}
                    close={togglePostModal}
                    />
                )}

            <button className="btn-logout" onClick={() => signOut()}>Sair</button>
        </div>
    )
}


