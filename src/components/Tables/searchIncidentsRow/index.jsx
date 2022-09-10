import React from 'react';
import {FaEye} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQueryIncidences } from '../../../app/features/queryIncidence/queriesIncidence';

const SeacrhInicidentsRow = ({id, name, lastname, level, grade, typeIncident, subTypeIncident}) => {
    const dispacth = useDispatch();
    const indidence = useSelector(state => state.queryIncidence?.allQueryIncidences)?.find(
        (incidence) => incidence.inci_id === id);
    const handleDetailincidents = () => {
        // dispacth(id);
        dispacth(setCurrentQueryIncidences(indidence));
    }

    return (
        <li className="item-incidents item-container-incidents .item-container-row" >
            <div style={{ cursor: "pointer" }} className="attribute-incidents" data-name="Nombres">{name}</div>
            <div className="attribute-incidents " data-name="Apellidos">{lastname}</div>
            <div className="attribute-incidents" data-name="Nivel">{level}</div>
            <div className="attribute-incidents" data-name="Grado">{grade}</div>
            <div className="attribute-incidents" data-name="Tipo de incidencia">{typeIncident}</div>
            <div className="attribute-incidents" data-name="Subtipo de incidencia">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ subTypeIncident} 
            </div>
            <div className="attribute-incidents" data-name="Acciones">
                {/* <More>
                    
                    <FaEdit onClick={handleEditincidents} />
                </More> */}
                <FaEye role="button" onClick={handleDetailincidents} />
            </div>
        </li>
    )
}

export default SeacrhInicidentsRow;