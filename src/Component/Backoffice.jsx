import React from 'react'
import PropTypes from 'prop-types'
import {
  FaNewspaper, FaComment, FaUserEdit, FaUsers,
} from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { AiFillPlayCircle } from 'react-icons/ai';
import { RiContactsFill } from 'react-icons/ri';
import { VscOrganization } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../app/userSlice'
import '../static/styles/Backoffice.css'

const application = {
  sucess: true,
  body: [
    {
      app: 'Novedades', permission: 'admin', route: '/news', icon: <FaNewspaper />,
    },
    {
      app: 'Actividades', permission: 'admin', route: '/allactivities', icon: <AiFillPlayCircle />,
    },
    {
      app: 'Categorias', permission: 'admin', route: '/allcategories', icon: <BiCategory />,
    },
    {
      app: 'Contactos', permission: 'admin', route: '/contacts', icon: <RiContactsFill />,
    },
    {
      app: 'Testimonios', permission: 'admin', route: '/alltestimonials', icon: <FaComment />,
    },
    {
      app: 'Usuarios', permission: 'admin', route: '/users', icon: <FaUsers />,
    },
    {
      app: 'Editar Organization', permission: 'admin', route: '/editorganization/1', icon: <VscOrganization />,
    },
    {
      app: 'Editar Perfil', permission: 'standard', route: '/profile', icon: <FaUserEdit />,
    }],
}

export default function Backoffice({ path }) {
  const history = useHistory()
  const { role } = useSelector(selectUser)
  const appsFiltered = role.toLowerCase().trim() === 'admin'
    ? application.body
    : application.body.filter((app) => app.permission.includes(role.toLowerCase().trim()))
  return (
    <Container className="backoffice_container">
      <Row className="row_button my-5">
        <IconContext.Provider value={{ color: 'white', size: '3em' }}>
          {appsFiltered.map((app) => (
            <Col xs={6} md={4} key={app.app}>
              <Button className="w-100 py-md-5 px-2" size="lg" onClick={() => history.push(`${path}${app.route}`)}>
                {app.icon}
                <br />
                {app.app}
              </Button>
            </Col>
          ))}
        </IconContext.Provider>
      </Row>
    </Container>
  )
}

Backoffice.propTypes = {
  path: PropTypes.string.isRequired,
}
