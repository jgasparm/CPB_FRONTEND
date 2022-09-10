import React from 'react';
import {FaTrashAlt} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';

const AggressorPersonRow = ({id, name, lastname, level, grade}) => {

    const dispacth = useDispatch();
    const agrressorPersonCurrent = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    console.log(agrressorPersonCurrent);
    const newAgrressorPersonCurrent = agrressorPersonCurrent?.filter((person) => {
        if (person?.peie_id &&  person?.peie_id !== id) {
            return person
        }else if(person?.alum_id && person?.alum_id !== id){
            return person
        }
        // return  person?.peie_id != id || person?.alum_id != id 
    });
    const handleDeleteAgrressor = () => {
        console.log(newAgrressorPersonCurrent);
        dispacth(setCurrentAgrressorPersons(newAgrressorPersonCurrent))
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
                <FaTrashAlt role="button" onClick={handleDeleteAgrressor}/>
            </div>
        </li>
    )
};

export default AggressorPersonRow;