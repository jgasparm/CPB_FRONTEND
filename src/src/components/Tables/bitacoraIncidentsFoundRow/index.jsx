import React from 'react'

const BitacoraIncidentsFoundRow = ({typeIncident, subTypeIncident, reason, date}) => {

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
                nada
            </div>
        </li>
    )
}

export default BitacoraIncidentsFoundRow;