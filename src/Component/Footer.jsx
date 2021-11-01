import '../static/styles/Footer.css'

import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'

const fetchSocialMedia = [
  {
    url:"#",
    text: 'Facebook'
  },
  {
    url:"#",
    text: 'Instagram'
  },
  {
    url:"#",
    text: 'Twitter'
  }
]

function Footer() {
  const [publicData, setPublicData] = useState(1)
    useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((data) => setPublicData(data))
      .catch((error) => console.log(error))
      }, [publicData])

  return (
  <div className="main-footer">
    <div className="container">
      <div className="row">
        {/* Column1 LOGO */}
        <div className="col">
          <h4>Somos Más</h4>
          {publicData != 1 ? <img src={publicData.sprites.front_default} alt={publicData.name} /> : null }       
        </div>
        {/* Column2 NAV*/}
        <div className="col">
          <h4>Links</h4>
          <ui className="list-unstyled">
            {publicData != 1 ? publicData.abilities.map(({ ability }, index) => {
              return <li key={index}> <Link href="#">{ability.name}</Link></li>                   
            }) : null }
          </ui>
        </div>
        {/* Column3 Social */}
        <div className="col">
          <h4>Social Media</h4>
          <ui className="list-unstyled">
              {fetchSocialMedia.length > 0 ? fetchSocialMedia.map((oneSocial,i) => {
                return <li key={i}><a href={oneSocial.url}>{oneSocial.text}</a></li>
              } ) : null}
          </ui>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer

