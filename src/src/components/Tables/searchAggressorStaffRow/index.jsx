import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';

const SearchAggressorStaffRow = ({id, name, lastname, position, setSendAggressorPersonPerson }) => {

    const dispacth = useDispatch();
    const idAgrressorPerson = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons
        )?.find((person) => person?.peie_id === id);
    
    const handleResaltSelected = () => {
        setSendAggressorPersonPerson(agrressorPerson)
        // dispacth(setCurrentAgrressorPersons([agrressorPerson]));
        // if (idAgrressorPerson == null || idAgrressorPerson.length < 1) {
        //     dispacth(setCurrentAgrressorPersons([agrressorPerson]));
        // }else{
        //     idAgrressorPerson.push(agrressorPerson);
        //     dispacth(setCurrentAgrressorPersons(idAgrressorPerson));
        // }
        // else if (idAgrressorPerson.length < 3){
        //     idAgrressorPerson.push(agrressorPerson);
        //     dispacth(setCurrentAgrressorPersons(idAgrressorPerson));
        // }else if (idAgrressorPerson.length == 3) {
        //     console.log("YA ESCOGIO TRES AGRESORES");
        // }
    }

    return (
        <li className="item-direction item-container-direction .item-container-row" 
            style={{backgroundColor: idAgrressorPerson?.peie_id === id ? "rgb(200, 227, 252)" : "transparent" }}
            onClick={handleResaltSelected}
        >
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