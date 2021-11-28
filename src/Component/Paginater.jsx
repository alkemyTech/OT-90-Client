import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../static/styles/Paginater.css'

function Paginater({
  itemsPerPage, allItems, pagin, paginate, actualPage, setPaginate,
}) {
  const pageNumbers = []
  const [numbers, setNumber] = useState([])

  const nextPage = (e) => {
    e.preventDefault()
    if (allItems.length > paginate + 9) { setPaginate(paginate + 9) }
  }
  const prevPage = (e) => {
    e.preventDefault()
    if (paginate > 0) { setPaginate(paginate - 9) }
  }

  useEffect(() => {
    for (let i = 0; i < Math.ceil(allItems.length / itemsPerPage) - 1; i += 1) {
      pageNumbers.push(i)
    }
    setNumber(pageNumbers)
  }, [allItems])
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
  itemsPerPage: PropTypes.number.isRequired,
  allItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagin: PropTypes.number.isRequired,
  paginate: PropTypes.number.isRequired,
  actualPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPaginate: PropTypes.func.isRequired,
}

export default Paginater
