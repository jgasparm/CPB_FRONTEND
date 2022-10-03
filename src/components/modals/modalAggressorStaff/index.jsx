import React, { useEffect, useState } from 'react';
import SearchAggressorStaffRow from '../../Tables/searchAggressorStaffRow';
import { Controller, useForm } from 'react-hook-form';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
import { allStaffApi } from '../../../api';
import { ToastContainer } from 'react-toastify';
import { setAllIncidencesBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';
const ModalAggressorStaff = ({ modalAggressorStaff, setModalAggressorStaff, typeBitacora, setAvailable }) => {

    const dispatch = useDispatch();
    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons);
    const idAgrressorPerson = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);

    const [valueInput, setValueInput] = useState();

    const regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");

    const [sendAggressorPerson, setSendAggressorPersonPerson] = useState([]);
    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    })
    const [isEmptyItems, setIsEmptyITems] = useState(false);

    const [allStaff, setAllStaff] = useState(null);
    useEffect(() => {
        let promise1 = allStaffApi();
        promise1.then((res) => {
            setAllStaff(res);
        });
    }, []);

    const onSubmit = async (data) => {
        const params = "ac_peie_tipo=" + data.selectStaff +
            "&av_peie_apellidos=" + data.apellidos +
            "&av_peie_nombres=" + data.nombres;

        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaBuscarPersonalIE.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            console.log(res);
            if (res.data.length < 1) {
                setIsEmptyITems(true)
            } else {
                setIsEmptyITems(false)
            }
            dispatch(setAllAgrressorPersons(res.data));
        });

    };
    const handleSelectAgrressorPerson = async () => {
        // BITACORA DE PERSONA AGRAVIADA
        if(typeBitacora == 1){            
            if (idAgrressorPerson == null || idAgrressorPerson.length < 1) {
                dispatch(setCurrentAgrressorPersons([sendAggressorPerson]));
                setModalAggressorStaff(false)
            } else {
                let validar = true;
                idAgrressorPerson?.forEach(agrressor => {
                    if (agrressor?.peie_id == sendAggressorPerson?.peie_id) {
                        console.log("no se puede registrar 2 veces el mismo personal");
                        validar = false;
                    }
                });
                if (validar) {
                    idAgrressorPerson.push(sendAggressorPerson);
                    dispatch(setCurrentAgrressorPersons(idAgrressorPerson));
                    setModalAggressorStaff(false)
                }
            }
        // BITACORA DE PERSONA AGRESORA
        }else if(typeBitacora == 2){
            if (idAgrressorPerson == null || idAgrressorPerson.length < 1) {
                dispatch(setCurrentAgrressorPersons([sendAggressorPerson]));
                setAvailable(true);
                await handleIncidencesAttackend(sendAggressorPerson);
                setModalAggressorStaff(false)
            }
        }
    }   

    const handleIncidencesAttackend = async (person) => {
        const params = "av_tipo="+"PE"+"&ai_agresor_id=" + person.peie_id;
        await axios("http://localhost:8080/wsCodeigniterCPB//wsConsultaAgresorIncidencias.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            dispatch(setAllIncidencesBitacoraAttackendPersons(res.data));
        });

    } 

    return (
        <>
            {modalAggressorStaff && (
                <DivContent>
                    <ContainerModal onClick={() => setModalAggressorStaff(false)}></ContainerModal>
                    <ToastContainer/>
                    <Formulario id="formSearch" onSubmit={handleSubmit(onSubmit)} >
                        <h5 className="text-center mb-4">Agregar presunto agresor - Personal IE </h5>
                        <span>Buscar por:</span>
                        <SectionSearch>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Puesto</TextField>
                                    <SelectOption id="optionStaff"
                                        name="selectStaff"
                                        {...register("selectStaff")}
                                        control={control}
                                    // onChange={(e) => setSelectStaff(e)}
                                    // rules={{
                                    //     required: { value: true, message: "Campo obligatorio" }
                                    // }}
                                    >
                                        {/* <option value="0">Todos</option> */}
                                        {allStaff?.map((staff, index) => (
                                            <option key={index} value={staff.pade_cadena}>
                                                {`${staff?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentInput>
                                <ContentBox>
                                    <TextField>Apellidos</TextField>
                                    <InputText placeholder='apellidos' maxLength="100"
                                    id="apellidos"
                                        {...register("apellidos",{
                                            // required: "required",
                                            pattern:{
                                                value: regex
                                            }
                                        })}
                                        control={control}
                                    ></InputText>
                                    {errors.apellidos && <span className='text-danger' role="alert">Ingrese solo letras</span>}
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nombres</TextField>
                                    <InputText placeholder='nombres' maxLength="100"
                                    id="nombres"
                                        {...register("nombres",{
                                            // required: "required",
                                            pattern:{
                                                value: regex
                                            }
                                        })}
                                    ></InputText>
                                    {errors.nombres && <span className='text-danger' role="alert">Ingrese solo letras</span>}
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
                                    <div className="attribute-title-direction">Tipo de Personal</div>
                                </li>
                                {agrressorPerson != null && (
                                    agrressorPerson?.map((person, index) => (
                                        <SearchAggressorStaffRow
                                            key={index}
                                            id={person?.peie_id}
                                            name={person?.peie_nombres}
                                            lastname={person?.peie_apellidos}
                                            position={person?.tipo_personal_ie_descripcion}
                                            setSendAggressorPersonPerson={setSendAggressorPersonPerson}
                                        />
                                    ))
                                )}
                                {isEmptyItems && <p className="text-center m-1">No se encontraron coincidencias</p>}
                            </ol>
                        </div>
                        <FooterButton>
                            <button type='button' className='btn btn-sm btn-primary bg-gradient'
                                onClick={handleSelectAgrressorPerson}
                            >Agregar presunto agresor</button>
                        </FooterButton>
                    </Formulario>
                </DivContent>
            )}
        </>
    )
}

export default ModalAggressorStaff;