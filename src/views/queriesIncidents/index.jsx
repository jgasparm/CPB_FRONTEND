import React, { useState } from 'react';
import SeacrhInicidentsRow from '../../components/Tables/searchIncidentsRow';
import './tablequeriesIncidents.scss';
import { Container, ContentBox, ContentSelect, Form, HintInput, IncidenceFormContainer, Input, SectionSearch, SelectOption } from './style';

const QueriesIncidents = () => {
    const [attackendsPerson, setIncidentsPerson] = useState([
        // {
        //     id: "1",
        //     name: "Adrian Diego",
        //     lastname: "Montalvan Nuñez",
        //     level: "Seundaria",
        //     grade: "Cuarto",
        //     typeIncident: "Física",
        //     subTypeIncident: "Con lesiones",
        // },
        // {
        //     id: "2",
        //     name: "Pedro Luis",
        //     lastname: "Flores Torres",
        //     level: "Seundaria",
        //     grade: "Quinto",
        //     typeIncident: "Verbal",
        //     subTypeIncident: "Condición social",
        // }
    ]);

    return (
        <Container>
            <Form>
                <h5 className="text-center mb-4">Consulta de incidencias</h5>
                <SectionSearch>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Origen de incidencia</HintInput>
                            <SelectOption>
                                <option value="">--Seleccione--</option>
                                <option value="">Personal IE a escolares</option>
                                <option value="">Entre escolares</option>
                            </SelectOption>
                        </ContentBox>                        
                    </ContentSelect>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Tipo de incidencia</HintInput>
                            <SelectOption>
                                <option value="">--Seleccione--</option>
                                <option value="">Física</option>
                                <option value="">Psicológica</option>
                                <option value="">Sexual</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Subtipo de incidencia</HintInput>
                            <SelectOption>
                                <option value="">--Seleccione--</option>
                                <option value="">Con lesiones</option>
                                <option value="">Sin lesiones</option>
                                <option value="">Castigo físico</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Rango inicial</HintInput>
                            <Input type="date"></Input>
                        </ContentBox>
                    </ContentSelect>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Motivo de incidencia</HintInput>
                            <SelectOption>
                                <option value="">--Seleccione--</option>
                                <option value="">Sin motivo alguno, sólo por molestar o por burlarse</option>
                                <option value="">Por su forma de hablar o expresarse</option>
                                <option value="">Por su ritmo o estilo de aprendizaje</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Lugar de incidencia</HintInput>
                            <SelectOption>
                                <option value="">--Seleccione--</option>
                                <option value="">Patio principal</option>
                                <option value="">En el aula</option>
                                <option value="">En el baño</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Rango final</HintInput>
                            <Input type="date"></Input>
                        </ContentBox>
                    </ContentSelect>
                    <div className='mt-2 d-flex justify-content-end'>
                                <button className='btn btn-sm btn-secondary bg-gradient'
                                    onClick={(e) => {
                                    }}>
                                        Consultar
                                </button>
                            </div>
                </SectionSearch>
                <div className="my-3">
                    <div>
                        <span className='fw-semibold'>Agraviados</span>
                        <ol className="collection-incidents collection-container-incidents" style={{ paddingLeft: '0px' }}>
                            <li className="item-incidents item-container-incidents">
                                <div className="attribute-title-incidents">Nombres</div>
                                <div className="attribute-title-incidents">Apellidos</div>
                                <div className="attribute-title-incidents">Nivel</div>
                                <div className="attribute-title-incidents">Grado</div>
                                <div className="attribute-title-incidents">Tipo de incidencia</div>
                                <div className="attribute-title-incidents">Subtipo de incidencia</div>
                                <div className="attribute-title-incidents">Acciones</div>
                            </li>
                            {attackendsPerson.map((person, index) => (
                                <SeacrhInicidentsRow
                                    key={index}
                                    name={person.name}
                                    lastname={person.lastname}
                                    level={person.level}
                                    grade={person.grade}
                                    typeIncident={person.typeIncident}
                                    subTypeIncident={person.subTypeIncident}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </Form>
        </Container>
    )
}

export default QueriesIncidents;