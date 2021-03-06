import React, { useState, useEffect } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!props.books.loading)
      setBooks(props.books.data.allBooks)
  }, [props.books])

  if (props.books.loading) {
    return <div>loading</div>
  }
  if (!props.show) {
    return null
  }

  const distinctGenres = () => {
    const genres = books.map(book => book.genres).flat()
    return [...new Set(genres)]
  }

  const filterGenres = (genre) => {
    let filtered = []
    books.forEach(book => {
      book.genres.forEach(g => {
        if (genre === g)
          filtered.push(book)
      })
    })
    setBooks(filtered)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        distinctGenres().map(genre =>
          <button key={genre} onClick={() => filterGenres(genre)}>{genre}</button>)
      }

    </div>
  )
}

export default Books