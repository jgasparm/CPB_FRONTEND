import React, { useState } from 'react'
import BitacoraAttackendRow from '../../components/Tables/bitacoraAttackendRow';
import BitacoraIncidentsFoundRow from '../../components/Tables/bitacoraIncidentsFoundRow';
import { Container, IncidenceFormContainer } from './style';

const BitacoraIncidents = () => {
    const [attackedPerson, setAttackedPerson] = useState([
        // {
        //     id: "1",
        //     name: "Edwin Enrique",
        //     lastname: "Torres Rojas",
        //     level: "Seundaria",
        //     grade: "Cuarto"
        // }
    ]);
    const [incidentsPerson, setIncidentsPerson] = useState([
        // {
        //     id: "1",
        //     typeIncident: "Física",
        //     subTypeIncident: "Con lesiones",
        //     reason: "Por su color de piel",
        //     date: "20/08/2022 10:05am"
        // },
        // {
        //     id: "2",
        //     typeIncident: "Verbal",
        //     subTypeIncident: "Condición social",
        //     reason: "Por ser de provincia",
        //     date: "22/08/2022 09:35am"
        // }
    ]);

    return (
        <Container>
            <h5 className="text-center mb-4">Bitácora de incidencias del alumno</h5>
            <IncidenceFormContainer>
                <div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-sm btn-secondary bg-gradient'
                            onClick={(e) => handleModalAttackend(e)}>
                            Buscar persona agredida
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
                            {attackedPerson.map((person, index) => (
                                <BitacoraAttackendRow
                                    key={index}
                                    name={person.name}
                                    lastname={person.lastname}
                                    level={person.level}
                                    grade={person.grade}
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
                                <div className="attribute-title-direction"></div>
                                <div className="attribute-title-direction">SubT. de incidencia</div>
                                <div className="attribute-title-direction">Motivo de incidencia</div>
                                <div className="attribute-title-direction">Fecha y hora</div>
                                <div className="attribute-title-direction">Acciones</div>
                            </li>
                            {incidentsPerson.map((person, index) => (
                                <BitacoraIncidentsFoundRow
                                    key={index}
                                    typeIncident={person.typeIncident}
                                    subTypeIncident={person.subTypeIncident}
                                    reason={person.reason}
                                    date={person.date}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </IncidenceFormContainer>
        </Container>
    )
}

export default BitacoraIncidents;