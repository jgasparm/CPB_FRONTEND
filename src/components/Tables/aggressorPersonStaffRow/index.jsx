import React from 'react';
import {FaTrashAlt} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
import { setAllIncidencesBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';

const AggressorPersonStaffRow = ({id, name, lastname, tipoPersonal, setAvailable, bitacoraAggressor = false, details = false}) => {

    const dispacth = useDispatch();
    const agrressorPersonCurrent = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    // console.log(agrressorPersonCurrent);
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
        if(bitacoraAggressor){
            setAvailable(false);
            dispacth(setAllIncidencesBitacoraAttackendPersons(null));
        }
    }

    return (
        <li className="item-direction item-container-direction" >
            <div style={{ cursor: "pointer" }} className="attribute-direction" data-name="Nombres">{name}</div>
            <div className="attribute-direction" data-name="Apellidos">{lastname}</div>
            <div className="attribute-direction" data-name="Puesto">
                {/* {state == "A" ? (
                    <Active>{"Activo"}</Active>
                ) : (
                    <Inactive>{"Inactivo"}</Inactive>
                )} */ tipoPersonal} 
            </div>
            {!details && (
                <div className="attribute-direction" data-name="">
                    {/* <More>
                        <FaEye onClick={handleDetailDirection} />
                        <FaEdit onClick={handleEditDirection} />
                    </More> */}
                        <FaTrashAlt role="button" onClick={handleDeleteAgrressor}/>
                </div>
            )}
        </li>
    )
};

export default AggressorPersonStaffRow;