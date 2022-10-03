import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from '../../app/features/aggressorPerson/agrressorPerson';
import { setAllAttackendPersons, setAllCpbBitacoraAttackendPersons, setAllIncidencesBitacoraAttackendPersons, setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../app/features/attackendPerson/attackendPerson';
import { setAllQueryPotentialBullying } from '../../app/features/queriesPotentialBullying/queriesPotentialBullying';
import { setAllQueryIncidences } from '../../app/features/queryIncidence/queriesIncidence';

const Menu = () => {

    const dispatch = useDispatch();

    const handleClearDatasBitacora = async ()  => {
        dispatch(setAllAgrressorPersons(null));
        dispatch(setAllAttackendPersons(null));
        dispatch(setCurrentBitacoraAttackendPersons(null));
        dispatch(setCurrentAttackendPersons(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null));        
        dispatch(setAllCpbBitacoraAttackendPersons(null));
        dispatch(setCurrentAgrressorPersons(null));
    }

    const handleClearDatasBitacoraAggressor = () => {
        dispatch(setCurrentAgrressorPersons(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null))
        dispatch(setAllAgrressorPersons(null));
        console.log("DALETE DATA");
    }

    const handleClearIncidences = () => {
        dispatch(setAllQueryIncidences(null));
        dispatch(setAllAgrressorPersons(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null))
    }
    const handleClearPotentialBullying = () => {
        dispatch(setAllQueryPotentialBullying(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null))
        dispatch(setCurrentAgrressorPersons(null));
    }
    const handleClearDataRegistroIncidencia = () => {
        dispatch(setAllAgrressorPersons(null));
        dispatch(setAllAgrressorPersons(null));
        dispatch(setCurrentAgrressorPersons(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null))
        console.log("DALETE DATA");
    }

    return (
        <aside className='menu-left'>
            <div className='menu-left-content'>
                <ul className='menu-left-list px-1'>
                    <li className='menu-left-link'>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className='menu-left-link accordion' id='accordionMante'>
                        <Link to="/variables">Mantenimiento</Link>
                    </li>
                    <li className='menu-left-link'>
                        <Link to="/registro" onClick={handleClearDataRegistroIncidencia}>Registro de Incidencias</Link>
                    </li>
                    <li className="menu-left-link accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Consultas
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div className="accordion-link">
                                        <Link to="/consultas-bitacora" onClick={handleClearDatasBitacora}>Bitacora Agredido</Link>
                                    </div>
                                    <div className="accordion-link">
                                        <Link to="/consultas-bitacora-aggressor" onClick={handleClearDatasBitacoraAggressor}>Bitacora Agresor</Link>
                                    </div>
                                    <div className="accordion-link">
                                        <Link to="/consultas" onClick={handleClearIncidences} >Incidencias</Link>
                                    </div>
                                    <div className="accordion-link">
                                        <Link to="/consultas-casos-bullying" onClick={handleClearPotentialBullying}>Casos Bullying</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div><hr /></div>
                </ul>
            </div>
        </aside>
    )
}

export default Menu;