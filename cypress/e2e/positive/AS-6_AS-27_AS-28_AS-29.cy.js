import { faker } from "@faker-js/faker"
import '@bahmutov/cy-api'
const users = require("../../fixtures/users.json");
const box = require("../../fixtures/boxData.json")
let boxKey;
const boxName = faker.name.jobArea();

// Positive
describe('AS-6 Site login & password change', () => {
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
  it('password change to new password API', () => {
    cy.api({ 
      url: '/api/account/password',
      failOnStatusCode: false,
      method: 'PUT',
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        password: users.user1.newpassword
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    })
  it('password change to initial password API', () => {
    cy.api({ 
      url: '/api/account/password',
      failOnStatusCode: false,
      method: 'PUT',
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        password: users.user1.password
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    })

  it('logout', () => {
    cy.api({
      url: '/api/logout',
      failOnStatusCode: false,
      method: 'GET',        
      headers: {
        Cookies: cookie_connect_sid
        },
      body: {
        password: users.user1.password
        }
      }).then((responce) => {
        expect(responce.status).to.equal(200);
      })
    })
  })

describe('AS-27 Box Creation & AS-28 Box adjustment & AS-29 Delete Box', () => {
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
        name: boxName,
        key: boxKey,
        picture: box.box1.picture,
        usePost: box.box1.usePost,
        useCashLimit: box.box1.useCashLimit,
        cashLimit: box.box1.cashLimit,
        cashLimitCurrency: box.box1.cashLimitCurrency,
        useWish: box.box1.useWish,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: null,
        useNames: box.box1.useNames,
        isPhoneRequired: box.box1.isPhoneRequired,
        logo: null,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        }).then((response) => {
        expect(response.body.box.picture).to.contain('gift');
        expect(response.body.box.useCashLimit).to.be.true;
        expect(response.body.box.cashLimit).to.equal(1);
        expect(response.body.box.cashLimitCurrency).to.contain('rub');
      });
    });

  it('AS-28 Box adjustment', () => {
    cy.api({
      url: '/api/box',
      failOnStatusCode: false,
      method: 'PUT',
      headers: {
        Cookie: cookie_connect_sid
        },
      body: {
        email: null,
        name: boxName,
        key: boxKey,
        picture: box.box2.picture,
        usePost: box.box1.usePost,
        useCashLimit: box.box2.useCashLimit,
        cashLimit: box.box2.cashLimit,
        cashLimitCurrency: box.box2.cashLimitCurrency,
        useWish: box.box2.useWish,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: null,
        useNames: box.box2.useNames,
        isPhoneRequired: box.box1.isPhoneRequired,
        logo: null,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.box.picture).to.contain('cup_one');
        expect(response.body.box.useCashLimit).to.be.true;;
        expect(response.body.box.cashLimit).to.equal(1000);
        expect(response.body.box.cashLimitCurrency).to.contain('eur');
      })
    });

  it('AS-29 Delete Box', () => { 
    cy.api({ 
      url: '/api/box/'+boxKey,
      failOnStatusCode: false,
      method: 'DELETE',
      headers: {
        Cookie: cookie_connect_sid
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      }).then(({body}) =>
        boxKey = body,
      );
    })

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