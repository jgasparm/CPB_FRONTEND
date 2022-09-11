import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';

const SearchAttackendRow = ({id, name, lastname, level, grade, typeQuerie, setSendAttackendCurrent}) => {
    const dispacth = useDispatch();

    const idAttackendPerson = useSelector(state => state.attackendPerson?.currentAttackendPersons);
    const attackendPerson = useSelector(state => state.attackendPerson?.allAttackendPersons
        )?.find((person) => person?.alum_id === id) ;

    const handleResaltSelected = async () => {
        if(typeQuerie == 1){
            setSendAttackendCurrent(attackendPerson)
        }else if (typeQuerie == 2) {
            setSendAttackendCurrent(attackendPerson)
        }
    }
    return (
        <li className="item-direction item-container-direction .item-container-row"
            style={{backgroundColor: idAttackendPerson?.alum_id === id ? "rgb(200, 227, 252)" : "transparent" }}
            onClick={handleResaltSelected}
        >
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
                nada
            </div>
        </li>
    )
}

export default SearchAttackendRow;