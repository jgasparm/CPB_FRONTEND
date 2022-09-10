import React, { useState } from 'react';
import SearchAggressorStaffRow from '../../Tables/searchAggressorStaffRow';
import { Controller, useForm } from 'react-hook-form';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
const ModalAggressorStaff = ({ modalAggressorStaff, setModalAggressorStaff }) => {
    
    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons);
    const dispacth = useDispatch();
    const { handleSubmit, register, control, formState: { errors } } = useForm({})
    // const [aggressorPerson, setAggressorPersonPerson] = useState([
    //     // {
    //     //     id: "1",
    //     //     name: "Julio Damian",
    //     //     lastname: "Rojas Alfaro",
    //     //     position: "Prof. Historia"
    //     // }, {
    //     //     id: "2",
    //     //     name: "Israel Lucas",
    //     //     lastname: "Gutierrez Silva",
    //     //     position: "Auxiliar"
    //     // },
    // ]);
    const allStaff = [
        { id: "1", typeStaff: "Docente" },
        { id: "2", typeStaff: "Auxiliar" },
        { id: "3", typeStaff: "Per. seguridad" }
    ];
    const onSubmit = async (data) => {

        const params = "ac_peie_tipo=" + data.selectStaff +
         "&av_peie_apellidos=" + data.apellidos +
            "&av_peie_nombres=" + data.nombres;

        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaBuscarPersonalIE.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            console.log(res);
            dispacth(setAllAgrressorPersons(res.data));
        });

    };

    return (
        <>
            {modalAggressorStaff && (
                <DivContent>
                    <ContainerModal onClick={() => setModalAggressorStaff(false)}></ContainerModal>
                    <Formulario id="formSearch" onSubmit={handleSubmit(onSubmit)} >
                        <h5 className="text-center mb-4">Agregar presunto agresor - Personal IE </h5>
                        <span>Buscar por:</span>
                        <SectionSearch>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Tipo de personal</TextField>
                                    <SelectOption id="optionStaff"
                                        name="selectStaff"
                                        {...register("selectStaff")}
                                        control={control}
                                    // onChange={(e) => setSelectStaff(e)}
                                    // rules={{
                                    //     required: { value: true, message: "Campo obligatorio" }
                                    // }}
                                    >
                                        <option value={""}> --seleccione-- </option>
                                        {allStaff?.map((staff, index) => (
                                            <option key={index} value={staff.id}>
                                                {`${staff?.typeStaff}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentInput>
                                <ContentBox>
                                    <TextField>Apellidos</TextField>
                                    <InputText disabled={false} placeholder='apellidos'
                                        {...register("apellidos")}
                                        control={control}
                                    ></InputText>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nombres</TextField>
                                    <InputText disabled={false} placeholder='nombres'
                                        {...register("nombres")}
                                    ></InputText>
                                </ContentBox>
                            </ContentInput>
                            <div className='mt-2 d-flex justify-content-end'>
                                <input className='btn btn-sm btn-secondary bg-gradient'
                                    form='formSearch'
                                    type="submit"
                                    value="Buscar personal IE"
                                />
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
                                {agrressorPerson?.map((person, index) => (
                                    <SearchAggressorStaffRow
                                        key={index}
                                        id={person?.peie_id}
                                        name={person?.peie_nombres}
                                        lastname={person?.peie_apellidos}
                                        position={person?.tipo_personal_ie_descripcion}
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

export default ModalAggressorStaff;