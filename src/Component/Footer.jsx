import '../static/styles/Footer.css'

import React, { useEffect, useReducer } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import sendRequest from '../httpClient'
import logo from '../static/assets/somosMasLogo.png'

const socialMediaIcons = {
  Facebook: (<FaFacebook />),
  Instagram: (<FaInstagram />),
  Linkedin: (<FaLinkedin />),
}

function Footer() {
  const initialState = {
    socialMedia: [],
    isLoading: true,
    publicData: {},
    links: [
      {
        url: '',
        text: 'link 1',
      },
      {
        url: '',
        text: 'link 2',
      },
      {
        url: '',
        text: 'link 3',
      },
    ],
  }

  const reducers = (state, action) => {
    const { type, payload = {} } = action
    const media = []
    switch (type) {
      case 'GET_DATA':
        return {
          isLoading: true,
          publicData: {},
        }
      case 'GET_DATA_OK':
        Object.entries(payload).forEach(([key, value]) => {
          if (key.substring(0, 3) === 'url') {
            media.push({ name: key.slice(3, key.length), url: value })
          }
        })
        return {
          isLoading: false,
          publicData: payload,
          socialMedia: media,
          links: initialState.links,
        }
      case 'ERROR':
        return {
          isLoading: true,
          publicData: {},
        }
      default:
        return state
    }
  }

  const [{
    links, socialMedia, isLoading, publicData,
  }, dispatch] = useReducer(reducers, initialState)

  useEffect(() => {
    const getIcon = async () => {
      try {
        const { data: { body: datas } } = await sendRequest('GET', '/organizations/1/public', null)
        dispatch({ type: 'GET_DATA_OK', payload: datas })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
      }
    }
    getIcon()
  }, [])

  const renderSocialMediaIcon = (socialMedia) => {
    if (socialMediaIcons.hasOwnProperty(socialMedia)) {
      return socialMediaIcons[socialMedia]
    }
  }

  if (isLoading) {
    return <div className="main-footer" />
  }

  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 LOGO */}
          <div className="col">
            <h4>Somos M??s</h4>
            {publicData !== undefined ? (
              <img
                src={logo}
                alt={publicData.name}
              />
            ) : null}
          </div>
          <div className="col">
            <h4>Links</h4>
            <ul className="list-unstyled">
              {links.map((link) => (
                <li key={link.url}>
                  {link.text}
                </li>
              ))}
            </ul>
          </div>
          {/* Column3 Social */}
          <div className="col">
            <h4>Social Media</h4>
            <ul className="list-unstyled">
              {socialMedia.length > 0
                ? socialMedia.map(
                  (oneSocial) => (
                    <li key={oneSocial.url}>
                      <a href={oneSocial.url}>{renderSocialMediaIcon(oneSocial.name)}</a>
                    </li>
                  ),
                )
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
