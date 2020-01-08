
describe('Login testing', () => {
    beforeEach(function(){
        cy.visit('http://localhost:3000')
    })
    it('front page', () => {
        cy.contains('login')
    })
    it('user can login', function() {
        cy.get('input:first').type('ida')
        cy.get('input:last').type('salasana')
        cy.get('[data-cy=login]').click()
        cy.contains('ida logged in')
    })

    it('not working with false credentials', function(){
        cy.get('input:first').type('thisuserdoesnotexist')
        cy.get('input:last').type('jees')
        cy.get('[data-cy=login]').click()
        cy.contains('Sign in page')
    })

    it('user can log out', function(){
        cy.get('input:first').type('ida')
        cy.get('input:last').type('salasana')
        cy.get('[data-cy=login]').click()
        cy.contains('ida logged in')
        cy.contains('logout').click()
        cy.contains('Sign in page')
    })
})

describe('after login', function () {
    beforeEach(function(){
        cy.visit('http://localhost:3000')
        cy.get('input:first').type('ida')
        cy.get('input:last').type('salasana')
        cy.get('[data-cy=login]').click()
        cy.contains('ida logged in')
    })
    
    it('user sees a table with blogs', function(){
        cy.contains('Title')
        cy.contains('Author')
    })

    it('user can go to users page', function(){
        cy.contains('users').click()
        cy.contains('Users')
    })

})

describe('api testing', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')    
        const user = {
            name: 'ida',
            username: 'ida',
            password: 'salasana'
          }
        cy.request('POST', 'http://localhost:3001/api/users/', user)    
        cy.visit('http://localhost:3000')

        cy.get('input:first').type('ida')
        cy.get('input:last').type('salasana')
        cy.get('[data-cy=login]').click()
        cy.contains('ida logged in')

        cy.contains('create').click()
        cy.get('input[name=title]').type('onko ookoo olla ensimmäinen blogi')
        cy.get('input[name=author]').type('ida')
        cy.get('input[name=url]').type('whatislife.com/first')
        cy.get('[data-cy=createBlog]').click()
        cy.contains('onko ookoo olla ensimmäinen blogi')
    })

    it('can create a blog', function(){
        cy.wait(3000) //wait for notification to hide
        cy.contains('create').click()
        cy.get('input[name=title]').type('mietteitä elämästä')
        cy.get('input[name=author]').type('ida')
        cy.get('input[name=url]').type('whatislife.com')
        cy.get('[data-cy=createBlog]').click()
        cy.contains('mietteitä elämästä')
    })

    it('can like a blog', function(){
        cy.wait(3000) //wait for notification to hide
        cy.contains('onko ookoo olla ensimmäinen blogi').click()
        cy.contains('0')
        cy.get('[data-cy=likeButton').click()
        cy.wait(3000) //wait for notification to hide
        cy.contains('1')

    })

})