import React from 'react';
import {FaEye, FaTrashAlt} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';
const BitacoraAttackendRow = ({id, name, lastname, level, grade, setAvailable}) => {

    const dispacth = useDispatch();
    const bitacoraAttackendPersonCurrent = useSelector(state => state.attackendPerson?.currentBitacoraAttackendPersons);
    console.log(bitacoraAttackendPersonCurrent);
    const deleteBitacoraAttackendPersonCurrent = bitacoraAttackendPersonCurrent?.filter((person) => person.alum_id != id);

    const handleDeleteAttackend = () => {
        dispacth(setCurrentBitacoraAttackendPersons(deleteBitacoraAttackendPersonCurrent))
        setAvailable(false)
    }

    return (
        <li className="item-direction item-container-direction" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Nombres">{name}</div>
            <div className="attribute-direction" data-name="Apellidos">{lastname}</div>
            <div className="attribute-direction" data-name="Nivel">{level}</div>
            <div className="attribute-direction" data-name="Grado">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ grade} 
            </div>
            <div className="attribute-direction" data-name="">
                {/* <More>
                    <FaEye onClick={handleDetailDirection} />
                    <FaEdit onClick={handleEditDirection} />
                </More> */}
                <FaTrashAlt role="button" onClick={handleDeleteAttackend}/>
            </div>
        </li>
    )
}

export default BitacoraAttackendRow;