import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from '../../../app/features/aggressorPerson/agrressorPerson';
import SearchAgrressorRow from '../../Tables/searchAggressorRow';
import {
    DivContent, ContainerModal, SectionSearch, Formulario,
    TextField, ContentBox, ContentSelect, SelectOption,
    ContentInput, InputText, FooterButton
} from '../modals';

const ModalAggressorPerson = ({ modalAggressor, setmodalAggressor }) => {

    const dispacth = useDispatch();
    const [sendAggressorPerson, setSendAggressorPersonPerson] = useState([]);
    const agrressorPerson = useSelector(state => state.agrressorPerson?.allAgrressorPersons);
    const idAgrressorPerson = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    });
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
            dispacth(setAllAgrressorPersons(res.data));            
        });

    };
    const handleSelectAgrressorPerson = async () => {
        if (idAgrressorPerson == null || idAgrressorPerson.length < 1) {
            dispacth(setCurrentAgrressorPersons([sendAggressorPerson]));
            setmodalAggressor(false)
        }else{
            let validar = true;
            idAgrressorPerson?.forEach(agrressor => {                
                if(agrressor?.alum_id == sendAggressorPerson?.alum_id){
                    console.log("no se puede registrar 2 veces el mismo personal");
                    validar = false;
                }
            });
            if(validar){
                idAgrressorPerson.push(sendAggressorPerson);
                dispacth(setCurrentAgrressorPersons(idAgrressorPerson));
                setmodalAggressor(false)
            }
        }
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
                                        <option value="">--seleccione--</option>
                                        {allturns?.map((turn, index) => (
                                            <option key={index} value={turn?.codeTurn} >
                                                {`${turn?.typeTurn}`}
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
                                        <option value="">--seleccione--</option>
                                        {allLevels?.map((level, index) => (
                                            <option key={index} value={level?.codeLevel}>
                                                {`${level?.typeLevel}`}
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
                                        <option value="">--seleccione--</option>
                                        {allGrades?.map((Grade, index) => (
                                            <option key={index} value={Grade?.codeGrade}>
                                                {`${Grade?.typeGrade}`}
                                            </option>
                                        ))}
                                    </SelectOption>
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
                                {agrressorPerson?.map((person, index) => (
                                    <SearchAgrressorRow
                                        key={index}
                                        id={person?.alum_id}
                                        name={person?.alum_nombres}
                                        lastname={person?.alum_apellidos}
                                        level={person?.alum_nivel}
                                        grade={person?.alum_grado}
                                        setSendAggressorPersonPerson={setSendAggressorPersonPerson}
                                    />
                                ))}
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

