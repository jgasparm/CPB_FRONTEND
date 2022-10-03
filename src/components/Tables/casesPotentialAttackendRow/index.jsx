import React from 'react';
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

const CasesPotentialAttackendRow = ({dateHora, reason}) => {

    const dispatch = useDispatch();

    return (
        <li className="item-direction item-container-direction" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Fecha y hora">{dateHora}</div>
            <div className="attribute-direction" data-name="Motivo">{reason}</div>
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

export default CasesPotentialAttackendRow;