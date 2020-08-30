import React, {useState, FormEvent} from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Titulo, Form, Repositorios} from './styles';
import api from '../../services/api';

import icon from '../../assets/icon.svg';

interface Repository{
    full_name: string;
    description: string;
    owner:{
        login: string;
        avatar_url: string;
    };
}

const Dashboard:React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState<Repository[]>([]);

    async function handlerAddRepositorio(event:FormEvent<HTMLFormElement>):Promise<void>{
        event.preventDefault();

        const response = await api.get<Repository>(`/repos/${newRepo}`);

        const repositorio = response.data;

        setRepositorios([...repositorios, repositorio]);
        setNewRepo('');
    }

    return (
        <>
         <img src={icon} alt="Logo github"/>

         <Titulo>Explore repositórios no Github</Titulo>

         <Form onSubmit={handlerAddRepositorio}>
             <input
             value = {newRepo}
             onChange ={e => setNewRepo(e.target.value)}
             placeholder = "Digite aqui o nome do repositório"
             />
             <button type="submit">Pesquisar</button>
         </Form>

         <Repositorios>
             {
                 repositorios.map(
                     repo => (
                        <a key={repo.full_name} href="teste">
                        <img src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        />

                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description ===''?'Sem descrição' : repo.description}</p>
                        </div>

                        <FiChevronRight size={20}/>
                     </a>
                     ))}
         </Repositorios>

        </>
    );
};

export default Dashboard;
