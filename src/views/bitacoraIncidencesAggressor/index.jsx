import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from '../../app/features/aggressorPerson/agrressorPerson';
import { setAllAttackendPersons, setAllIncidencesBitacoraAttackendPersons } from '../../app/features/attackendPerson/attackendPerson';
import ModalAggressorPerson from '../../components/modals/modalAggressorPerson';
import ModalAggressorStaff from '../../components/modals/modalAggressorStaff';
import ModalDetailsIncidence from '../../components/modals/modalDetailsIncidence';
import AggressorPersonRow from '../../components/Tables/aggressorPersonRow';
import AggressorPersonStaffRow from '../../components/Tables/aggressorPersonStaffRow';
import BitacoraIncidentsFoundRow from '../../components/Tables/bitacoraIncidentsFoundRow';
import { Container, IncidenceFormContainer } from './style';

const BitacoraIncidentsAggressor = () => {
    
    const dispatch = useDispatch();

    const agrressorPersonCurrent = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    const incidenceAttackendPersonCurrent = useSelector(state => state.attackendPerson?.allIncidencesBitacoraAttackendPersons);

    const [modalAggressor, setmodalAggressor] = useState(false);
    const [modalAggressorStaff, setmodalAggressorStaff] = useState(false);

    // VARIABLE DE ESTADO PARA BOTÓN DE AGREGAR AGRESOR
    const [available, setAvailable] = useState(false);

    const [selectAgrressor, setSelectAgrressor] = useState(2);
    const [selectCheck, setSelectCheck] = useState(true);

    // MODAL DETALLES DE INCIDENCIAS
    const [stateDetails, setStateDetails] = useState(false);
    // ENVIO DE TIPO DE BITACORA AL MODALES DE AGRESORES
    const bitacoraAggressor= 2;

    const handleModalAgrressor = (e) => {
        e.preventDefault();
        if (selectAgrressor == 1) {       
            dispatch(setAllAgrressorPersons(null));
            setmodalAggressorStaff(true)
        } else if (selectAgrressor == 2) {
            dispatch(setAllAttackendPersons(null));
            dispatch(setAllAgrressorPersons(null));
            setmodalAggressor(true)
        }
    };

    const handleSelectModal = (payload) => {
        setSelectAgrressor(payload)
        setAvailable(false)
        setSelectCheck(!selectCheck)
        
        dispatch(setCurrentAgrressorPersons(null));
        dispatch(setAllIncidencesBitacoraAttackendPersons(null));
    }

    return (
        <>
            <ModalDetailsIncidence stateDetails={stateDetails} setStatelDetails={setStateDetails} />
            <ModalAggressorPerson
                modalAggressor={modalAggressor}
                setmodalAggressor={setmodalAggressor} typeBitacora={bitacoraAggressor} setAvailable={setAvailable}
            />
            <ModalAggressorStaff
                modalAggressorStaff={modalAggressorStaff}
                setModalAggressorStaff={setmodalAggressorStaff} typeBitacora={bitacoraAggressor} setAvailable={setAvailable}
            />
            <Container>
                <h5 className="text-center mb-4">Bitácora de incidencias del presunto agresor</h5>
                <IncidenceFormContainer>
                    <div>
                        <div className="d-flex flex-wrap gap-3">
                            <span className="fw-semibold">Tipo de agresor:</span>
                            <div>
                                <input type="radio"
                                    name="radAgrressor"
                                    id="radpersonal"
                                    onClick={() => handleSelectModal(1)}
                                    defaultChecked={!selectCheck}
                                />
                                <label htmlFor="radpersonal">Personal IE a escolares </label>
                            </div>
                            <div>
                                <input type="radio"
                                    name="radAgrressor"
                                    id="radescolares"
                                    onClick={() => handleSelectModal(2)}
                                    defaultChecked={selectCheck}
                                />
                                <label htmlFor="radescolares">Escolar</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>

                            <button className='btn btn-sm btn-secondary bg-gradient'
                                onClick={(e) => handleModalAgrressor(e)}
                                disabled={available}
                            > Buscar agresor
                            </button>
                        </div>
                        <div>
                            <span className='fw-semibold'>Persona agresor</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                 {selectAgrressor === 2 ? (
                                    <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                ) : (
                                    <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>                                        
                                    <div className="attribute-title-direction">Puesto</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                )}
                                {selectAgrressor === 1 ? (
                                    agrressorPersonCurrent?.map((person, index) => (
                                        <AggressorPersonStaffRow
                                            key={index}
                                            id={person?.peie_id}
                                            name={person?.peie_nombres || ""}
                                            lastname={person?.peie_apellidos || ""}
                                            tipoPersonal={person?.tipo_personal_ie_descripcion || ""}
                                            setAvailable={setAvailable}
                                            bitacoraAggressor= {true}
                                        />
                                    ))
                                ) : (
                                    selectAgrressor === 2 && (
                                        agrressorPersonCurrent?.map((person, index) => (
                                            <AggressorPersonRow
                                                key={index}
                                                id={person?.alum_id}
                                                name={person?.alum_nombres}
                                                lastname={person?.alum_apellidos}
                                                level={person?.nivel_descripcion}
                                                grade={person?.grado_descripcion}
                                                setAvailable={setAvailable}
                                                bitacoraAggressor= {true}
                                            />
                                        ))
                                    )
                                )}
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='fw-semibold'>Incidencias encontradas</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Tipo de incidencia</div>
                                    <div className="attribute-title-direction">SubT. de incidencia</div>
                                    <div className="attribute-title-direction">Motivo de incidencia</div>
                                    <div className="attribute-title-direction">Fecha y hora</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {incidenceAttackendPersonCurrent?.map((person, index) => (
                                    <BitacoraIncidentsFoundRow
                                        key={index}
                                        id={person?.inci_id}
                                        typeIncident={person?.tipo_incidencia}
                                        subTypeIncident={person?.subtipo_incidencia}
                                        reason={person?.motivo_incidencia}
                                        date={person?.fecha_incidencia+" "+person?.hora_incidencia}
                                        setStateDetails={setStateDetails}
                                    />
                                ))}
                            </ol>
                        </div>
                    </div>
                </IncidenceFormContainer>
            </Container>
        </>
    )

}

export default BitacoraIncidentsAggressor;