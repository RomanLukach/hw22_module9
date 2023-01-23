import { faker } from "@faker-js/faker"
import '@bahmutov/cy-api'
const users = require("../../fixtures/users.json");
const box = require("../../fixtures/boxData.json");
const boxName = faker.name.jobArea();

// Negative
describe('AS-9 Login (correct login & no password)', () => {
  // let wrongpassword = faker.word.adjective( { lenght: {min: 8, min: 20}} )

  it('no login & correct password', () => {
    cy.request({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: ' ',
        password: users.user1.password--
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.contains('validations.invalid');
        expect(response.body.error.errors[0].field).to.contains('email')
      });
    })
})

describe('AS-11 Login (correct login & incorrect password)', () => {
  // let wrongpassword = faker.word.adjective( { lenght: {min: 8, min: 20}} )

  it('no login & correct password', () => {
    cy.request({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: users.user1.email,
        password: users.user1.newpassword
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.contains('INVALID_USERNAME_OR_PASSWORD')
      });
    })
  })