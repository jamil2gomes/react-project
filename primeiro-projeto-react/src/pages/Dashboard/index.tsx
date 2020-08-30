import React from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Titulo, Form, Repositorios} from './styles';

import icon from '../../assets/icon.svg';

const Dashboard:React.FC = () => {
    return (
        <>
         <img src={icon} alt="Logo github"/>
         <Titulo>Explore repositórios no Github</Titulo>
         <Form>
             <input placeholder="Digite aqui o nome do repositório"/>
             <button type="submit">Pesquisar</button>
         </Form>

         <Repositorios>
             <a href="teste">
                <img src="https://avatars0.githubusercontent.com/u/24705347?s=460&u=1bc7052e7b1501bb6e4c34cbf82807adf89fc1b3&v=4"
                alt="Jamil Gomes"
                />

                <div>
                    <strong>jamil2gomes/springBootAlgaWorks</strong>
                    <p>Descrição aqui</p>
                </div>

                <FiChevronRight size={20}/>
             </a>
         </Repositorios>
        </>
    );
};

export default Dashboard;
