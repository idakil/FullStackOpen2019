import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import EditForm from './components/EditAuthor'
import Recommendations from './components/Recommend'

import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    author {
      name
    }
    published
    id
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name,
    born,
    id,
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int, $author: String, $genres: [String]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
   ...BookDetails
  }
}
${BOOK_DETAILS}
`
/**
 *  title
    published
    genres
    author{
      name
    }
 */
const SET_BORN = gql`
mutation editAuthor($name: String, $born: Int) {
  editAuthor(
    name: $name,
    born: $born,
  ) {
    name
    born
  }
}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
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
const BOOK_ADDED = gql`  
  subscription {   
    bookAdded {     
      ...BookDetails    
    }  
  }  ${BOOK_DETAILS}
`

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const logged = localStorage.getItem('user-token')
    if(logged)
      setToken(logged)
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      const dataInStore = client.readQuery({ query: ALL_BOOKS })
      if (!dataInStore.allBooks.map(p => p.id).includes(addedBook.id)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInStore.allBooks.concat(addedBook) }
        })
      }
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: BOOKS_BY_GENRE }, { query: ALL_AUTHORS }],
  })
  const [editAuthor] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')} style={{ display: (token === null ? 'block' : 'none') }}>login</button>
        <button onClick={() => setPage('edit')} style={{ display: (token === null ? 'none' : 'block') }}>edit</button>
        <button onClick={() => setPage('add')} style={{ display: (token === null ? 'none' : 'block') }}>add book</button>
        <button onClick={() => setPage('recommendations')} style={{ display: (token === null ? 'none' : 'block') }}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      {errorNotification()}

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <EditForm
        show={page === 'edit'}
        setBorn={editAuthor}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        newBook={addBook}
      />

      <LoginForm
        login={login}
        setToken={(token) => setToken(token)}
        show={page === 'login'}
        client={client}

      />

      <Recommendations
        show={page === 'recommendations'}
        client={client}
        token={token}
      />

    </div>
  )
}

export default App