import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'

export default function Header() {
  const [publicData, setPublicData] = useState(null)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((data) => setPublicData(data))
      .catch((error) => error)
  }, [])

  const user = useSelector(selectUser).isAuthenticated

  return (
    <>
      {publicData && (
        <>
          <img src={publicData.sprites.front_default} alt={publicData.name} />    
        </>
      )}
      <div>
      <NavBar/>
      <nav>
          {user.isAuthenticated === true ? 
          <button type="button" class="btn btn-outline-secondary"><Link to='/logout' >Cerrar Sesion</Link></button>
          : null}
          {user.isAuthenticated === false ? 
          <><button type="button" class="btn btn-outline-info"><Link to='/login' >Login</Link></button>
          <button type="button" class="btn btn-outline-info"><Link to='/register' >Registro</Link></button></> 
          : null}
    </nav>    
      </div>
    </>
  )
}
