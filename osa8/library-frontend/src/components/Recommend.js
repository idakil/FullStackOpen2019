
import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'

const BOOKS_BY_GENRE = gql`

  query allBooks($genre: String)  {
      allBooks(genre: $genre){
        title,
        published,
        author{name},
        id,
        genres
      }
  }

`

const Recommendations = (props) => {
    const [books, setBooks] = useState([])
    const client = props.client

    useEffect(() => {
        if (props.token) {
            const userString = localStorage.getItem('user')
            const user = JSON.parse(userString)
            const booksByGenre = async () => {
                const favoriteGenre = user.favoriteGenre
                const data = await client.query({
                    query: BOOKS_BY_GENRE,
                    variables: { genre: favoriteGenre }
                })
                if (!data.loading) {
                    setBooks(data.data.allBooks)
                }
            }
            booksByGenre()
        }
    }, [props.token])
    if (!props.show) {
        return null
    }


    return (
        <div>
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
        </div>
    )
}

export default Recommendations