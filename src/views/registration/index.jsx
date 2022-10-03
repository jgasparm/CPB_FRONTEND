import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { allPlacesApi, allTypesIncidencesApi } from "../../api";
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from "../../app/features/aggressorPerson/agrressorPerson";
import { setAllAttackendPersons, setAllCpbBitacoraAttackendPersons } from "../../app/features/attackendPerson/attackendPerson";
import ModalAggressorPerson from "../../components/modals/modalAggressorPerson";
import ModalAggressorStaff from "../../components/modals/modalAggressorStaff";
import ModalAttackendPerson from "../../components/modals/modalAttackendPerson";
import AggressorPersonRow from "../../components/Tables/aggressorPersonRow";
import AggressorPersonStaffRow from "../../components/Tables/aggressorPersonStaffRow";
import AttackendPersonRow from "../../components/Tables/attackendPersonRow";
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
import "./tableRegistration.scss";
const Registration = () => {
    const dispatch = useDispatch();
    const attackendPersonCurrent = useSelector(state => state.attackendPerson?.currentAttackendPersons);
    const agrressorPersonCurrent = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);
    
    const { handleSubmit, register, control, formState: { errors } } = useForm({});

    // ENVIO DE TIPO DE BITACORA AL MODALES DE AGRESORES
    const bitacoraAggressor= 1;

    const [modalAttackend, setmodalAttackend] = useState(false);
    const [typeQuerie, settypeQuerie] = useState(0);
    const [available, setAvailable] = useState(false);
    // setAvailable(true);
    const [modalAggressor, setmodalAggressor] = useState(false);
    const [modalAggressorStaff, setmodalAggressorStaff] = useState(false);
    const [selectAgrressor, setSelectAgrressor] = useState(2);
    const [selectCheck, setSelectCheck] = useState(true);

    const [subTiposIncidencias, setSubTiposIncidencias] = useState([
        {
            "insu_id": "1",
            "insu_descripcion": "Con lesiones"
        },
        {
            "insu_id": "2",
            "insu_descripcion": "Sin lesiones"
        },
        {
            "insu_id": "3",
            "insu_descripcion": "Castigo físico"
        }
    ]);
    const [tiposIncidencias, setTiposIncidencias] = useState(null);
    const [lugarIncidencia, setLugarIncidencia] = useState();

    // LIMPIAR DATA DE AGRESORES BUSCADOS Y SELECCIONADOS
    // useEffect( () => {
    //     dispatch(setAllAgrressorPersons(null));
    //     dispatch(setCurrentAgrressorPersons(null));
    // },[]);

    useEffect( () => {
        let promise1 = allTypesIncidencesApi();
        promise1.then((res) => {
            setTiposIncidencias(res);
        });
        let promise2 = allPlacesApi();
        promise2.then((res) => {
            setLugarIncidencia(res);
        });
        // ACA ME QUEDE <========>

    },[]);

    const [motivosIncidencia, setMotivosIncidencia] = useState([
        {
            "inmo_id": "1",
            "inmo_descripcion": "Sin motivo alguno, solo por molestar o por burla..."
        },
        {
            "inmo_id": "2",
            "inmo_descripcion": "Por su forma de hablar o expresarse"
        },
        {
            "inmo_id": "3",
            "inmo_descripcion": "Por su ritmo o estilo de aprendizaje"
        }
    ]);

    const handleModalAttackend = (e) => {
        e.preventDefault();
        dispatch(setAllAttackendPersons(null));
        settypeQuerie(1);
        setmodalAttackend(true);
    };
    const handleModalAgrressor = (e) => {
        e.preventDefault();
        if (selectAgrressor == 1) {       
            dispatch(setAllAgrressorPersons(null));
            setmodalAggressorStaff(true)
        } else if (selectAgrressor == 2) {
            dispatch(setAllAttackendPersons(null));
            dispatch(setAllAgrressorPersons(null));
            setmodalAggressor(true)
        }
    };
    const handleSelectModal = (payload) => {
        setSelectAgrressor(payload)
        setSelectCheck(!selectCheck)
        dispatch(setCurrentAgrressorPersons(null));
    }
    const onSubmit = async (data) => {
        console.log(data);
        const params = "ac_inci_origen=" + selectAgrressor + "&ai_alum_id=" + attackendPersonCurrent[0]?.alum_id + "&ac_inci_tipo=" + data.selectTipo +
            "&ai_insu_id=" + data.selectSubTipo + "&ai_inmo_id=" + data.selectMotivo + "&ac_inci_lugar=" + data.selectLugar +
            "&av_inci_evidencia=" + "NuevaEvidencia" +
            "&av_inci_detalle=" + data.detalle + "&ai_inci_usuario_registro=" + 1;

        await axios("http://localhost:8080/wsCodeigniterCPB/wsRegistraIncidencia.php?" + params + "", {
            mode: "cors",
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=utf-8"
            },
        }).then(async (res) => {
            agrressorPersonCurrent.forEach(async (agrressor) => {
                const params = "ai_inci_id=" + res.data[0]?.inci_id + "&ai_peie_id=" + agrressor?.peie_id + "&ai_alum_id=" +
                    (agrressor?.alum_id || "") + "&ai_inag_usuario_registro=" + 1;

                await axios("http://localhost:8080/wsCodeigniterCPB/wsRegistraIncidenciaAgresor.php?" + params + "", {
                    mode: "cors",
                    method: 'POST',
                    headers: {
                        "Accept": "application/json;charset=utf-8"
                    }
                }).then((res) => {
                    console.log(res);
                    dispatch(setAllCpbBitacoraAttackendPersons(res.data));
                    notify("Se guardó satisfactoriamente la información ingresada");
                }).catch((err) => {
                    console.log(err);
                    notifError("Se presentó un error al guardar la información. Comuníquese por favor con el administrador de la plataforma");
                });
            });
        }).catch((err) => {
            console.log(err);
            notifError("Se presentó un error al guardar la información. Comuníquese por favor con el administrador de la plataforma");
        });
    }
    const notify = (text) =>
        toast.success(text, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    const notifError = (text) =>
        toast.error(text, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    return (
        <>  
            <ToastContainer/>
            <ModalAttackendPerson
                modalAttackend={modalAttackend}
                setmodalAttackend={setmodalAttackend}
                typeQuerie={typeQuerie}
                setAvailable={setAvailable} 
            />
            <ModalAggressorPerson
                modalAggressor={modalAggressor}
                setmodalAggressor={setmodalAggressor} typeBitacora={bitacoraAggressor}
            />
            <ModalAggressorStaff
                modalAggressorStaff={modalAggressorStaff}
                setModalAggressorStaff={setmodalAggressorStaff} typeBitacora={bitacoraAggressor}
            />
            <Container>
                <Form id="formNew" onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="text-center mb-5">Registro de incidencia</h4>
                    <IncidenceFormContainer>
                        <div className="d-flex flex-wrap gap-3">
                            <span className="fw-semibold">Origen de incidencia:</span>
                            <div>
                                <input type="radio"
                                    name="radAgrressor"
                                    id="radpersonal"
                                    onClick={() => handleSelectModal(1)}
                                    defaultChecked={!selectCheck}
                                />
                                <label htmlFor="radpersonal">Personal IE a escolares </label>
                            </div>
                            <div>
                                <input type="radio"
                                    name="radAgrressor"
                                    id="radescolares"
                                    onClick={() => handleSelectModal(2)}
                                    defaultChecked={selectCheck}
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
                                        <div className="attribute-title-direction">Turno</div>
                                        <div className="attribute-title-direction">Nivel</div>
                                        <div className="attribute-title-direction">Grado</div>
                                        <div className="attribute-title-direction">Sección</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    {attackendPersonCurrent?.map((person, index) => (
                                        <AttackendPersonRow
                                            key={index}
                                            id={person?.alum_id}
                                            name={person?.alum_nombres}
                                            lastname={person?.alum_apellidos}
                                            turno={person?.turno_descripcion}
                                            level={person?.nivel_descripcion}
                                            grade={person?.grado_descripcion}
                                            section={person?.seccion_descripcion}
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
                                    {selectAgrressor === 2 ? (
                                        <li className="item-direction item-container-direction">
                                        <div className="attribute-title-direction">Nombres</div>
                                        <div className="attribute-title-direction">Apellidos</div>
                                        <div className="attribute-title-direction">Nivel</div>
                                        <div className="attribute-title-direction">Grado</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    ) : (
                                        <li className="item-direction item-container-direction">
                                        <div className="attribute-title-direction">Nombres</div>
                                        <div className="attribute-title-direction">Apellidos</div>                                        
                                        <div className="attribute-title-direction">Puesto</div>
                                        <div className="attribute-title-direction">Acciones</div>
                                    </li>
                                    )}
                                    
                                    {selectAgrressor === 1 ? (
                                        agrressorPersonCurrent?.map((person, index) => (
                                            <AggressorPersonStaffRow
                                                key={index}
                                                id={person?.peie_id}
                                                name={person?.peie_nombres || ""}
                                                lastname={person?.peie_apellidos || ""}
                                                tipoPersonal={person?.tipo_personal_ie_descripcion || ""}
                                                setAvailable={setAvailable}
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
                                                    level={person?.nivel_descripcion}
                                                    grade={person?.grado_descripcion}
                                                    setAvailable={setAvailable}
                                                />
                                            ))
                                        )
                                    )}

                                </ol>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            <InputContainer>
                                <HintInput>Tipo de Incidencia *</HintInput>
                                <SelectOption id='selectTipo'
                                    // name="incidenceName"
                                    {...register("selectTipo", {
                                        required: "required"
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
                                {errors.selectTipo && <span className='text-danger' role="alert">Campo requerido</span>}
                            </InputContainer>
                            <InputContainer>
                                <HintInput>Subtipo de Incidencia *</HintInput>
                                <SelectOption id='selectSubTipo'
                                    // name="incidenceName"
                                    {...register("selectSubTipo", {
                                        required: "required"
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
                                {errors.selectSubTipo && <span className='text-danger' role="alert">Campo requerido</span>}
                            </InputContainer>
                            <InputContainer>
                                <HintInput></HintInput>
                                <HintInput>Motivos de Incidencia *</HintInput>
                                <SelectOption id='selectMotivo'
                                    // name="incidenceName"
                                    {...register("selectMotivo", {
                                        required: "required"
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
                                {errors.selectMotivo && <span className='text-danger' role="alert">Campo requerido</span>}
                            </InputContainer>
                            <InputContainer>
                                <HintInput>Lugar de Incidencia *</HintInput>
                                <SelectOption id='selectLugar'
                                    // name="incidenceName"
                                    {...register("selectLugar", {
                                        required: "required"
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
                                {errors.selectLugar && <span className='text-danger' role="alert">Campo requerido</span>}
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
                                <HintInput>Detalle de la Incidencia (opcional)</HintInput>
                                <textarea maxLength="300"
                                    {...register("detalle", {
                                        required: "required"
                                    })}
                                    control={control}
                                    placeholder="Detalle la incidencia"
                                >
                                </textarea>
                                {errors.detalle && <span className='text-danger' role="alert">Campo requerido</span>}
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
        </>
    );
};

export default Registration;
