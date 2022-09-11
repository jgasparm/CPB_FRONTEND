import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {
    Container,
    Form,
    IncidenceFormContainer,
    InputContainer,
    HintInput,
    SelectOption,
    Input,
    FooterButton,
} from "./style";
const ModalDetailsIncidence = () => {
    const incidence = useSelector(state => state.queryIncidence?.currentQueryIncidences);
    const alumno = useSelector(state => state.queryIncidence?.currentAlumnoQueryIncidences);
    
    return (
        <Container>
            <Form id="formNew" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="text-center">Registro de incidencia</h4>
                <IncidenceFormContainer>
                    <div className="d-flex flex-wrap gap-3">
                        <span className="fw-semibold">Origen de incidencia:</span>
                        <div>
                            <input type="radio"
                                name="radAgrressor"
                                id="radpersonal"
                                onClick={() => handleSelectModal(1)}
                            />
                            <label htmlFor="radpersonal">Personal IE a escolares </label>
                        </div>
                        <div>
                            <input type="radio"
                                name="radAgrressor"
                                id="radescolares"
                                onClick={() => handleSelectModal(2)}
                            />
                            <label htmlFor="radescolares">Entre escolares </label>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-sm btn-secondary bg-gradient"
                                onClick={(e) => handleModalAttackend(e)}
                                disabled={available}
                            >
                                Agregar persona agredida
                            </button>
                        </div>
                        <div>
                            <span className="fw-semibold">Persona agredida</span>
                            <ol
                                className="collection-direction collection-container-direction"
                                style={{ paddingLeft: "0px" }}
                            >
                                <li className="item-direction item-container-direction item-container-header">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {attackendPersonCurrent?.map((person, index) => (
                                    <AttackendPersonRow
                                        key={index}
                                        id={person?.alum_id}
                                        name={person?.alum_nombres}
                                        lastname={person?.alum_apellidos}
                                        level={person?.alum_nivel}
                                        grade={person?.alum_grado}
                                        setAvailable={setAvailable}
                                    />
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-sm btn-secondary bg-gradient"
                                onClick={(e) => { handleModalAgrressor(e) }}
                            >
                                Agregar presuntos agresores
                            </button>
                        </div>
                        <div>
                            <span className="fw-semibold">Persuntos agresores</span>
                            <ol
                                className="collection-direction collection-container-direction"
                                style={{ paddingLeft: "0px" }}
                            >
                                <li className="item-direction item-container-direction">
                                    <div className="attribute-title-direction">Nombres</div>
                                    <div className="attribute-title-direction">Apellidos</div>
                                    <div className="attribute-title-direction">Nivel</div>
                                    <div className="attribute-title-direction">Grado</div>
                                    <div className="attribute-title-direction">Acciones</div>
                                </li>
                                {selectAgrressor === 1 ? (
                                    agrressorPersonCurrent?.map((person, index) => (
                                        <AggressorPersonRow
                                            key={index}
                                            id={person?.peie_id}
                                            name={person?.peie_nombres || ""}
                                            lastname={person?.peie_apellidos || ""}
                                            level={person?.tipo_personal_ie_descripcion || ""}
                                            grade={person?.grade || ""}
                                        />
                                    ))
                                ) : (
                                    selectAgrressor === 2 && (
                                        agrressorPersonCurrent?.map((person, index) => (
                                            <AggressorPersonRow
                                                key={index}
                                                id={person?.alum_id}
                                                name={person?.alum_nombres}
                                                lastname={person?.alum_apellidos}
                                                level={person?.alum_nivel}
                                                grade={person?.alum_grado}
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
                            <SelectOption id='optionTipo'
                                // name="incidenceName"
                                {...register("selectTipo", {
                                })}
                                control={control}
                            >
                                <option value="">--seleccione--</option>
                                {tiposIncidencias?.map((tipo, index) => (
                                    <option key={index} value={tipo?.pade_cadena} >
                                        {`${tipo?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                        </InputContainer>
                        <InputContainer>
                            <HintInput>Subtipo de Incidencia</HintInput>
                            <SelectOption id='optionSubTipo'
                                // name="incidenceName"
                                {...register("selectSubTipo", {
                                })}
                                control={control}
                            >
                                <option value="">--seleccione--</option>
                                {subTiposIncidencias?.map((tipo, index) => (
                                    <option key={index} value={tipo?.insu_id} >
                                        {`${tipo?.insu_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                        </InputContainer>
                        <InputContainer>
                            <HintInput></HintInput>
                            <HintInput>Motivos de Incidencia</HintInput>
                            <SelectOption id='optionMotivo'
                                // name="incidenceName"
                                {...register("selectMotivo", {
                                })}
                                control={control}
                            >
                                <option value="">--seleccione--</option>
                                {motivosIncidencia?.map((tipo, index) => (
                                    <option key={index} value={tipo?.inmo_id} >
                                        {`${tipo?.inmo_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                        </InputContainer>
                        <InputContainer>
                            <HintInput>Lugar de Incidencia</HintInput>
                            <SelectOption id='optionLugar'
                                {...register("selectLugar", {
                                })}
                                control={control}
                            >
                                <option value="">--seleccione--</option>
                                {lugarIncidencia?.map((tipo, index) => (
                                    <option key={index} value={tipo?.pade_cadena} >
                                        {`${tipo?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                        </InputContainer>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                            <span>Agregar evidencia</span>
                            <input
                                type="file"
                                className="btn btn-sm btn-secondary bg-gradient"
                            />
                        </div>
                        <InputContainer>
                            <HintInput>Detalle de la Incidencia</HintInput>
                            <textarea
                                {...register("detalle")}
                                control={control}
                                placeholder="Detalle la incidencia"
                            >
                            </textarea>
                        </InputContainer>
                    </div>
                </IncidenceFormContainer>
            </Form>
            <FooterButton>
                <input className="btn btn-sm btn-primary bg-gradient"
                    role="button" type="submit" form="formNew" value="Guardar">
                </input>
                <button className="btn btn-sm btn-danger bg-gradient">
                    Cancelar
                </button>
            </FooterButton>
        </Container>
    )

}