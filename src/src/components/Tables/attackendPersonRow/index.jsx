import React from 'react';
import {FaTrashAlt} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';

const AttackendPersonRow = ({id, name, lastname, level, grade,setAvailable}) => {

    const dispacth = useDispatch();
    const attackendPersonCurrent = useSelector(state => state.attackendPerson?.currentAttackendPersons);
    console.log(attackendPersonCurrent);
    const newAttackendPersonCurrent = attackendPersonCurrent?.filter((person) => person.alum_id != id);

    const handleDeleteAttackend = () => {
        dispacth(setCurrentAttackendPersons(newAttackendPersonCurrent))
        setAvailable(false);
    }
    return (
        <li className="item-direction item-container-direction .item-container-row" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Nombres">{name}</div>
            <div className="attribute-direction " data-name="Apellidos">{lastname}</div>
            <div className="attribute-direction" data-name="Nivel">{level}</div>
            <div className="attribute-direction" data-name="Grado">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ grade} 
            </div>
            <div className="attribute-direction" data-name="Acciones">
                {/* <More>
                    <FaEye onClick={handleDetailDirection} />
                    <FaEdit onClick={handleEditDirection} />
                </More> */}
                <FaTrashAlt role="button" onClick={handleDeleteAttackend}/>
            </div>
        </li>
    )
};

export default AttackendPersonRow;