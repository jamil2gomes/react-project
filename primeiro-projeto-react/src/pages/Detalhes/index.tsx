import React from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {Header, RepositorioInfo, Issues} from './styles';

import icon from '../../assets/icon.svg';

interface RouteParam{
    repositorio: string;
}
const Detalhes:React.FC = () => {
    const {params} =  useRouteMatch<RouteParam>();

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
                    <img src="" alt="Foto de perfil do Github"/>
                    <div>
                        <strong>jamil2gomes/repo</strong>
                        <p>descricao</p>
                    </div>
                </header>
                <ul>
                   <li>
                       <strong>1080</strong>
                       <span>Starts</span>
                   </li> 
                   <li>
                       <strong>1080</strong>
                       <span>Forks</span>
                   </li> 
                   <li>
                       <strong>1080</strong>
                       <span>Forks</span>
                   </li> 
                </ul>
            </RepositorioInfo>

            <Issues>
                <Link to="jaja">
                    <div>
                        <strong>lalala</strong>
                        <p>lalala</p>
                    </div>
                    <FiChevronRight size={20}/>
                </Link>
            </Issues>
        </>

    );
};

export default Detalhes;
