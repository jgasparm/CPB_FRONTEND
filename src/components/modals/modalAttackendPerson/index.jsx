import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Controller, useForm } from 'react-hook-form';
import SearchAttackendRow from '../../Tables/searchAttackendRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';
import { setAllAttackendPersons, setAllCpbBitacoraAttackendPersons, setAllIncidencesBitacoraAttackendPersons, setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';
import { allGradesApi, allLevelsApi, allSectionsApi, allTurnsApi } from '../../../api';

const ModalAttackendPerson = ({ modalAttackend, setmodalAttackend, typeQuerie, setAvailable }) => {
    const attackendPerson = useSelector(state => state.attackendPerson?.allAttackendPersons);
    const dispacth = useDispatch();

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    const regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
    //const regex = new RegExp("^[0-9]+$");

    const [sendAttackendCurrent, setSendAttackendCurrent] = useState([]);
    const [isEmptyItems, setIsEmptyITems] = useState(false);

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


    const handleSelectAttackendPerson = async () => {
        if (typeQuerie == 1) {
            dispacth(setCurrentAttackendPersons([sendAttackendCurrent]))
            setAvailable(true);
            setmodalAttackend(false)
        } else if (typeQuerie == 2) {
            dispacth(setCurrentBitacoraAttackendPersons([sendAttackendCurrent]));
            await handleIncidencesAttackend(sendAttackendCurrent);
            await handleCPBAttackend(sendAttackendCurrent);
            setAvailable(true);
            setmodalAttackend(false)
        }
    }
    const handleIncidencesAttackend = async (person) => {
        const params = "ai_alum_id=" + person.alum_id;
        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaIncidenciasAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            dispacth(setAllIncidencesBitacoraAttackendPersons(res.data));
        });

    }
    const handleCPBAttackend = async (person) => {
        const params = "ai_alum_id=" + "1";
        await axios("http://localhost:8080/wsCodeigniterCPB/wsConsultaCPBAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            dispacth(setAllCpbBitacoraAttackendPersons(res.data));
        });

    }
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
            if (typeQuerie == 1) {                
                dispacth(setAllAttackendPersons(res.data));
            } else if (typeQuerie == 2) {
                dispacth(setAllAttackendPersons(res.data));
                console.log("fd");
            }
        });

    };
    const validateText = (value, e) => {
        if(regex.test(value)){
            console.log("bien letra");
            return false;
        }else{
            console.log("mal numero");
            return true;
        }
    }
    return (
        <>
            {modalAttackend && (
                <DivContent>
                    <ContainerModal onClick={() => setmodalAttackend(false)}>
                    </ContainerModal>
                    <input className='btn btn-sm btn-secondary bg-gradient'
                        form='formSearch'
                        type="submit"
                        value="Buscar estudiante"
                    />
                    <Formulario id="formSearch" onSubmit={handleSubmit(onSubmit)}>
                        <h5 className="text-center mb-4" >Agregar persona agredida </h5>
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
                                    {errors.selectTurn && <p style={{ color: 'red' }}>Campo obligatorio</p>}
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
                                    {errors.selectLevel && <p style={{ color: 'red' }}>Campo obligatorio</p>}
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
                                    {errors.selectGrade && <p style={{ color: 'red' }}>Campo obligatorio</p>}
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Sección</TextField>
                                    <SelectOption
                                        id="selectSection"
                                        {...register("selectSection", {
                                            // required: true, 
                                            // message:"Campo obligatorio"
                                        })}
                                    >
                                        <option value="0">Todos</option>
                                        {allSections?.map((Section, index) => (
                                            <option key={index} value={Section?.pade_cadena}>
                                                {`${Section?.pade_descripcion}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                    {/* {errors.selectSection && <p style={{ color: 'red' }}>Campo obligatorio</p>} */}
                                </ContentBox>
                            </ContentSelect>
                            <ContentInput>
                                <ContentBox>
                                    <TextField>Apellidos</TextField>
                                    <InputText placeholder='apellidos' maxLength="100"
                                        // onKeyPress={e => validateText(e.target.value, e)}
                                        id="apellidos"
                                        {...register("apellidos", {
                                            // required: "required",
                                            pattern:{
                                                value: regex
                                            }
                                        })}
                                    // control={control}
                                    ></InputText>
                                    {errors.apellidos && <span className='text-danger' role="alert">Ingrese solo letras</span>}
                                    {/* <input {...register('apellidos', { required: "required", max: { value: 2, message: "error message" } })} /> */}
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Nombres</TextField>
                                    <InputText placeholder='nombres' maxLength="100"
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
                                    // onClick={(e) => {console.log("BOTON DE BUSCAR VICTIMA");}}
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
                                    <div className="attribute-title-direction">Turno</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Sección</div>
                                </li>
                                {attackendPerson != null && (
                                     attackendPerson?.map((person, index) => (
                                        <SearchAttackendRow
                                            key={index}
                                            id={person.alum_id}
                                            name={person.alum_nombres}
                                            lastname={person.alum_apellidos}
                                            turno={person.turno_descripcion}
                                            level={person.nivel_descripcion}
                                            grade={person.grado_descripcion}
                                            section={person.seccion_descripcion}
                                            typeQuerie={typeQuerie}
                                            setSendAttackendCurrent={setSendAttackendCurrent}
                                        />
                                    ))
                                )}
                                {isEmptyItems && <p className="text-center m-1">No se encontraron coincidencias</p>}
                            </ol>
                        </div>
                        <FooterButton>
                            <button className='btn btn-sm btn-primary bg-gradient'
                                type='button'
                                onClick={handleSelectAttackendPerson}
                            >Agregar persona agredida</button>
                        </FooterButton>
                    </Formulario>
                </DivContent>
            )}
        </>
    )
}

export default ModalAttackendPerson;