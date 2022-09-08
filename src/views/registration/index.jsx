import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import ModalAggressorPerson from '../../components/modals/modalAggressorPerson';
import ModalAggressorStaff from '../../components/modals/modalAggressorStaff';
import ModalAttackendPerson from '../../components/modals/modalAttackendPerson';
import AggressorPersonRow from '../../components/Tables/aggressorPersonRow';
import AttackendPersonRow from '../../components/Tables/attackendPersonRow';
import {
    Container, Form, IncidenceFormContainer, InputContainer,
    HintInput, Input,
    FooterButton
} from './style';
import './tableRegistration.scss';
const Registration = () => {

    const { control, errors } = useForm({});
    const [modalAttackend, setmodalAttackend] = useState(false);
    const [modalAggressor, setmodalAggressor] = useState(false);
    const [modalAggressorStaff, setmodalAggressorStaff] = useState(false);
    const [attackedPerson, setAttackedPerson] = useState([
        // {
        //     id: "1",
        //     name: "Edwin Enrique",
        //     lastname: "Torres Rojas",
        //     level: "Seundaria",
        //     grade: "Cuarto"
        // }
    ]);
    const [aggressorPerson, setAggressorPersonPerson] = useState([
        // {
        // id: "1",
        // name: "José Diego",
        // lastname: "Zavala Alfaro",
        // level: "Seundaria",
        // grade: "Cuarto"
        // },{
        // id: "2",
        // name: "Luis Franco",
        // lastname: "Durán Silva",
        // level: "Seundaria",
        // grade: "Quinto"
        // },
    ]);

    const handleModalAttackend = (e) => {
        setmodalAttackend(true);
        e.preventDefault();
    }

    return (
        <>
            <ModalAttackendPerson modalAttackend={modalAttackend} setmodalAttackend={setmodalAttackend} />
            <ModalAggressorPerson modalAggressor={modalAggressor} setmodalAggressor={setmodalAggressor} />
            <ModalAggressorStaff modalAggressorStaff={modalAggressorStaff} setModalAggressorStaff={setmodalAggressorStaff} />
            <Container>
                <Form>
                    <h5 className='text-center'>Registro de incidencia</h5>
                    <IncidenceFormContainer>
                        <div className='d-flex flex-wrap gap-3'>
                            <span className='fw-semibold'>Origen de incidencia:</span>
                            <div>
                                <input type="radio" name="radpersonal" id="radpersonal" />
                                <label htmlFor="radpersonal">Personal IE a escolares </label>
                            </div>
                            <div>
                                <input type="radio" name="radpersonal" id="radpersonal" />
                                <label htmlFor="radpersonal">Entre escolares </label>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm btn-secondary bg-gradient'
                                    onClick={(e) => handleModalAttackend(e)}>
                                    Agregar persona agredida</button>
                            </div>
                            <div>
                                <span className='fw-semibold'>Persona agredida</span>
                                <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                    <li className="item-direction item-container-direction item-container-header">
                                        <div className="attribute-title-direction">Nombres</div>
                                        <div className="attribute-title-direction">Apellidos</div>
                                        <div className="attribute-title-direction">Nivel</div>
                                        <div className="attribute-title-direction">Grado</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    {attackedPerson?.map((person, index) => (
                                        <AttackendPersonRow
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
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm btn-secondary bg-gradient'
                                    onClick={(e) => {
                                        setmodalAggressor(true)
                                        e.preventDefault();
                                    }}>
                                    Agregar presuntos agresores</button>
                            </div>
                            <div>
                                <span className='fw-semibold'>Presuntos agresores</span>
                                <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                    <li className="item-direction item-container-direction">
                                        <div className="attribute-title-direction">Nombres</div>
                                        <div className="attribute-title-direction">Apellidos</div>
                                        <div className="attribute-title-direction">Nivel</div>
                                        <div className="attribute-title-direction">Grado</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    {aggressorPerson?.map((person, index) => (
                                        <AggressorPersonRow
                                            key={index}
                                            name={person.name || ""}
                                            lastname={person.lastname || ""}
                                            level={person.level || ""}
                                            grade={person.grade || ""}
                                        />
                                    ))}

                                </ol>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-2'>
                            <InputContainer>
                                <HintInput>Tipo de Incidencia</HintInput>
                                <Controller
                                    name="incidenceName"
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        required: { value: true, message: "Campo obligatorio" },
                                    }}
                                    render={({ field }) =>
                                        <select />}
                                />
                            </InputContainer>
                            <InputContainer>
                                <HintInput>Subtipo de Incidencia</HintInput>
                                <Controller
                                    name="incidenceName"
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        required: { value: true, message: "Campo obligatorio" },
                                    }}
                                    render={({ field }) =>
                                        <select />}
                                />
                            </InputContainer>
                            <InputContainer>
                                <HintInput></HintInput>
                                <HintInput>Motivos de Incidencia</HintInput>
                                <Controller
                                    name="incidenceName"
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        required: { value: true, message: "Campo obligatorio" },
                                    }}
                                    render={({ field }) =>
                                        <select />}
                                />
                            </InputContainer>
                            <InputContainer>
                                <HintInput>Lugar de Incidencia</HintInput>
                                <Controller
                                    name="incidenceName"
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        required: { value: true, message: "Campo obligatorio" },
                                    }}
                                    render={({ field }) =>
                                        <select />}
                                />
                            </InputContainer>
                        </div>
                        <div className='d-flex flex-column'>
                            <div className='d-flex justify-content-end align-items-center gap-2'>
                                <span >Agregar evidencia</span>
                                <input type="file" className='btn btn-sm btn-secondary bg-gradient' />
                            </div>
                            <InputContainer>
                                <HintInput>Detalle de la Incidencia</HintInput>
                                <Controller
                                    name="incidenceName"
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        required: { value: true, message: "Campo obligatorio" },
                                    }}
                                    render={({ field }) =>
                                        <textarea />}
                                />
                            </InputContainer>
                        </div>
                    </IncidenceFormContainer>
                </Form>
                <FooterButton>
                    <button className='btn btn-sm btn-primary bg-gradient'>Guardar</button>
                    <button className='btn btn-sm btn-danger bg-gradient'>Cancelar</button>
                </FooterButton>
            </Container>
        </>
    )
}

export default Registration;