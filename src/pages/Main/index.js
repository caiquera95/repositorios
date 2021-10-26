import {React, useState, useCallback, useEffect }from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';
import {FaGithub, FaPlus, FaBars} from 'react-icons/fa';
import {ImSpinner} from 'react-icons/im';
import {MdDelete} from 'react-icons/md';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

export default function Main(){
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState (null);

    //Bsucando
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');
        if (repoStorage){
            setRepositorios(JSON.parse(repoStorage))
        }

    }, [])


    //Salvando Alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

       async function submit(){
        setLoading(true);
        setAlert(null);
        try {
            if(newRepo === ''){
                toast.error('Nenhum repositório foi adicionado');
                throw new Error('Você precisa indicar um repositório');
            } 

            const response = await api.get(`repos/${newRepo}`);

            const hasRepo = repositorios.find(repo => repo.name === newRepo);
            if(hasRepo){
                toast.error('Repositório Duplicado');
                throw new Error('Repositório Duplicado')
            }

            const data = {
                name: response.data.full_name,
        }
        setRepositorios ([...repositorios, data]);
        setNewRepo('');

       } catch (error){
           setAlert(true)
           console.log(error);
       } finally{
            setLoading(false);
           }
       }

       submit();

    }, [newRepo, repositorios]);
        
    function handleInputChange(e) {
        setNewRepo(e.target.value);
        setAlert(null);
        }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios])



    return ( 
        <Container>
           <h1> <FaGithub size={25}/> Meus Repositórios</h1>

           <Form onSubmit={handleSubmit} error={alert}>
               <input 
               placeholder="Adicionar Repositorios" 
               type="text" 
               value={newRepo}
               onChange={handleInputChange}
               />

               <SubmitButton loading={loading ? 1 : 0}>
                   {loading ? (
                       <ImSpinner color="#fff" size={15} />
                   ) : (
                       <FaPlus color="#fff" size={15}/>
                   )
                   }
               </SubmitButton>
               
           </Form>


           <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>

                         
                      <span>
                          <DeleteButton onClick={() =>handleDelete(repo.name)}>
                            <MdDelete size={18}/>
                          </DeleteButton>
                          {repo.name}
                      </span> 
                      <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                          <FaBars size={14}/>
                      </Link> 
                    </li>
                ))}
           </List>

        </Container>
    )
}