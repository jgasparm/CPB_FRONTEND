import axios from 'axios';
import React from 'react';
import {FaEye} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAlumnoQueryIncidences, setCurrentQueryIncidences } from '../../../app/features/queryIncidence/queriesIncidence';

const SearchPotentialBullyingRow = ({id, name, lastname, date, reason, action, results}) => {
    const dispatch = useDispatch();

    const incidence = useSelector(state => state.queryPotentialBullying?.allQueryPotentialBullying)?.find(
        (incidence) => incidence.alum_id === id);

    const handleDetailincidents = async () => {
        // dispatch(id);
        // dispatch(setCurrentQueryIncidences([incidence]));
        // await handleSearchAlumno(incidence);
    }
    // FUNCION QUE ME TRAE 
    const handleSearchAlumno = async (data) => {
        const params = "ac_alum_turno=" + "0" + "&ac_alum_nivel=" + "0" + "&ac_alum_grado=" + "0" +
            "&ac_alum_seccion=" + "0" + "&av_alum_apellidos=" + "0" + "&av_alum_nombres=" + "0";

        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaBuscarAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            let alumnos = res.data;
            alumnos?.forEach(alu => {
                if(alu?.alum_id === data?.alum_id){
                    dispatch(setCurrentAlumnoQueryIncidences(alu))
                }
            });
        });

    };

    return (
        <li className="item-incidents item-container-incidents .item-container-row" >
            <div style={{ cursor: "pointer" }} className="attribute-incidents" data-name="Nombres">{name}</div>
            <div className="attribute-incidents " data-name="Apellidos">{lastname}</div>
            <div className="attribute-incidents" data-name="Fecha y Hora">{date}</div>
            <div className="attribute-incidents" data-name="Motivo">{reason}</div>
            <div className="attribute-incidents" data-name="Acción realizada">{action}</div>
            <div className="attribute-incidents" data-name="Resultados Esperados">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ results} 
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

export default SearchPotentialBullyingRow;