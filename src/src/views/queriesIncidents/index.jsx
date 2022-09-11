import React, { useState } from 'react';
import SeacrhInicidentsRow from '../../components/Tables/searchIncidentsRow';
import { FaSearch } from "react-icons/fa";
import './tablequeriesIncidents.scss';
import { Container, ContentBox, ContentSelect, Form, HintInput, IncidenceFormContainer, Input, SectionSearch, SelectOption } from './style';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllQueryIncidences } from '../../app/features/queryIncidence/queriesIncidence';

const QueriesIncidents = () => {

    const queriesIncidents = useSelector(state => state.queryIncidence?.allQueryIncidences);
    const { handleSubmit, register, control, formState: { errors } } = useForm({})
    const dispacth = useDispatch();
    const [attackendsPerson, setIncidentsPerson] = useState([
        // {
        //     id: "1",
        //     name: "Adrian Diego",
        //     lastname: "Montalvan Nuñez",
        //     level: "Seundaria",
        //     grade: "Cuarto",
        //     typeIncident: "Física",
        //     subTypeIncident: "Con lesiones",
        // },
        // {
        //     id: "2",
        //     name: "Pedro Luis",
        //     lastname: "Flores Torres",
        //     level: "Seundaria",
        //     grade: "Quinto",
        //     typeIncident: "Verbal",
        //     subTypeIncident: "Condición social",
        // }
    ]);

    const onSubmit = async (data) => {
        dispacth(setAllQueryIncidences(null));
        console.log(data);
        const params = "ac_inci_origen=" + data.selectOrigen + "&ac_inci_tipo=" + data.selectTipo + "&ai_insu_id=" + data.selectSubtipo +
            "&ai_inmo_id=" + data.selectMotivo + "&ac_inci_lugar=" + data.selectLugar + "&ac_fecha_inicial=" +
            data.dateInicial + "&ac_fecha_final=" + data.dateFinal;

        await axios("http://localhost:80/wsCodeigniterCPB/wsConsultaIncidencias.php?" + params + "", {
            mode: "cors",
            method: "GET",
            headers: { 
                "Accept": "application/json;charset=utf-8"
            },
        }).then((res) => {
            // console.log(res.data);
            dispacth(setAllQueryIncidences(res.data));
        })

    }
    return (
        <Container>
            <Form id='formConsulta' onSubmit={handleSubmit(onSubmit)}>
                <h4 className="text-center mb-4">Consulta de incidencias</h4>
                <SectionSearch>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Origen de incidencia</HintInput>
                            <SelectOption
                                {...register("selectOrigen")}
                            >
                                <option value="">--seleccione--</option>
                                <option value="1">Personal IE a escolares</option>
                                <option value="2">Entre escolares</option>
                            </SelectOption>
                        </ContentBox>
                    </ContentSelect>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Tipo de incidencia</HintInput>
                            <SelectOption
                                {...register("selectTipo")}
                            >
                                <option value="">--seleccione--</option>
                                <option value="1">Física</option>
                                <option value="2">Psicológica</option>
                                <option value="3">Sexual</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Subtipo de incidencia</HintInput>
                            <SelectOption
                                {...register("selectSubtipo")}
                            >
                                <option value="">--seleccione--</option>
                                <option value="1">Con lesiones</option>
                                <option value="2">Sin lesiones</option>
                                <option value="3">Castigo físico</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Rango inicial</HintInput>
                            <Input type="date"
                                {...register("dateInicial")}
                            ></Input>
                        </ContentBox>
                    </ContentSelect>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Motivo de incidencia</HintInput>
                            <SelectOption
                                {...register("selectMotivo")}
                            >
                                <option value="">--seleccione--</option>
                                <option value="1">Sin motivo alguno, sólo por molestar o por burlarse</option>
                                <option value="2">Por su forma de hablar o expresarse</option>
                                <option value="3">Por su ritmo o estilo de aprendizaje</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Lugar de incidencia</HintInput>
                            <SelectOption
                                {...register("selectLugar")}
                            >
                                <option value="">--seleccione--</option>
                                <option value="1">Patio principal</option>
                                <option value="2">En el aula</option>
                                <option value="3">En el baño</option>
                            </SelectOption>
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Rango final</HintInput>
                            <Input type="date"
                                {...register("dateFinal")}
                            ></Input>
                        </ContentBox>
                    </ContentSelect>
                    <div className='mt-2 d-flex justify-content-end'>
                        <input className='btn btn-sm btn-secondary bg-gradient'
                            form='formConsulta'
                            type='submit'
                            value="Consultar"
                        >
                        </input>
                    </div>
                </SectionSearch>
                <div className="my-3">
                    <div>
                        <span className='fw-semibold'>Agraviados</span>
                        <ol className="collection-incidents collection-container-incidents" style={{ paddingLeft: '0px' }}>
                            <li className="item-incidents item-container-incidents">
                                <div className="attribute-title-incidents">Nombres</div>
                                <div className="attribute-title-incidents">Apellidos</div>
                                <div className="attribute-title-incidents">Nivel</div>
                                <div className="attribute-title-incidents">Grado</div>
                                <div className="attribute-title-incidents">Tipo de incidencia</div>
                                <div className="attribute-title-incidents">Subtipo de incidencia</div>
                                <div className="attribute-title-incidents">Acciones</div>
                            </li>
                            {queriesIncidents?.map((person, index) => (
                                <SeacrhInicidentsRow
                                    key={index}
                                    id={person.inci_id}
                                    name={person?.subtipo_incidencia}
                                    lastname={person?.inci_detalle}
                                    level={person?.level}
                                    grade={person?.origen_descripcion}
                                    typeIncident={person?.lugar_incidencia}
                                    subTypeIncident={person?.tipo_incidencia}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </Form>
        </Container>
    )
}

export default QueriesIncidents;