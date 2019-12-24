import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
jest.mock('./services/blogs')
//jest.mock('./services/login')
import App from './App'


describe('<App />', () => {

    test('if no user logged, blogs are not rendered', async () => {
        let component
        act(() => {
            component = render(
                <App />
            )
        })
        await waitForElement(() =>
            component.getByText('Login')
        )
        expect(component.container).toHaveTextContent('Login')
        expect(component.container).not.toHaveTextContent('Blogs')

    })

    /*
    test('if user is logged, blogs are redered', async() => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

        const f = component.container.querySelector('.loginForm')
        const pw = f.querySelector('input[name="Password')
        const u = f.querySelector('input[name="Username')
        const b = f.querySelector('button')
        const mockHandler = jest.fn()
        pw.value = 'password'
        u.value = user.username
        fireEvent.click(b)

        component.debug()
        expect(mockHandler.mock.calls.length).toBe(1)
        await waitForElement(() =>
            component.getByText('Blogs')
        )
        expect(localStorage.getItem('loggedBlogAppUser')).toEqual(JSON.stringify(user))
        expect(component.container).toHaveTextContent('Blogs')
    })*/
})