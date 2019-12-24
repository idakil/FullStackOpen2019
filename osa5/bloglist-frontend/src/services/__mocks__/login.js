

const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Donald Tester',
    password: 'password'
}

const login = () => {
    return Promise.resolve(user)
}

export default { login }