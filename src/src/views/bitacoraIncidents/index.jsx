import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllAttackendPersons, setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../app/features/attackendPerson/attackendPerson';
import ModalAttackendPerson from '../../components/modals/modalAttackendPerson';
import BitacoraAttackendRow from '../../components/Tables/bitacoraAttackendRow';
import BitacoraIncidentsFoundRow from '../../components/Tables/bitacoraIncidentsFoundRow';
import CasesPotentialAttackendRow from '../../components/Tables/casesPotentialAttackendRow';
import { Container, IncidenceFormContainer } from './style';

const BitacoraIncidents = () => {
    const dispatch = useDispatch();
    // dispatch(setCurrentBitacoraAttackendPersons(null));
    const bitacoraAttackendPersonCurrent = useSelector(state => state.attackendPerson?.currentBitacoraAttackendPersons);
    const incidenceAttackendPersonCurrent = useSelector(state => state.attackendPerson?.allIncidencesBitacoraAttackendPersons);
    const casesPotentialAttackendRow = useSelector(state => state.attackendPerson?.allCpbBitacoraAttackendPersons);
    const [modalAttackend, setmodalAttackend] = useState(false);
    const [typeQuerie, settypeQuerie] = useState(0);
    const [available, setAvailable] = useState(false);

    const handleModalAttackend = (e) => {
        e.preventDefault();
        dispatch(setAllAttackendPersons(null));
        dispatch(setCurrentAttackendPersons(null));
        settypeQuerie(2);
        setmodalAttackend(true);
    };

    return (
        <>
            <ModalAttackendPerson modalAttackend={modalAttackend}
                setmodalAttackend={setmodalAttackend} typeQuerie={typeQuerie} setAvailable={setAvailable}/>
            <Container>
                <h5 className="text-center mb-4">Bitácora de incidencias del alumno</h5>
                <IncidenceFormContainer>
                    <div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-secondary bg-gradient'
                                onClick={(e) => handleModalAttackend(e)}
                                disabled={available}
                                > Buscar persona agredida
                            </button>
                        </div>
                        <div>
                            <span className='fw-semibold'>Persona agraviada</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {bitacoraAttackendPersonCurrent?.map((person, index) => (
                                    <BitacoraAttackendRow
                                        key={index}
                                        id={person.alum_id}
                                        name={person?.alum_nombres}
                                        lastname={person?.alum_apellidos}
                                        level={person?.alum_nivel}
                                        grade={person?.alum_grado}
                                        setAvailable={setAvailable}
                                    />
                                ))}
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
                                        typeIncident={person?.tipo_incidencia}
                                        subTypeIncident={person?.subtipo_incidencia}
                                        reason={person?.motivo_incidencia}
                                        date={person?.fecha_incidencia+" "+person?.hora_incidencia}
                                    />
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='fw-semibold'>Casos potenciales de Bullying</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Fecha y hora</div>
                                    <div className="attribute-title-direction">Motivo</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {casesPotentialAttackendRow?.map((cases, index) => (
                                    <CasesPotentialAttackendRow
                                        key={index}
                                        dateHora={cases?.fecha_registro +" "+ cases?.hora_registro}
                                        reason={cases?.cpbu_descripcion}
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

export default BitacoraIncidents;