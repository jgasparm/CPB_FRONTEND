import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Controller, useForm } from 'react-hook-form';
import SearchAttackendRow from '../../Tables/searchAttackendRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';
import { setAllAttackendPersons, setAllCpbBitacoraAttackendPersons, setAllIncidencesBitacoraAttackendPersons, setCurrentAttackendPersons, setCurrentBitacoraAttackendPersons } from '../../../app/features/attackendPerson/attackendPerson';

const ModalAttackendPerson = ({ modalAttackend, setmodalAttackend, typeQuerie, setAvailable}) => {
    const attackendPerson = useSelector(state => state.attackendPerson?.allAttackendPersons);
    console.log(attackendPerson);
    const dispacth = useDispatch();

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    });
    const [sendAttackendCurrent, setSendAttackendCurrent] = useState([]);

    const allturns = [
        { codeTurn: "1", typeTurn: "mañana" },
        { codeTurn: "2", typeTurn: "tarde" },
    ];
    const allLevels = [
        { codeLevel: "1", typeLevel: "Primaria" },
        { codeLevel: "2", typeLevel: "Secundaria" },
    ]
    const allGrades = [
        { codeGrade: "1", typeGrade: "1er grado" },
        { codeGrade: "2", typeGrade: "2er grado" },
        { codeGrade: "3", typeGrade: "3er grado" },
        { codeGrade: "4", typeGrade: "4er grado" },
        { codeGrade: "5", typeGrade: "5er grado" },
    ]
    const allSections = [
        { codeSection: "1", typeSection: "A" },
        { codeSection: "2", typeSection: "B" },
        { codeSection: "3", typeSection: "C" },
        { codeSection: "4", typeSection: "D" },
    ]
    const handleSelectAttackendPerson = async () => {
        if(typeQuerie == 1 ){
            dispacth(setCurrentAttackendPersons([sendAttackendCurrent]))
            setAvailable(true);
        }else if(typeQuerie == 2) {
            dispacth(setCurrentBitacoraAttackendPersons([sendAttackendCurrent]));
            await handleIncidencesAttackend(sendAttackendCurrent);
            await handleCPBAttackend(sendAttackendCurrent);
            setAvailable(true);
        }
    }
    const handleIncidencesAttackend = async (person) => {
        const params = "ai_alum_id=" +person.alum_id;
        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaIncidenciasAlumno.php?" + params + "", {
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
        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaCPBAlumno.php?" + params + "", {
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

        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaBuscarAlumno.php?" + params + "", {
            mode: "cors",
            method: 'GET',
            headers: {
                "Accept": "application/json;charset=utf-8",
            },
        }).then((res) => {
            if(typeQuerie == 1){
                console.log(res);
                dispacth(setAllAttackendPersons(res.data));
            }else if (typeQuerie == 2){
                dispacth(setAllAttackendPersons(res.data));
                //dispacth(setAllBitacoraIncidences(res.data));
                console.log("fd");
            }
        });

    };
    return (
        <>
            {modalAttackend && (
                <DivContent>
                    <ContainerModal onClick={() => setmodalAttackend(false)}>
                    </ContainerModal>
                    <input className='btn btn-sm btn-secondary bg-gradient'
                        // onClick={(e) => {console.log("BOTON DE BUSCAR VICTIMA");}}
                        form='formSearch'
                        type="submit"
                        value="Buscar estudiante"
                    />
                    <Formulario id="formSearch" onSubmit={handleSubmit(onSubmit)}>
                        <h5 className="text-center mb-4">Agregar persona agredida </h5>
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
                                        <option value="">--seleccione--</option>
                                        {allturns?.map((turn, index) => (
                                            <option key={index} value={turn?.codeTurn} >
                                                {`${turn?.typeTurn}`}
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
                                        <option value="">--seleccione--</option>
                                        {allLevels?.map((level, index) => (
                                            <option key={index} value={level?.codeLevel}>
                                                {`${level?.typeLevel}`}
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
                                        <option value="">--seleccione--</option>
                                        {allGrades?.map((Grade, index) => (
                                            <option key={index} value={Grade?.codeGrade}>
                                                {`${Grade?.typeGrade}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                    {errors.selectGrade && <p style={{ color: 'red' }}>Campo obligatorio</p>}
                                </ContentBox>
                                <ContentBox>
                                    <TextField>Sección</TextField>
                                    <SelectOption
                                        id="optionSection"
                                        {...register("selectSection", {
                                            // required:{ value: true, message:"Campo obligatorio"}
                                        })}
                                    >
                                        <option value="">--seleccione--</option>
                                        {allSections?.map((Section, index) => (
                                            <option key={index} value={Section?.codeSection}>
                                                {`${Section?.typeSection}`}
                                            </option>
                                        ))}
                                    </SelectOption>
                                    {errors.selectSection && <p style={{ color: 'red' }}>Campo obligatorio</p>}
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
                                        control={control}
                                    ></InputText>
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
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {attackendPerson?.map((person, index) => (
                                    <SearchAttackendRow
                                        key={index}
                                        id={person.alum_id}
                                        name={person.alum_nombres}
                                        lastname={person.alum_apellidos}
                                        level={person.alum_nivel}
                                        grade={person.alum_grado}
                                        typeQuerie={typeQuerie}
                                        setSendAttackendCurrent={setSendAttackendCurrent}
                                    />
                                ))}
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