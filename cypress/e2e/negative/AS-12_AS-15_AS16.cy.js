import { faker } from "@faker-js/faker"
import '@bahmutov/cy-api'
const users = require("../../fixtures/users.json");


// Negative
describe('AS-12 Login (no login & correct password)', () => {

  // let wrongpassword = faker.word.adjective( { lenght: {min: 8, min: 20}} )

  it('no login & correct password', () => {
    cy.request({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: '' , 
        password: users.user1.password 
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.contains('validations.invalid')
        expect(response.body.error.errors[0].field).to.contains('email')
      });
    })
  })

describe('AS-15 Login (no login & no password)', () => {

  // let wrongpassword = faker.word.adjective( { lenght: {min: 8, min: 20}} )

  it('no login & no password', () => {
    cy.request({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: '' ,
        password: '' 
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.contains('validations.invalid')
        expect(response.body.error.errors[0].field).to.contains('email')
        expect(response.body.error.errors[1].field).to.contains('password')
      });
    })
  })

describe('AS-16 Login (incorrect login & correct password)', () => {

  // let wrongpassword = faker.word.adjective( { lenght: {min: 8, min: 20}} )

it('incorrect login & correct password', () => {
  cy.request({ 
    url: '/api/login',
    failOnStatusCode: false,
    method: 'POST',
    body: {
      email:  faker.internet.email(),
      password: users.user1.password 
      }
      }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.error.message).to.contains('USER_NOT_FOUND')
      });
    })
  })