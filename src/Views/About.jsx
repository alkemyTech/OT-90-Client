import '../static/styles/About.css'

import Container from 'react-bootstrap/Container'
import React from 'react'

export default function About() {
    return (
      <Container>
        <h1 className='titleh1'>Nosotros</h1>
        <p>Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás,
        abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de
        inserción social. Uniendo las manos de todas las familias, las que viven en el barrio
        y las que viven fuera de él, es que podemos pensar, crear y garantizar estos
        procesos. Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de dar alimento a las familias del barrio. 
        </p> 
        <p>Con el tiempo fuimos
        involucrándonos con la comunidad y agrandando y mejorando nuestra capacidad
        de trabajo. Hoy somos un centro comunitario que acompaña a más de 700
        personas a través de las áreas de: Educación, deportes, primera infancia, salud,
        alimentación y trabajo social.
        </p>
        <h2 className='titleh2'>Visión</h2>
        <p>Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en el
        barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la
        educación, salud, trabajo, deporte, responsabilidad y compromiso.
        </p>
        <h2 className='titleh2'>Misión</h2>
        <p>Trabajar articuladamente con los distintos aspectos de la vida de las familias,
        generando espacios de desarrollo personal y familiar, brindando herramientas que
        logren mejorar la calidad de vida a través de su propio esfuerzo.
        </p>
        <h3 className='titleh3'>Fundadores</h3>
        <h5>María Irola - Presidenta</h5>
        <p>María estudió economía y se especializó en economía para el desarrollo. Comenzó
        como voluntaria en la fundación y fue quien promovió el crecimiento y la
        organización de la institución acompañando la transformación de un simple
        comedor barrial al centro comunitario de atención integral que es hoy en día.
        </p>
        <h5>Marita Gomez - Fundadora</h5>
        <p>Marita estudió la carrera de nutrición y se especializó en nutrición infantil. Toda la
        vida fue voluntaria en distintos espacios en el barrio hasta que decidió abrirse un
        comedor propio. Comenzó trabajando con 5 familias y culminó su trabajo
        transformando Somos Más en la organización que es hoy.
        </p>
        <h3 >Colaboradores</h3>
        <ul>
            <li>Miriam Rodriguez - Terapista Ocupacional</li>
            <li>Cecilia Mendez - Psicopedagoga</li>
            <li>Mario Fuentes - Psicólogo</li>
            <li>Rodrigo Fuente - Contador</li>
            <li>Maria Garcia - Profesora de Artes Dramáticas</li>
            <li>Marco Fernandez - Profesor de Educación Física</li>           
        </ul>       
      </Container>
    )
}