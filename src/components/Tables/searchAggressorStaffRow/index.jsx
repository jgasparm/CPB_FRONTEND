import React from 'react';

const SearchAggressorStaffRow = ({ name, lastname, position }) => {

    return (
        <li className="item-direction item-container-direction .item-container-row" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Nombres">{name}</div>
            <div className="attribute-direction " data-name="Apellidos">{lastname}</div>
            <div className="attribute-direction" data-name="Puesto">{position}</div>
            <div className="attribute-direction" data-name="Acciones">
                {/* <More>
                    <FaEye onClick={handleDetailDirection} />
                    <FaEdit onClick={handleEditDirection} />
                </More> */}
                nada
            </div>
        </li>
    )
}

export default SearchAggressorStaffRow;