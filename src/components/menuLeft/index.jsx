import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    return(
        <aside className='menu-left'>
            <div className='menu-left-content'>
                <ul className='menu-left-list px-1'>
                    <li className='menu-left-link'>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/variables">Mantenimiento</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/registro">Registro de Incidencias</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/consultas">Consultas</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/consultas-bitacora">Consultas Bitacora</Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Menu;