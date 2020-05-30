describe('Test Crewing Crm Tests', function() {
    beforeEach(function() {
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear()
        })
        cy.clearCookies();
        cy.getCookies().should('be.empty')
        cy.visit(Cypress.env('baseUrl'))
    })

    it('Opens login page and checks its contents, checks buttons and checkboxes, logins with correct credential', function() {
        cy.checkPageAndLogIn({ username: Cypress.env('userName'), password: 'admin' });
    })

    it('Opens login page and tries to login with incorrect username', function() {
        cy.server()
        cy.route('POST', Cypress.env('baseUrl') + '/api/login').as('submit')
        cy.checkPageAndLogIn({ username: Cypress.env('wrongUserName'), password: Cypress.env('password') });
        cy.wait('@submit').should((xhr) => {
            expect(xhr.status).to.eq(400)
            expect(xhr.responseBody).to.have.property('message', 'The user name or password is incorrect.')
            cy.get('span').should('have.text', ' The user name or password is incorrect. ')
            cy.get('span').should('have.css', 'color', 'rgb(220, 53, 69)')

        })
    })

    it('Opens login page and tries to login with incorrect passwords', function() {
        cy.server()
        cy.route('POST', Cypress.env('baseUrl') + '/api/login').as('submit')
        cy.checkPageAndLogIn({ username: Cypress.env('userName'), password: Cypress.env('wrongPassword') });
        cy.wait('@submit').should((xhr) => {
            expect(xhr.status).to.eq(400)
            expect(xhr.responseBody).to.have.property('message', 'The user name or password is incorrect.')
            cy.get('span').should('have.text', ' The user name or password is incorrect. ')
            cy.get('span').should('have.css', 'color', 'rgb(220, 53, 69)')
        })


    })

    // it('Opens login page and checks', function() {
    //     cy.server()
    //     cy.route('POST', Cypress.env('baseUrl') + '/api/login').as('api-login')
    //     cy.route('GET', Cypress.env('baseUrl') + '/api/info').as('api-info')
    //     cy.route('GET', Cypress.env('baseUrl') + '/api/dashboard/contracts-chart').as('contracts-chart')
    //     cy.checkPageAndLogIn({ username: Cypress.env('userName'), password: Cypress.env('password') });
    //     cy.wait('@api-login').should((xhr) => {
    //         cy.wait('@api-info').should((xhr) => {
    //             cy.wait('@contracts-chart').should((xhr) => {
    //                 expect(xhr.status).to.eq(200)
    //                 cy.get(':nth-child(1) > .ui-menuitem-link > .ui-menuitem-text').should('have.text', 'Sailors')
    //                 cy.get('.ui-megamenu-root-list > :nth-child(2) > .ui-menuitem-link > .ui-menuitem-text').should('have.text', 'Planning')
    //                 cy.get(':nth-child(3) > [href="#"] > .ui-menuitem-text').should('have.text', 'Reports')
    //                 cy.get(':nth-child(4) > [href="#"] > .ui-menuitem-text').should('have.text', 'Catalogs')
    //                 cy.get(':nth-child(5) > [href="#"] > .ui-menuitem-text').should('have.text', 'Utils')
    //                 cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.attr', 'placeholder', 'Search sailors')
    //                 cy.get('.ui-autocomplete > .ng-tns-c15-0').type('Test')
    //                 cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.value', 'Test')
    //                 cy.get('.ui-autocomplete > .ng-tns-c15-0').clear()
    //                 cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.value', '')
    //                 cy.get('.breadcrumb-item > .text-white').should('have.text', 'Home')
    //             })
    //         })
    //     })
    // })

    it('Logs in, goes to \'Flags\', adds Flag, searches for an added Flag in list, edits found Flag, deletes added Flag, searches for a deleted Flag and receives valid response', function() {
        cy.server()
        cy.route('POST', Cypress.env('baseUrl') + '/api/login').as('api-login')
        cy.route('GET', Cypress.env('baseUrl') + '/api/info').as('api-info')
        cy.route('GET', Cypress.env('baseUrl') + '/api/dashboard/contracts-chart').as('contracts-chart')
        cy.checkPageAndLogIn({ username: Cypress.env('userName'), password: Cypress.env('password') });
        cy.wait('@api-login').should((xhr) => {
            cy.wait('@api-info').should((xhr) => {
                expect(xhr.status).to.eq(200)
                cy.contains('Catalogs').should('exist')
                cy.contains('Catalogs').click({ force: true })
                cy.contains('Flags').should('exist')
                cy.contains('Flags').click({ force: true })
                cy.get('.btn-success').click({ force: true })
                var code = Math.round(Math.random(1) * 99, 0)

                cy.get(':nth-child(1) > label > .form-control').type('Test' + code)
                cy.get(':nth-child(2) > label > .form-control').type(code)
                cy.get('.btn-primary').click({ force: true })
                cy.get(':nth-child(2) > :nth-child(1) > div.ng-star-inserted > .w-100').should('have.value', '')
                cy.get(':nth-child(2) > :nth-child(1) > div.ng-star-inserted > .w-100').type(code)
                cy.get(':nth-child(2) > :nth-child(1) > div.ng-star-inserted > .w-100').type('{enter}')
                cy.get('.mt-2').should('contain.text', 'Showing 1 to')
                cy.get('[title="' + code + '"]').click({ multiple: true })
                cy.get('.btn-danger').click()
                cy.wait(500)
                cy.get('.ng-tns-c21-1 > .d-flex > .btn-primary').should('be.visible')
                cy.get('.ng-tns-c21-1 > .d-flex > .btn-primary').click({ force: true })
                cy.get('.mt-2').should('contain.text', 'Showing 1 to')

            })
        })

    })
})