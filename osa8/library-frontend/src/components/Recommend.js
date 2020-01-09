import React, { useState, useEffect } from 'react'


const Recommendations = (props) => {
    const [books, setBooks] = useState([])
    const client = props.client
    const query = props.query
    const token = props.token

    useEffect(() => {
        if (token) {
            const userString = localStorage.getItem('user')
            const user = JSON.parse(userString)
            const booksByGenre = async () => {
                const favoriteGenre = user.favoriteGenre
                const data = await client.query({
                    query: query,
                    variables: { genre: favoriteGenre }
                })
                if (!data.loading) {
                    setBooks(data.data.allBooks)
                }
            }
            booksByGenre()
        }
    }, [props.show])
    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>books in your favorite genre</h2>
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