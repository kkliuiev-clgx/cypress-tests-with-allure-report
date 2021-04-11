describe('Test Crewing Crm Tests', function() {
    beforeEach(function () {
        cy.clearLocalStorage();
        cy.window().then((win) => {
          win.sessionStorage.clear()
        })
        cy.clearCookies();
        cy.getCookies().should('be.empty')
      cy.visit(Cypress.env('baseUrl'))
      })
      
      it('Opens login page and checks its contents, checks buttons and checkboxes', function() {
        cy.get('#mat-input-0').should('have.value', '')
        cy.get('#mat-input-0').should('have.value', '')
        cy.get('.background').should('be.visible')
        cy.get('app-submit-button > .mat-focus-indicator').should('be.disabled')
        cy.get('#mat-input-0').type(Cypress.env('userName'))
        cy.get('#mat-input-1').type(Cypress.env('password'))
        cy.get('button').should('be.enabled')
      })

//       it('Opens login page and tries to login with incorrect username', function() {
//     cy.server()
//   cy.route('POST', Cypress.env('baseUrl')+'/api/login').as('submit')
//     cy.get(':nth-child(1) > .form-control').should('have.value', '')
//     cy.get(':nth-child(2) > .form-control').should('have.value', '')
//     cy.get('.background').should('be.visible')
//     cy.get('.btn').should('be.disabled')
//     cy.get('#remember').should('be.checked')
//     cy.get('#remember').click({force: true})
//     cy.get('#remember').should('not.be.checked')
//     cy.get('.custom-control-label').should('have.text','Remember me')
//     cy.get('.btn').should('be.disabled')
//     cy.get(':nth-child(1) > .form-control').type(Cypress.env('wrongUserName'))
//     cy.get(':nth-child(2) > .form-control').type(Cypress.env('password'))
//     cy.get('.btn').should('be.enabled')
//     cy.get('.btn').click()
//     cy.wait('@submit').should((xhr)=> {
//         expect(xhr.status).to.eq(400)
//         expect(xhr.responseBody).to.have.property('message','The user name or password is incorrect.')
//         cy.get('span').should('have.text',' The user name or password is incorrect. ')
//     cy.get('span').should('have.css', 'color', 'rgb(220, 53, 69)')
//       })

//   })

//   it('Opens login page and checks', function() {
//     cy.server()
//     cy.route('POST', Cypress.env('baseUrl')+'/api/login').as('api-login')
//     cy.route('GET', Cypress.env('baseUrl')+'/api/info').as('api-info')
//     cy.route('GET', Cypress.env('baseUrl')+'/api/dashboard/contracts-chart').as('contracts-chart')
//     cy.get(':nth-child(1) > .form-control').type(Cypress.env('userName'))
//     cy.get(':nth-child(2) > .form-control').type(Cypress.env('password'))
//     cy.get('.btn').click()
//     cy.wait('@api-login').should((xhr)=> {
//         cy.wait('@api-info').should((xhr)=> {
//             cy.wait('@contracts-chart').should((xhr)=> {
//     expect(xhr.status).to.eq(200)
//     cy.get(':nth-child(1) > .ui-menuitem-link > .ui-menuitem-text').should('have.text', 'Sailors')
//     cy.get('.ui-megamenu-root-list > :nth-child(2) > .ui-menuitem-link > .ui-menuitem-text').should('have.text', 'Planning')
//     cy.get(':nth-child(3) > [href="#"] > .ui-menuitem-text').should('have.text', 'Reports')
//     cy.get(':nth-child(4) > [href="#"] > .ui-menuitem-text').should('have.text', 'Catalogs')
//     cy.get(':nth-child(5) > [href="#"] > .ui-menuitem-text').should('have.text', 'Utils')
//     cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.attr', 'placeholder', 'Search sailors')
//     cy.get('.ui-autocomplete > .ng-tns-c15-0').type('Test')
//     cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.value', 'Test')
//     cy.get('.ui-autocomplete > .ng-tns-c15-0').clear()
//     cy.get('.ui-autocomplete > .ng-tns-c15-0').should('have.value', '')
//     cy.get('.breadcrumb-item > .text-white').should('have.text', 'Home')
//     })
// })
//     })
//   })
//     it('Logs in, goes to \'Flags\', adds Flag, searches for an added Flag in list, edits found Flag, deletes added Flag, searches for a deleted Flag and receives valid response', function() {
//     cy.clearLocalStorage();
//     cy.window().then((win) => {
//       win.sessionStorage.clear()
//     })
//     cy.clearCookies();
//     cy.getCookies().should('be.empty')
//     cy.server()
//     cy.route('POST', Cypress.env('baseUrl')+'/api/login').as('api-login')
//     cy.route('GET', Cypress.env('baseUrl')+'/api/info').as('api-info')
//     cy.route('GET', Cypress.env('baseUrl')+'/api/dashboard/contracts-chart').as('contracts-chart')
//     cy.get(':nth-child(1) > .form-control').type(Cypress.env('userName'))
//     cy.get(':nth-child(2) > .form-control').type(Cypress.env('password'))
//     cy.get('.btn').click()
//     cy.wait('@api-login').should((xhr)=> {
//         cy.wait('@api-info').should((xhr)=> {
//             cy.wait('@contracts-chart').should((xhr)=> {
//     expect(xhr.status).to.eq(200)
//   cy.get(':nth-child(1) > .ui-menuitem-link > .ui-menuitem-text').should('be.visible')
//   cy.get(':nth-child(5) > [href="#"] > .ui-menuitem-text').trigger('mousedown')
//   cy.contains('Flags').should('exist')
//   cy.contains('Flags').click({ force: true })
//   cy.get('.btn-success').click()
//   cy.get(':nth-child(1) > label > .form-control').type('Test')
//   cy.get(':nth-child(2) > label > .form-control').type('TST')
//   cy.get('.btn-primary').click()
//   cy.get(':nth-child(1) > .form-group-sm > div.ng-star-inserted > .form-control').type('Test')
//   cy.get(':nth-child(1) > .form-group-sm > div.ng-star-inserted > .form-control').type('{enter}')
//   cy.get('[title="Test"]').click()
//   cy.get('.btn-danger').click()
//   cy.wait(300)
//   cy.get('.modal-footer > .btn-danger').should('be.visible')
//   cy.get('.modal-footer > .btn-danger').click( {force: true})
//   cy.contains('Flags').should('exist')
//   cy.contains('Flags').click({ force: true })
//   cy.get(':nth-child(1) > .form-group-sm > div.ng-star-inserted > .form-control').clear()
//   cy.get(':nth-child(1) > .form-group-sm > div.ng-star-inserted > .form-control').type('Test')
//   cy.get(':nth-child(1) > .form-group-sm > div.ng-star-inserted > .form-control').type('{enter}')
//   cy.get('.text-center > span').should('have.text', 'No data found')
//             })
//         })
//     })
// })
})
