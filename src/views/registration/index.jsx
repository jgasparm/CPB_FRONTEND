import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAllAgrressorPersons, setCurrentAgrressorPersons } from "../../app/features/aggressorPerson/agrressorPerson";
import { setAllAttackendPersons } from "../../app/features/attackendPerson/attackendPerson";
import ModalAggressorPerson from "../../components/modals/modalAggressorPerson";
import ModalAggressorStaff from "../../components/modals/modalAggressorStaff";
import ModalAttackendPerson from "../../components/modals/modalAttackendPerson";
import AggressorPersonRow from "../../components/Tables/aggressorPersonRow";
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
    const dispacth = useDispatch();
    const attackendPersonCurrent = useSelector(state => state.attackendPerson?.currentAttackendPersons);
    const agrressorPersonCurrent = useSelector(state => state.agrressorPerson?.currentAgrressorPersons);

    console.log(attackendPersonCurrent);
    const { handleSubmit, register, control, formState: { errors } } = useForm({});
    const [modalAttackend, setmodalAttackend] = useState(false);
    const [typeQuerie, settypeQuerie] = useState(0);
    const [available, setAvailable] = useState(false);
    const [modalAggressor, setmodalAggressor] = useState(false);
    const [modalAggressorStaff, setmodalAggressorStaff] = useState(false);
    const [selectAgrressor, setSelectAgrressor] = useState(0);
    const [attackedPerson, setAttackedPerson] = useState([
        // {
        //     id: "1",
        //     name: "Edwin Enrique",
        //     lastname: "Torres Rojas",
        //     level: "Seundaria",
        //     grade: "Cuarto"
        // }
    ]);
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
    const [tiposIncidencias, setTiposIncidencias] = useState([
        {
            "pade_cadena": "1",
            "pade_descripcion": "Física"
        },
        {
            "pade_cadena": "2",
            "pade_descripcion": "Psicológica"
        },
        {
            "pade_cadena": "3",
            "pade_descripcion": "Sexual"
        }
    ]);
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
    const [lugarIncidencia, setLugarIncidencia] = useState([
        {
            "pade_cadena": "1",
            "pade_descripcion": "Patio principal"
        },
        {
            "pade_cadena": "2",
            "pade_descripcion": "En el aula"
        },
        {
            "pade_cadena": "2",
            "pade_descripcion": "En el baño"
        }
    ]);

    const handleModalAttackend = (e) => {
        e.preventDefault();
        dispacth(setAllAttackendPersons(null));
        settypeQuerie(1);
        setmodalAttackend(true);
    };
    const handleModalAgrressor = (e) => {
        e.preventDefault();
        if (selectAgrressor == 1) {       
            dispacth(setAllAgrressorPersons(null));
            setmodalAggressorStaff(true)
        } else if (selectAgrressor == 2) {
            dispacth(setAllAttackendPersons(null));
            dispacth(setAllAgrressorPersons(null));
            setmodalAggressor(true)
        }
    };
    const handleSelectModal = (payload) => {
        setSelectAgrressor(payload)
        dispacth(setCurrentAgrressorPersons(null));
    }
    const onSubmit = async (data) => {
        console.log(data);
        const params = "ac_inci_origen=" + 1 + "&ai_alum_id=" + attackendPersonCurrent[0]?.alum_id + "&ac_inci_tipo=" + data.selectTipo +
            "&ai_insu_id=" + data.selectSubTipo + "&ai_inmo_id=" + data.selectMotivo + "&ac_inci_lugar=" + data.selectLugar +
            "&av_inci_evidencia=" + "NuevaEvidencia" +
            "&av_inci_detalle=" + data.detalle + "&ai_inci_usuario_registro=" + 1;
        await axios("http://localhost:80/wsCodeigniterCPB/wsRegistraIncidencia.php?" + params + "", {
            mode: "cors",
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=utf-8"
            },
        }).then(async (res) => {
            console.log(res);
            agrressorPersonCurrent.forEach(async (agrressor) => {
                const params = "ai_inci_id=" + res.data[0]?.inci_id + "&ai_peie_id=" + agrressor?.peie_id + "&ai_alum_id=" +
                    (agrressor?.alum_id || "") + "&ai_inag_usuario_registro=" + 1;

                await axios("http://localhost:80/wsCodeigniterCPB/wsRegistraIncidenciaAgresor.php?" + params + "", {
                    mode: "cors",
                    method: 'POST',
                    headers: {
                        "Accept": "application/json;charset=utf-8"
                    }
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <ModalAttackendPerson
                modalAttackend={modalAttackend}
                setmodalAttackend={setmodalAttackend}
                typeQuerie={typeQuerie}
                setAvailable={setAvailable}
            />
            <ModalAggressorPerson
                modalAggressor={modalAggressor}
                setmodalAggressor={setmodalAggressor}
            />
            <ModalAggressorStaff
                modalAggressorStaff={modalAggressorStaff}
                setModalAggressorStaff={setmodalAggressorStaff}
            />
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
                                    // name="incidenceName"
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
        </>
    );
};

export default Registration;
