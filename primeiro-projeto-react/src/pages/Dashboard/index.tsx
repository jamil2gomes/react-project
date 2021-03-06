import React, {useState, FormEvent, useEffect} from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {Titulo, Form, Repositorios, Error} from './styles';
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

    const [newRepoInput, setnewRepoInput] = useState('');
    const [erros, setErros] = useState('');
    const [repositorios, setRepositorios] = useState<Repository[]>(
        ()=>{
        const repositoriosGuardados = localStorage.getItem('@GithubExplorer:repositorios');

        if(repositoriosGuardados)
            return JSON.parse(repositoriosGuardados);

        return [];
    });

    useEffect(() =>{
        localStorage.setItem('@GithubExplorer:repositorios', JSON.stringify(repositorios));
    }
    ,[repositorios]);

    async function handlerAddRepositorio(event:FormEvent<HTMLFormElement>):Promise<void>{
        event.preventDefault();

        if(!newRepoInput){
            setErros("Campo vazio! Digite no formato nome-usuario/nome-repositório");
            return;
        }

        try{
            const response = await api.get<Repository>(`/repos/${newRepoInput}`);

            const repositorio = response.data;

            setRepositorios([...repositorios, repositorio]);
            setnewRepoInput('');
            setErros('');
        }catch(err){
            setErros("Erro ao fazer a busca!");
        }
    }

    return (
        <>
         <img src={icon} alt="Logo github"/>

         <Titulo>Explore repositórios no Github</Titulo>

         <Form hasError={!!erros}
         onSubmit={handlerAddRepositorio}
         >
             <input
             value = {newRepoInput}
             onChange ={e => setnewRepoInput(e.target.value)}
             placeholder = "Digite aqui o nome do repositório"
             />
             <button type="submit">Pesquisar</button>
         </Form>

        {erros && <Error>{erros}</Error>}

         <Repositorios>
             {
                 repositorios.map(
                     repo => (
                        <Link key={repo.full_name} to={`/detalhe/${repo.full_name}`}>
                        <img src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        />

                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description ===''?'Sem descrição' : repo.description}</p>
                        </div>

                        <FiChevronRight size={20}/>
                     </Link>
                     ))}
         </Repositorios>

        </>
    );
};

export default Dashboard;
