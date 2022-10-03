import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { allGradesApi, allLevelsApi, allSectionsApi, allTurnsApi } from '../../../api';
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
import { setAllIncidencesBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';
import SearchAgrressorRow from '../../Tables/searchAggressorRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';

const ModalAggressorPerson = ({ modalAggressor, setmodalAggressor,typeBitacora, setAvailable = false}) => {

    const dispatch = useDispatch();
    const [sendAggressorPerson, setSendAggressorPersonPerson] = useState([]);
    const [isEmptyItems, setIsEmptyITems] = useState(false);

    const regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");

    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons);
    const idAgrressorPerson = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    const [allturns, setAllTurns] = useState(null);
    const [allLevels, setAllLevels] = useState(null);
    const [allGrades, setAllGrades ] = useState(null);
    const [allSections, setAllSections] = useState(null) ;

    useEffect( () => {
        let promise1 = allTurnsApi();
        promise1.then((res) => {
            setAllTurns(res);
        });
        let promise2 = allLevelsApi();
        promise2.then((res) => {
            setAllLevels(res);
        });
        let promise3 = allGradesApi();
        promise3.then((res) => {
            setAllGrades(res);
        });
        let promise4 = allSectionsApi();
        promise4.then((res) => {
            setAllSections(res);
        });

    },[]);
        // console.log(res)
        // console.log(allturns);

    const onSubmit = async (data) => {
        const params = "ac_alum_turno=" + data.selectTurn + "&ac_alum_nivel=" + data.selectLevel + "&ac_alum_grado=" + data.selectGrade +
            "&ac_alum_seccion=" + data.selectSection + "&av_alum_apellidos=" +
            data.apellidos + "&av_alum_nombres=" + data.nombres;

        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaBuscarAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            if(res.data.length < 1){
                setIsEmptyITems(true)
            }else{
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
                setmodalAggressor(false)
            } else {
                let validate = true;
                idAgrressorPerson?.forEach(agrressor => {
                    if (agrressor?.alum_id == sendAggressorPerson?.alum_id) {
                        console.log("no se puede registrar 2 veces el mismo personal");
                        validate = false;
                    }
                });
                if (validate) {
                    idAgrressorPerson.push(sendAggressorPerson);
                    dispatch(setCurrentAgrressorPersons(idAgrressorPerson));
                    setmodalAggressor(false)
                }
            }
        // BITACORA DE PERSONA AGRESORA
        }else if(typeBitacora == 2){
            if (idAgrressorPerson == null || idAgrressorPerson.length < 1) {
                dispatch(setCurrentAgrressorPersons([sendAggressorPerson]));
                setAvailable(true);
                await handleIncidencesAttackend(sendAggressorPerson);
                setmodalAggressor(false)
            }
        }   
    }

    const handleIncidencesAttackend = async (person) => {
        const params = "av_tipo="+"AL"+"&ai_agresor_id=" + person.alum_id;
        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaAgresorIncidencias.php?" + params + "", {
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
            {modalAggressor && (
                <DivContent>
                    <ContainerModal onClick={() => setmodalAggressor(false)}></ContainerModal>
                    <Formulario id="formSearch" onSubmit={handleSubmit(onSubmit)}>
                        <h5 className="text-center mb-4">Agregar presunto agresor - Estudiante </h5>
                        <span>Buscar por:</span>
                        <SectionSearch>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Turno</TextField>
                                    <SelectOption id='optionTurn'
                                        // name="selectTurn"
                                        {...register("selectTurn", {
                                        })}
                                        control={control}
                                    >
                                        <option value="0">Todos</option>
                                        {allturns?.map((turn, index) => (
                                            <option key={index} value={turn?.pade_cadena} >
                                                {`${turn?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nivel</TextField>
                                    <SelectOption id="optionLevel"
                                        {...register("selectLevel", {
                                            // required:{ value: true, message:"Campo obligatorio"}
                                        })}
                                        control={control}
                                    >
                                        <option value="0">Todos</option>
                                        {allLevels?.map((level, index) => (
                                            <option key={index} value={level?.pade_cadena}>
                                                {`${level?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentSelect>
                                <ContentBox>
                                    <TextField>Grado</TextField>
                                    <SelectOption id="optionGrade"
                                        {...register("selectGrade", {
                                            // required:{ value: true, message:"Campo obligatorio"}
                                        })}
                                        control={control}
                                        defaultValue={""}
                                    >
                                        <option value="0">Todos</option>
                                        {allGrades?.map((Grade, index) => (
                                            <option key={index} value={Grade?.pade_cadena}>
                                                {`${Grade?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Sección</TextField>
                                    <SelectOption
                                        id="optionSection"
                                        {...register("selectSection", {
                                        })}
                                    >
                                        <option value="0">Todos</option>
                                        {allSections?.map((Section, index) => (
                                            <option key={index} value={Section?.pade_cadena}>
                                                {`${Section?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                </ContentBox>
                            </ContentSelect>
                            <ContentInput>
                                <ContentBox>
                                    <TextField>Apellidos</TextField>
                                    <InputText type="text" placeholder='apellidos' maxLength="100"
                                        id="apellidos"
                                        {...register("apellidos", {
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
                                    <InputText disabled={false} placeholder='nombres' maxLength="100"
                                        id="nombres"
                                        {...register("nombres", {
                                            // required: "required",
                                            pattern:{
                                                value: regex
                                            }
                                        })}
                                        control={control}
                                    ></InputText>
                                    {errors.nombres && <span className='text-danger' role="alert">Ingrese solo letras</span>}
                                </ContentBox>
                            </ContentInput>
                            <div className='mt-2 d-flex justify-content-end'>
                                <input className='btn btn-sm btn-secondary bg-gradient'
                                    form='formSearch'
                                    type="submit"
                                    value="Buscar estudiante"
                                />
                            </div>
                        </SectionSearch>
                        <div className="my-3">
                            <span className='fw-semibold'>Coincidencias encontradas</span>
                            <ol className="collection-direction collection-container-direction" style={{ paddingLeft: '0px' }}>
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    {/* <div className="attribute-title-direction">Acciones</div> */}
                                </li>
                                {agrressorPerson != null && (
                                    agrressorPerson?.map((person, index) => (
                                        <SearchAgrressorRow
                                            key={index}
                                            id={person?.alum_id}
                                            name={person?.alum_nombres}
                                            lastname={person?.alum_apellidos}
                                            level={person?.nivel_descripcion}
                                            grade={person?.grado_descripcion}
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

export default ModalAggressorPerson;

