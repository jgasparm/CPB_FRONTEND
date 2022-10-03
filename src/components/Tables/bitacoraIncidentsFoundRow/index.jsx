import axios from 'axios';
import React from 'react'
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
import { setCurrentAlumnoQueryIncidences, setCurrentQueryIncidences } from '../../../app/features/queryIncidence/queriesIncidence';

const BitacoraIncidentsFoundRow = ({id, typeIncident, subTypeIncident, reason, date, setStateDetails}) => {

    const dispatch = useDispatch();
    // const incidence = useSelector(state => state.queryIncidence?.allQueryIncidences)?.find(
    //     (incidence) => incidence.inci_id === id);
    const incidence = useSelector(state => state.attackendPerson?.allIncidencesBitacoraAttackendPersons)?.find(
        (incidence) => incidence.inci_id === id);

    const handleDetailincidents = async () => {
        // dispatch(id);
        // console.log(incidence);
        dispatch(setCurrentQueryIncidences(incidence));
        await handleSearchAlumno(incidence);
        // MOSTRAR MODAL DETALLES DE INCIDENCIAS
        setStateDetails(true);
    }

    const handleSearchAlumno = async (data) => {
        const params = "ac_alum_turno=" + "0" + "&ac_alum_nivel=" + "0" + "&ac_alum_grado=" + "0" +
            "&ac_alum_seccion=" + "0" + "&av_alum_apellidos=" + "" + "&av_alum_nombres=" + "";

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
        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaIncidenciaAgresor.php?ai_inci_id="+data.inci_id,{
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            }, 
        }).then((res) => {
            dispatch(setAllAgrressorPersons(res.data));
        })

    };

    return (
        <li className="item-direction item-container-direction" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Tipo de incidencia">{typeIncident}</div>
            <div className="attribute-direction" data-name="SubT. de incidencia">{subTypeIncident}</div>
            <div className="attribute-direction" data-name="Motivo de incidencia">{reason}</div>
            <div className="attribute-direction" data-name="Fecha y hora">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ date} 
            </div>
            <div className="attribute-direction" data-name="">
                {/* <More>
                    <FaEye onClick={handleDetailDirection} />
                    <FaEdit onClick={handleEditDirection} />
                </More> */}
                 <FaEye role="button" onClick={handleDetailincidents} />
            </div>
        </li>
    )
}

export default BitacoraIncidentsFoundRow;