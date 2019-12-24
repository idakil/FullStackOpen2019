import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

let component
const user = {
    name: 'user name',
    id: 'user_id'
}
const blog = {
    author: 'author',
    title: 'title',
    likes: 5,
    url: 'urlofmyblog.com',
    user: user
}

beforeEach(() => {

    const handleRemove = () => {
    }
    const handleUpdate = () => {
    }

    component = render(
        <Blog blog={blog} user={user} handleRemove={handleRemove} handleUpdate={handleUpdate} />
    )

})

test('shows more info on click', () => {
    const rootDiv = component.container.querySelector('.blogInfo')
    const div = rootDiv.querySelector('.show')

    expect(component.container).toHaveTextContent(
        'author', 'title', 'urlofmyblog.com'
    )
    const hidingDiv = component.container.querySelector('.showWhenClicked')
    expect(hidingDiv).toHaveStyle('display: none')
    expect(hidingDiv).toHaveTextContent('5')
    fireEvent.click(div)

    expect(hidingDiv).toHaveStyle('display: block')
    expect(hidingDiv).toHaveTextContent(
        '5', 'user name'
    )
})
/*
test('shows remove button only for author', () => {
    const rootDiv = component.container.querySelector('.blogInfo')
    const hidingDiv = rootDiv.querySelector('.showWhenClicked')
    let buttonDiv = hidingDiv.querySelector('.buttonDiv')

    expect(buttonDiv).toHaveStyle('display: block')

    const userThatIsNotAuthor = {
        name: 'not author',
        id: 'wrong id'
    }
    blog.user = userThatIsNotAuthor
    buttonDiv = hidingDiv.querySelector('.buttonDiv')

    expect(buttonDiv).toHaveStyle('display: none')
})*/