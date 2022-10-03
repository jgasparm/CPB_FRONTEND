import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';

const SearchAgrressorRow = ({id, name, lastname, level, grade, setSendAggressorPersonPerson}) => {
    const dispatch = useDispatch();
    const idAgrressorPerson = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons
        )?.find((person) => person?.alum_id === id);

    const handleResaltSelected = () => {
        setSendAggressorPersonPerson(agrressorPerson);

    }
    return (
        <li className="item-direction item-container-direction .item-container-row"
            style={{backgroundColor: idAgrressorPerson?.alum_id === id ? "rgb(200, 227, 252)" : "transparent" }}
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
            {/* <div className="attribute-direction" data-name="Acciones">
                <More>
                    <FaEye onClick={handleDetailDirection} />
                    <FaEdit onClick={handleEditDirection} />
                </More>
                nada
            </div> */}
        </li>
    )
}

export default SearchAgrressorRow;