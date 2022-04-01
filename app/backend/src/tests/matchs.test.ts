import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import inProgressTrue from '../utils/mocks/inProgressTrue';
import inProgressFalse from '../utils/mocks/inProgressFalse';
import User from '../database/models/Users';
import Match from '../database/models/Matchs';
import allMatchs from '../utils/mocks/allMatchs';


chai.use(chaiHttp);

const { expect } = chai;

describe('/matchs route success', () => {
  let chaiHttpResponse: Response;
  describe('return a list of matchs with success', () => {

    it('When is success', async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/matchs')
      .set('content-type', 'application/json');

      expect(chaiHttpResponse.body.slice(1, 7)).to.deep.equal(allMatchs);
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('return a list of matchs by query string in progress when is false', async () => {

    it('When is success', async () => {

      chaiHttpResponse = await chai.request(app)
      .get('/matchs')
      .set('content-type', 'application/json')
      .query({ inProgress: false });

      expect(chaiHttpResponse.body.slice(0, 2)).to.be.deep.equal(inProgressFalse);
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('return a list of matchs by query string in progress when is true', async () => {

    it('When is success', async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/matchs')
      .set('content-type', 'application/json')
      .query({ inProgress: true });

      expect(chaiHttpResponse.body.slice(0, 2)).to.be.deep.equal(inProgressTrue);
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('return a list of matchs by query string in progress when is false', () => {
    it('When is success', async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/matchs')
      .set('content-type', 'application/json')
      .query({ inProgress: false });

      expect(chaiHttpResponse.body.slice(0, 2)).to.be.deep.equal(inProgressFalse);
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
//   describe('It\'s possible to save a match with inProgress status equal to true', async () => {

//     chaiHttpResponse = await chai.request(app)
//     .post('/matchs')
//     .set('content-type', 'application/json')
//     .set({
//       homeTeam: 16,
//       awayTeam: 8,
//       homeTeamGoals: 2,
//       awayTeamGoals: 2,
//       inProgress: true
//     });


//     it('When is success', () => {
//       expect(chaiHttpResponse).to.be.an('object');
//       expect(chaiHttpResponse).status(201);
//       expect(chaiHttpResponse.body.homeTeam).to.equal(1);
//       expect(chaiHttpResponse.body.homeTeamGoals).to.equal(16);
//       expect(chaiHttpResponse.body.awayTeam).to.equal(8);
//       expect(chaiHttpResponse.body.awayTeamGoals).to.equal(2);
//       expect(chaiHttpResponse.body.inProgress).to.equal(true);
//     })
//   })
  
//   describe('It\'s not possible to save a match when is insert the same code for both clubs', async () => {

//       chaiHttpResponse = await chai.request(app)
//     .post('/matchs')
//     .set('content-type', 'application/json')
//     .send({
//       homeTeam: 16,
//       awayTeam: 16,
//       homeTeamGoals: 2,
//       awayTeamGoals: 2,
//       inProgress: true
//     });


//     it('When is success', () => {
//       expect(chaiHttpResponse.body).status(401);
//       expect(chaiHttpResponse.body).to.be('It is not possible to create a match with two equal teams');
//     })
//   })

//   describe('It\'s not possible to save a match that doesn\'t exist in database', async () => {

//     chaiHttpResponse = await chai.request(app)
//     .post('/matchs')
//     .set('content-type', 'application/json')
//     .send({
//       homeTeam: 513,
//       awayTeam: 16,
//       homeTeamGoals: 2,
//       awayTeamGoals: 2,
//       inProgress: true
//     });

    
//     it('When is success', () => {
//       expect(chaiHttpResponse.body).status(401);
//       expect(chaiHttpResponse.body).to.be('There is no team with such id!');
//     });
//   })
// })

// describe('Save matchs in /matchs/:id/finish route with inProgress as false value', () => {
//   let chaiHttpResponse: Response;
//   let loginResponse: Response;

//   before( async () => {
//     sinon.stub(User, 'findOne').resolves({id: 5, username: 'juninho', role: 'dev', email: 'tidev@hacker.com', password: 'cachorro'} as User)
//     loginResponse = await chai.request(app).post('/login').send({ email: 'tidev@hacker.com', password: 'cachorro'});

//     const { token } = loginResponse.body;

//     chaiHttpResponse = await chai.request(app)
//   .patch('/matchs/49/finish')
//   .set('content-type', 'application/json')
//   .set('authorization', token);

//   });

//   after(() => {
//     (User.findOne as sinon.SinonStub).restore();
//   });

 


//   it('When is success', () => {
//     expect(chaiHttpResponse.body).status(200);
//     expect(chaiHttpResponse.body).to.be.empty;
//   })
// })

// describe('routes /matchs:id', () => {
//   let chaiHttpResponse: Response;

//   before( async () => {
//     sinon.stub(Match, 'create').resolves({ id: 500, homeTeam: 2, homeTeamGoals: 6, awayTeam: 7, awayTeamGoals: 9, inProgress: true} as Match);
//   })

//   after(() => {
//     (User.create as sinon.SinonStub).restore()
//   })
//     describe('It\'s possible to update matchs in progress', () => {

//     before( async () => {
//       sinon.stub(Match, 'create').resolves({ id: 500, homeTeam: 2, homeTeamGoals: 6, awayTeam: 7, awayTeamGoals: 9, inProgress: false} as Match);
//       chaiHttpResponse = await chai.request(app)
//       .patch('/matchs/500')
//       .set('content-type', 'application/json')
//       .send({ homeTeamGoals: 3, awayTeamGoals: 1});
//     })

//     after(() => {
//       (User.create as sinon.SinonStub).restore()
//     })

//     it('is possible update number of goals while match is in progress', () => {
//       expect(chaiHttpResponse.body.homeTeamGoals).to.be.equal(3);
//       expect(chaiHttpResponse.body.awayTeamGoals).to.be.equal(1);
//       expect(chaiHttpResponse).status(200);
//     })
//   });
//   describe('It\'s possible to finish matchs', () => {
//     before(async () => {
//       chaiHttpResponse = await chai.request(app)
//     .patch('/matchs/500')
//     .set('content-type', 'application/json');
//     })

//     it('When is success', () => {
//       expect(chaiHttpResponse.body.inProgress).to.be.equal(true);
//       expect(chaiHttpResponse).status(200);
//     })
//   })
})
