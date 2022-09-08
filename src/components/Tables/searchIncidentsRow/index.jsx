import React from 'react';

const SeacrhInicidentsRow = ({name, lastname, level, grade, typeIncident, subTypeIncident}) => {
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
                    <FaEye onClick={handleDetailincidents} />
                    <FaEdit onClick={handleEditincidents} />
                </More> */}
                nada
            </div>
        </li>
    )
}

export default SeacrhInicidentsRow;