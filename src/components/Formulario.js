import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

        // Crear State de Citas
        const[cita, actualizarCita] = useState({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
        const [error, actualizarError] = useState(false)

        //Funcion que se ejecuta cada vez que el usuario escribe en un input
        const actualizarState = e => {
            actualizarCita({
                ...cita,
                [e.target.name] : e.target.value
            })
        }

        //Extraer valores
        const {mascota, propietario, fecha, hora, sintomas} = cita;

        // Cuando el usuario preciona agregar cita
        const submitCita = e => {
            e.preventDefault();


            // Validar 
            if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
                actualizarError(true)
                return;
            }

            // Eliminar el mensaje previo
            actualizarError(false);

            // Asignar una ID
            cita.id = uuid();

            // Crear la cita 
            crearCita(cita);


            // Reiniciar el form
            actualizarCita({
                mascota: '',
                propietario: '',
                fecha: '',
                hora: '',
                sintomas: ''
            })
        }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios*</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Descripción de síntomas</label>
                    <textarea 
                    className ="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                    ></textarea>
            
                    <button
                    type="submit"
                    className="u-full-width button-primary"
                    >Agregar cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
    
}
 
export default Formulario;