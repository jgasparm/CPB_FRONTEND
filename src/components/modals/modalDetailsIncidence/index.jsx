import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AggressorPersonRow from '../../Tables/aggressorPersonRow';
import AggressorPersonStaffRow from '../../Tables/aggressorPersonStaffRow';
import AttackendPersonRow from "../../Tables/attackendPersonRow";

import {
    Container,
    Form,
    IncidenceFormContainer,
    InputContainer,
    HintInput,
    SelectOption,
    Input,
    FooterButton,
    DivContent,
    ContainerModal,
    Formulario,
} from "./style";
const ModalDetailsIncidence = ({stateDetails, setStatelDetails}) => {

    const dispatch = useDispatch();
    const { handleSubmit, register, control, formState: { errors } } = useForm({
        mode: 'onChange',
    });
    
    // VARIABLE DE ESTADO PARA BOTÓN DE AGREGAR AGRESOR
    const [available, setAvailable] = useState(false);

    
    const incidence = useSelector(state => state.queryIncidence?.currentQueryIncidences);
    const alumno = useSelector(state => state.queryIncidence?.currentAlumnoQueryIncidences);
    const agresores = useSelector(state => state.agrressorPerson?.allAgrressorPersons);
    
    const [dataIncidence, setDataIncidence] = useState();

    const [selectAgrressor, setSelectAgrressor] = useState();
    const [selectCheck, setSelectCheck] = useState(true);
    const selectOrigen = () => {
        if(dataIncidence?.inci_origen == 1){
            setSelectCheck(false)
        }else if(dataIncidence?.inci_origen == 2){
            setSelectCheck(true);
        }
    }

    useEffect(() => {
        setDataIncidence(incidence)
        selectOrigen()
        setSelectAgrressor(dataIncidence?.inci_origen)
    }, [incidence, dataIncidence, selectAgrressor,selectCheck]);
    // selectOrigen();
    // console.log(incidence);
    // console.log(alumno);
    // console.log(agresores);
    // console.log(selectAgrressor);

    return (
        <>
        {stateDetails && (
            <DivContent>
                <ContainerModal onClick={() => setStatelDetails(false)}> </ContainerModal>
                    <Formulario 
                    // id="formNew" 
                    // onSubmit={handleSubmit(onSubmit)}
                    >
                        <h4 className="text-center mb-4">Detalle de la incidencia</h4>
                        <IncidenceFormContainer>
                            <div className="d-flex flex-wrap gap-3">
                                <span className="fw-semibold">Origen de incidencia:</span>
                                <div>
                                    <input type="radio"
                                        name="radAgrressor"
                                        id="radpersonal"
                                        defaultChecked={!selectCheck}
                                        disabled={true}
                                    />
                                    <label htmlFor="radpersonal">Personal IE a escolares </label>
                                </div>
                                <div>
                                    <input type="radio"
                                        name="radAgrressor"
                                        id="radescolares"
                                        defaultChecked={selectCheck}
                                        disabled={true}
                                    />
                                    <label htmlFor="radescolares">Entre escolares </label>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span className="fw-semibold">Persona agredida</span>
                                    <ol
                                        className="collection-direction collection-container-direction"
                                        style={{ paddingLeft: "0px" }}
                                    >
                                        <li className="item-direction item-container-direction item-container-header">
                                            <div className="attribute-title-direction">Nombres</div>
                                            <div className="attribute-title-direction">Apellidos</div>
                                            <div className="attribute-title-direction">Turno</div>
                                            <div className="attribute-title-direction">Nivel</div>
                                            <div className="attribute-title-direction">Grado</div>
                                            <div className="attribute-title-direction">Grado</div>
                                        </li>
                                            <AttackendPersonRow
                                                id={alumno?.alum_id}
                                                name={alumno?.alum_nombres}
                                                lastname={alumno?.alum_apellidos}
                                                turno={alumno?.turno_descripcion}
                                                level={alumno?.nivel_descripcion}
                                                grade={alumno?.grado_descripcion}
                                                section={alumno?.seccion_descripcion}
                                                setAvailable={setAvailable}
                                                details={true}
                                            />
                                    </ol>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span className="fw-semibold">Persuntos agresores</span>
                                    <ol
                                        className="collection-direction collection-container-direction"
                                        style={{ paddingLeft: "0px" }}
                                    >
                                        {selectAgrressor == 1 ? (
                                            <li className="item-direction item-container-direction">
                                            <div className="attribute-title-direction">Nombres</div>
                                            <div className="attribute-title-direction">Apellidos</div>                                        
                                            <div className="attribute-title-direction">Puesto</div>
                                            {/* <div className="attribute-title-direction">Acciones</div> */}
                                        </li>                                           
                                        
                                        ) : (
                                            selectAgrressor == 2 && (
                                            <li className="item-direction item-container-direction">
                                            <div className="attribute-title-direction">Nombres</div>
                                            <div className="attribute-title-direction">Apellidos</div>
                                            <div className="attribute-title-direction">Nivel</div>
                                            <div className="attribute-title-direction">Grado</div>
                                            {/* <div className="attribute-title-direction">Acciones</div> */}
                                            </li>
                                            )
                                        )}
                                        {selectAgrressor == 1 ? (
                                            agresores?.map((person, index) => (
                                                <AggressorPersonStaffRow
                                                    key={index}
                                                    id={person?.peie_id}
                                                    name={person?.nombres  || ""}
                                                    lastname={person?.apellidos || ""}
                                                    tipoPersonal={person?.tipo_personal || ""}
                                                    setAvailable={setAvailable}
                                                    bitacoraAggressor={false}
                                                    details={true}
                                                />
                                            ))
                                            
                                        ) : (
                                            selectAgrressor == 2 && (
                                                agresores?.map((person, index) => (

                                                    <AggressorPersonRow
                                                        key={index}
                                                        id={person?.alum_id}
                                                        name={person?.nombres}
                                                        lastname={person?.apellidos}
                                                        level={person?.alum_nivel}
                                                        grade={person?.alum_grado}
                                                        setAvailable={setAvailable}
                                                        bitacoraAggressor={false}
                                                        details={true}
                                                    />
                                                )) 
                                            )
                                        )}
                
                                    </ol>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                <InputContainer>
                                    <HintInput>Tipo de Incidencia</HintInput>
                                    <SelectOption id='optionTipo' disabled={true}
                                        // name="incidenceName"
                                        {...register("selectTipo", {
                                        })}
                                        control={control}
                                    >
                                        <option value="">{incidence?.tipo_incidencia}</option>
                                        {/* {tiposIncidencias?.map((tipo, index) => (
                                            <option key={index} value={tipo?.pade_cadena} >
                                                {`${tipo?.pade_descripcion}`}
                                            </option>
                                        ))} */}
                                    </SelectOption>
                                </InputContainer>
                                <InputContainer>
                                    <HintInput>Subtipo de Incidencia</HintInput>
                                    <SelectOption id='optionSubTipo' disabled={true}
                                        // name="incidenceName"
                                        {...register("selectSubTipo", {
                                        })}
                                        control={control}
                                    >
                                        <option value="">{incidence?.subtipo_incidencia}</option>
                                        {/* {subTiposIncidencias?.map((tipo, index) => (
                                            <option key={index} value={tipo?.insu_id} >
                                                {`${tipo?.insu_descripcion}`}
                                            </option>
                                        ))} */}
                                    </SelectOption>
                                </InputContainer>
                                <InputContainer>
                                    <HintInput></HintInput>
                                    <HintInput>Motivos de Incidencia</HintInput>
                                    <SelectOption id='optionMotivo' disabled={true}
                                        // name="incidenceName"
                                        {...register("selectMotivo", {
                                            
                                        })}
                                        control={control} 
                                    >
                                        <option value="">{incidence?.motivo_incidencia}</option>
                                        {/* {motivosIncidencia?.map((tipo, index) => (
                                            <option key={index} value={tipo?.inmo_id} >
                                                {`${tipo?.inmo_descripcion}`}
                                            </option>
                                        ))} */}
                                    </SelectOption>
                                </InputContainer>
                                <InputContainer>
                                    <HintInput>Lugar de Incidencia</HintInput>
                                    <SelectOption id='optionLugar' disabled={true}
                                        {...register("selectLugar", {
                                        })}
                                        control={control}
                                    >
                                        <option value="">{incidence?.lugar_incidencia}</option>
                                        {/* {lugarIncidencia?.map((tipo, index) => (
                                            <option key={index} value={tipo?.pade_cadena} >
                                                {`${tipo?.pade_descripcion}`}
                                            </option>
                                        ))} */}
                                    </SelectOption>
                                </InputContainer>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-end align-items-center gap-2">
                                    <span>Agregar evidencia</span>
                                    <input
                                        type="file"
                                        className="btn btn-sm btn-secondary bg-gradient"
                                        disabled={true}
                                    />
                                </div>
                                <InputContainer>
                                    <HintInput>Detalle de la Incidencia</HintInput>
                                    <textarea  disabled={true}
                                        {...register("detalle")}
                                        control={control}
                                        placeholder="Detalle la incidencia"
                                        defaultValue={incidence?.inci_detalle}
                                    >
                                    </textarea>
                                </InputContainer>
                            </div>
                        </IncidenceFormContainer>
                    </Formulario>
                
            </DivContent>
        )}
        </>
    )

}

export default ModalDetailsIncidence;