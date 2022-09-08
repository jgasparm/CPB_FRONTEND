import React, { useState } from 'react'
import SearchAttackendRow from '../../Tables/searchAttackendRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';

const ModalAggressorPerson = ({ modalAggressor, setmodalAggressor }) => {
    const [aggressorPerson, setAggressorPersonPerson] = useState([
        // {
        //     id: "1",
        //     name: "José Diego",
        //     lastname: "Zavala Alfaro",
        //     level: "Seundaria",
        //     grade: "Cuarto"
        // }, {
        //     id: "2",
        //     name: "Luis Franco",
        //     lastname: "Durán Silva",
        //     level: "Seundaria",
        //     grade: "Quinto"
        // },
    ]);
    return (
        <>
            {modalAggressor && (
                <DivContent>
                    <ContainerModal onClick={() => setmodalAggressor(false)}></ContainerModal>
                    <Formulario>
                        <h5 className="text-center mb-4">Agregar presunto agresor - Estudiante </h5>
                        <span>Buscar por:</span>
                        <SectionSearch>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Turno</TextField>
                                    <SelectOption>
                                    <option value="">--seleccione--</option>
                                        <option value="">Mañana</option>
                                        <option value="">Tarde</option>
                                    </SelectOption>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nivel</TextField>
                                    <SelectOption>
                                    <option value="">--seleccione--</option>
                                        <option value="">Primaria</option>
                                        <option value="">Secundaria</option>
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Grado</TextField>
                                    <SelectOption>
                                    <option value="">--seleccione--</option>
                                        <option value="">1er grado</option>
                                        <option value="">2do grado</option>
                                        <option value="">3er grado</option>
                                        <option value="">4to grado</option>
                                        <option value="">5to grado</option>
                                    </SelectOption>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Sección</TextField>
                                    <SelectOption>
                                    <option value="">--seleccione--</option>
                                        <option value="">A</option>
                                        <option value="">B</option>
                                        <option value="">C</option>
                                        <option value="">D</option>
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentInput>
                                <ContentBox>
                                    <TextField>Apellidos</TextField>
                                    <InputText disabled={true} placeholder='apellidos'></InputText>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nombres</TextField>
                                    <InputText disabled={true} placeholder='nombres'></InputText>
                                </ContentBox>
                            </ContentInput>
                            <div className='mt-2 d-flex justify-content-end'>
                                <button className='btn btn-sm btn-secondary bg-gradient'
                                    onClick={(e) => {
                                    }}>
                                    Buscar Estudiante</button>
                            </div>
                        </SectionSearch>
                        <div className="my-3">
                            <span className='fw-semibold'>Persuntos agresores</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {aggressorPerson?.map((person, index) => (
                                    <SearchAttackendRow
                                        key={index}
                                        name={person.name}
                                        lastname={person.lastname}
                                        level={person.level}
                                        grade={person.grade}
                                    />
                                ))}
                            </ol>
                        </div>
                        <FooterButton>
                            <button className='btn btn-sm btn-primary bg-gradient'>Agregar presunto agresor</button>
                        </FooterButton>
                    </Formulario>
                </DivContent>
            )}
        </>
    )
}

export default ModalAggressorPerson;

