import React from 'react';
import {useRouteMatch} from 'react-router-dom';

interface RouteParam{
    repositorio: string;
}
const Detalhes:React.FC = () => {
    const {params} =  useRouteMatch<RouteParam>();

    return <h1>Detalhe: {params.repositorio}</h1>
};

export default Detalhes;
