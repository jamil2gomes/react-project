import React,{useEffect, useState} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {Header, RepositorioInfo, Issues} from './styles';
import api from '../../services/api';

import icon from '../../assets/icon.svg';

interface RouteParam{
    repositorio: string;
}

interface Repository{
    full_name: string;
    description: string;
    stargazers_count: number,
    forks_count: number,
    open_issues_count:number,
    owner:{
        login: string;
        avatar_url: string;
    };
}

interface Issue{
    title: string;
    id: number,
    html_url:string,
    user:{
        login: string;
    };
}
const Detalhes:React.FC = () => {
    const {params} =  useRouteMatch<RouteParam>();
    const [repo, setRepo] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(()=>{

     api.get(`/repos/${params.repositorio}`).then((response)=>{
        setRepo(response.data);
     })
     api.get(`/repos/${params.repositorio}/issues`).then((response)=>{
        setIssues(response.data);
     })
       
    },[params.repositorio]);

    return (
        <>
            <Header>
                <img src={icon} alt="Logo github"/>
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                    </Link>
            </Header>

            <RepositorioInfo>
                <header>
                    <img src={repo?.owner.avatar_url} alt={repo?.owner.login}/>
                    <div>
                        <strong>{repo?.full_name}</strong>
                        <p>{repo?.description}</p>
                    </div>
                </header>
                <ul>
                   <li>
                       <strong>{repo?.stargazers_count}</strong>
                       <span>Starts</span>
                   </li> 
                   <li>
                       <strong>{repo?.forks_count}</strong>
                       <span>Forks</span>
                   </li> 
                   <li>
                       <strong>{repo?.open_issues_count}</strong>
                       <span>Issues abertas</span>
                   </li> 
                </ul>
            </RepositorioInfo>

            <Issues>
              { issues.map(issue => (
                    <a key={issue.id} href={issue.html_url} target="_blank">
                        <div>
                            <strong>{issue.html_url}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={20}/>
                  </a>
                  ))}
            </Issues>
        </>

    );
};

export default Detalhes;
