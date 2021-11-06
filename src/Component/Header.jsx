import React, { useState, useEffect } from 'react'

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
          {/* this would be the items */}
          <ul>
            {publicData.abilities.map(({ ability }) => <li key={ability.name}>{ability.name}</li>)}
          </ul>
        </>
      )}
      <div>
        <input type="button" value="Login" />
        <input type="button" value="Registrarse" />
      </div>
    </>
  )
}
