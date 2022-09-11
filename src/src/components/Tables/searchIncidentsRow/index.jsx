import axios from 'axios';
import React from 'react';
import {FaEye} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAlumnoQueryIncidences, setCurrentQueryIncidences } from '../../../app/features/queryIncidence/queriesIncidence';

const SeacrhInicidentsRow = ({id, name, lastname, level, grade, typeIncident, subTypeIncident}) => {
    const dispacth = useDispatch();
    const incidence = useSelector(state => state.queryIncidence?.allQueryIncidences)?.find(
        (incidence) => incidence.inci_id === id);

    const handleDetailincidents = async () => {
        // dispacth(id);
        dispacth(setCurrentQueryIncidences([incidence]));
        await handleSearchAlumno(incidence);
    }
    const handleSearchAlumno = async (data) => {
        const params = "ac_alum_turno=" + "" + "&ac_alum_nivel=" + " " + "&ac_alum_grado=" + " " +
            "&ac_alum_seccion=" + " " + "&av_alum_apellidos=" + " " + "&av_alum_nombres=" + " ";

        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaBuscarAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            let alumnos = res.data;
            alumnos?.forEach(alu => {
                if(alu?.alum_id === data?.alum_id){
                    dispacth(setCurrentAlumnoQueryIncidences(alu))
                }
            });
        });

    };

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