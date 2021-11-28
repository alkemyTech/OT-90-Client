import React from 'react'
import PropTypes from 'prop-types'
import '../static/styles/Paginater.css'

function Paginater({
  allItems, pagin, paginate, actualPage, setPaginate, numbers,
}) {
  const nextPage = (e) => {
    e.preventDefault()
    if (allItems.length > paginate + 9) { setPaginate(paginate + 9) }
  }
  const prevPage = (e) => {
    e.preventDefault()
    if (paginate > 0) { setPaginate(paginate - 9) }
  }

  return (
    <>
      <nav className="paginationNav">
        {(paginate / 9 + 1) > 1 ? <button className="paginationBtn" type="submit" onClick={prevPage}> Previous</button> : <button className="paginationBtn" type="submit" onClick={prevPage} disabled> Previous</button>}

        <ul className="paginationUl">
          {
          numbers.map((number) => (
            <a
              href="#0"
              onClick={() => pagin(number * 9)}
              className="paginationA"
            >
              {number + 1}
            </a>
          ))
        }
        </ul>

        {actualPage && actualPage.length > 8 ? <button className="paginationBtn" type="submit" onClick={nextPage}> Next</button> : <button className="paginationBtn" type="submit" onClick={nextPage} disabled> Next</button>}
      </nav>
    </>
  )
}

Paginater.propTypes = {
  allItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagin: PropTypes.number.isRequired,
  paginate: PropTypes.number.isRequired,
  actualPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaginate: PropTypes.func.isRequired,
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Paginater
