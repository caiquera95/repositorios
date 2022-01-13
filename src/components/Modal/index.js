
import './modal.css';

import { FiX } from 'react-icons/fi';


export default function Modal({conteudo, close}){
  return(
    <div className="modal">
      <div className="containerM">
        <button className="close" onClick={ close }>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>

        <div>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <a>{conteudo.cliente}</a>
            </span>
          </div>

          
            <span>
              Nome Peça: <a>{conteudo.nomePeca}</a>
            </span>
            <span>
              Quantidade: <a>{conteudo.quantidade}</a>
            </span>
            <div className="row">
            <span>
              Cadastrado em: <a>{conteudo.createdFormated}</a>
            </span>
          </div>

          <div className="row">
            <span>
              Status:  <span className="badge" style={{ backgroundColor: 
                                            conteudo.status === 'Aberto' ? '#F6a921' : '#5cb85c' 
                                            }}>{conteudo.status}</span>
            </span>
          </div>

          {conteudo.complemento !== '' && (
            <>
              <span>Complemento</span>
              <p>
                {conteudo.complemento}
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}