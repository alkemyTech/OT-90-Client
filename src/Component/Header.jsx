import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'

export default function Header() {
  const [publicData, setPublicData] = useState(null)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((data) => setPublicData(data))
      .catch((error) => error)
  }, [])
  return (
    <>
      {publicData && (
        <>
          {/* this would be the logo */}
          <img src={publicData.sprites.front_default} alt={publicData.name} />    
            <NavBar/>
        </>
      )}
      <div>
        <input type="button" value="Login" />
        <input type="button" value="Registrarse" />
      </div>
    </>
  )
}
