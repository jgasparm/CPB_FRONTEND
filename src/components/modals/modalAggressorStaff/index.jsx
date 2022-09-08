import React, { useState } from 'react';
import SearchAggressorStaffRow from '../../Tables/searchAggressorStaffRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
     ContentInput, InputText,FooterButton
} from '../modals';
const ModalAggressorStaff = ({modalAggressorStaff, setModalAggressorStaff }) => {
    const [aggressorPerson, setAggressorPersonPerson] = useState([
        // {
        //     id: "1",
        //     name: "Julio Damian",
        //     lastname: "Rojas Alfaro",
        //     position: "Prof. Historia"
        // }, {
        //     id: "2",
        //     name: "Israel Lucas",
        //     lastname: "Gutierrez Silva",
        //     position: "Auxiliar"
        // },
    ]);

    return (
        <>
        {modalAggressorStaff && (
            <DivContent>
                <ContainerModal onClick={() => setModalAggressorStaff(false)}>
                        <Formulario>
                            <h5 className="text-center mb-4">Agregar presunto agresor - Personal IE </h5>
                            <span>Buscar por:</span>
                            <SectionSearch>
                                <ContentSelect>
                                    <ContentBox>
                                        <TextField>Tipo de personal</TextField>
                                        <SelectOption></SelectOption>
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
                                        Buscar personal IE</button>
                                </div>
                            </SectionSearch>
                            <div className="my-3">
                                <span className='fw-semibold'>Coincidencias encontradas</span>
                                <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                    <li className="item-direction item-container-direction">
                                        <div className="attribute-title-direction">Nombres</div>
                                        <div className="attribute-title-direction">Apellidos</div>
                                        <div className="attribute-title-direction">Puesto</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    {aggressorPerson?.map((person, index) => (
                                        <SearchAggressorStaffRow
                                            key={index}
                                            name={person.name}
                                            lastname={person.lastname}
                                            position={person.position}
                                        />
                                    ))}
                                </ol>
                            </div>
                            <FooterButton>
                            <button className='btn btn-sm btn-primary bg-gradient'>Agregar presunto agresor</button>
                            </FooterButton>
                        </Formulario>
                    </ContainerModal>
            </DivContent>
        )}
        </>
    )
 }

 export default ModalAggressorStaff;