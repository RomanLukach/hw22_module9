import { faker } from "@faker-js/faker"
import '@bahmutov/cy-api'
const users = require("../../fixtures/users.json");
let boxKey;
const boxNameBackSpace = '';
const boxNameAlphaNumericbackspace = 'test 123';

// Positive
describe('AS-30 Create Box Name (backspace 1 symbol)', () => {
  let cookie_connect_sid;
  it('login', () => {
    cy.api({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: users.user1.email,
        password: users.user1.password
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    cy.getCookie('connect.sid').then((cook) => {
      cookie_connect_sid = (`${cook.name}=${cook.value}`)
      })
    })

  it('AS-27 Box Creation - Key', () => { 
    cy.api({ 
      url: '/api/box/key',
      failOnStatusCode: false,
      method: 'GET',
      headers: {
        Cookie: cookie_connect_sid
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      }).then(({body}) =>
      boxKey = body
      );
    })

  it('AS-27 Box Creation', () => {
    cy.api({
      url: '/api/box',
      failOnStatusCode: false,
      method: 'POST',
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        email: null,
        name: boxNameBackSpace,
        key: boxKey,
        picture: null,
        usePost: false,
        useCashLimit: null,
        cashLimit: null,
        cashLimitCurrency: null,
        useWish: null,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: null,
        useNames: null,
        isPhoneRequired: false,
        logo: null,
        },
      }).then((response) => {
        expect(response.status).to.equal(400);
        })
      });

  it('logout', () => {
    cy.api({
      url: '/api/logout',
      method: 'GET',        
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        password: users.user1.newpassword
        }
    }).then((responce) => {
      expect(responce.status).to.equal(200);
    })
    })
})

describe('AS-32 Create Box (name - alphanumeric and backspace)', () => {
  let cookie_connect_sid;
  it('login', () => {
    cy.api({ 
      url: '/api/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        email: users.user1.email,
        password: users.user1.password
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    cy.getCookie('connect.sid').then((cook) => {
      cookie_connect_sid = (`${cook.name}=${cook.value}`)
      })
    })

  it('AS-27 Box Creation - Key', () => { 
    cy.api({ 
      url: '/api/box/key',
      failOnStatusCode: false,
      method: 'GET',
      headers: {
        Cookie: cookie_connect_sid
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      }).then(({body}) =>
      boxKey = body
      );
    })

  it('AS-27 Box Creation', () => {
    cy.api({
      url: '/api/box',
      failOnStatusCode: false,
      method: 'POST',
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        email: null,
        name: boxNameAlphaNumericbackspace,
        key: boxKey,
        picture: null,
        usePost: false,
        useCashLimit: null,
        cashLimit: null,
        cashLimitCurrency: null,
        useWish: null,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: null,
        useNames: null,
        isPhoneRequired: false,
        logo: null,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        })
    });

  it('logout', () => {
    cy.api({
      url: '/api/logout',
      method: 'GET',        
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        password: users.user1.newpassword
        }
    }).then((responce) => {
      expect(responce.status).to.equal(200);
    })
    })
  })