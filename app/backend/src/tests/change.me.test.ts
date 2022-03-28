import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import generateToken from '../utils/generateToken';
import allClubs from '../utils/mocks/allClubs';
import inProgressTrue from '../utils/mocks/inProgressTrue';
import inProgressFalse from '../utils/mocks/inProgressFalse';

import { Response } from 'superagent';
import allMatchs from '../utils/mocks/allMatchs';

chai.use(chaiHttp);

const { expect } = chai;

const EMAIL_NOT_MATCHED = 'Insert a validate email';
const PASSWORD_LESS_THAN_6 = 'Your password must be great than than 6';
describe('Testing /login', () => {
  let chaiHttpResponse: Response;
  
  describe('Test if\'s not possible to enter with a not validate email', async () => {

    chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'cachorro',
          password: 'senhaDificil'
        } as Users)

    it('Test if it\'s not possible to enter with a not validate email', () => {
      expect(chaiHttpResponse).to.be.equal(EMAIL_NOT_MATCHED);
    });
    it('Test if status is 400', () => {
      expect(chaiHttpResponse).to.be.status(400);
    });
  })
  describe('Test when password is not validate', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'cachorro',
      password: '12345'
    })

    it('Receive a message when password has length less than 6', () => {
      expect(chaiHttpResponse).to.be.equal(PASSWORD_LESS_THAN_6);
    })
  })
});

describe('Testing /login/validate', () => {
  let chaiHttpResponse: Response;

  describe('Test if token is not validate', async () => {
    const user = {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'senhaDificilima',
    };
    const wrongToken = 'token aleatório';

    const mockToken = generateToken(user);
    chaiHttpResponse = await chai.request(app).get('/login/validatez')
    .set('content-type', 'application/json')
    .set('authorization', wrongToken)
    .send({ email: user.email,
    password: user.password });

    it('Test if it\'s not possible to validate with a wrong token', () => {
      expect(mockToken).not.to.be.equal(wrongToken);
    });
    it('Test if status is 401', () => {
      expect(chaiHttpResponse).to.be.status(401);
    });
  });

  describe('Test if token is validate', async () => {
    const user = {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'senhaDificilima',
    };
  
    const mockToken = await generateToken(user);
    chaiHttpResponse = await chai.request(app).get('/login/validatez')
    .set('content-type', 'application/json')
    .set('authorization', mockToken)
    .send({ email: user.email,
    password: user.password });

    it('Test if it\'s not possible to validate with a wrong token', () => {
      expect(chaiHttpResponse).to.be.equal('user');
    });
    it('Test if status is 401', () => {
      expect(chaiHttpResponse).to.be.status(200);
    });
  })
})

describe('Testing /clubs', () => {
  let chaiHttpResponse: Response;
  describe('get all clubs', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs')
    .set('content-type', 'application/json');

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(allClubs);
      expect(chaiHttpResponse).to.have.status(200);
    });
  })

  describe('get a club by id', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/5')
    .set('content-type', 'application/json');

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(allClubs[4]);
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
})

describe('/matchs route', () => {
  let chaiHttpResponse: Response;
  describe('return a list of matchs with success', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matchs')
    .set('content-type', 'application/json');

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(allMatchs);
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('return a list of matchs by query string in progress when is false', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matchs')
    .set('content-type', 'application/json')
    .query({ inProgress: false });

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(allMatchs);
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('return a list of matchs by query string in progress when is true', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matchs')
    .set('content-type', 'application/json')
    .query({ inProgress: true });

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(inProgressTrue);
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('return a list of matchs by query string in progress when is false', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matchs')
    .set('content-type', 'application/json')
    .query({ inProgress: false });

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.equal(inProgressFalse);
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('It\'s possible to save a match with inProgress status equal to true', async () => {
    let chaiHttpResponse: Response;

    chaiHttpResponse = await chai.request(app)
    .post('/matchs')
    .set('content-type', 'application/json')
    .query({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });

    it('When is success', () => {
      expect(chaiHttpResponse).to.be.an('object');
      expect(chaiHttpResponse).status(201);
      expect(chaiHttpResponse.body.homeTeam).to.equal(1);
      expect(chaiHttpResponse.body.homeTeamGoals).to.equal(16);
      expect(chaiHttpResponse.body.awayTeam).to.equal(8);
      expect(chaiHttpResponse.body.awayTeamGoals).to.equal(2);
      expect(chaiHttpResponse.body.inProgress).to.equal(true);
    })
  })
  
  describe('Save matchs in /matchs/:id/finish route with inProgress as false value', async () => {
    let chaiHttpResponse: Response;

    chaiHttpResponse = await chai.request(app)
    .put('/matchs/41/finish')
    .set('content-type', 'application/json');

    chaiHttpResponse = await chai.request(app)
    .get('/matchs')
    .set('content-type', 'application/json')
    .query({ inProgress: false });

    it('When is success', () => {
      expect(chaiHttpResponse).status(201);
      expect(chaiHttpResponse[0].id).to.equal(42);
    })
  })

  describe('It\'s not possible to save a match when is insert the same code for both clubs', async () => {
    let chaiHttpResponse: Response;

    chaiHttpResponse = await chai.request(app)
    .post('/matchs')
    .set('content-type', 'application/json')
    .query({
      "homeTeam": 16,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });

    it('When is success', () => {
      expect(chaiHttpResponse).status(400);
      expect(chaiHttpResponse).to.be('It is not possible to create a match with two equal teams');
    })
  })

  describe('It\'s not possible to save a match that doesn\'t exist in database', async () => {
    let chaiHttpResponse: Response;

    chaiHttpResponse = await chai.request(app)
    .post('/matchs')
    .set('content-type', 'application/json')
    .query({
      "homeTeam": 513,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });

    it('When is success', () => {
      expect(chaiHttpResponse).status(400);
      expect(chaiHttpResponse).to.be('There is no team with such id!');
    });
  })
})
