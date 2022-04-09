import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import LeaderboadModel from '../models/leaderboardModel';
import homeMatchs from '../utils/mocks/homeMatchs';
import leaderboardHome from '../utils/mocks/leaderboardHome';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing /leaderboard/home route', () => {
  let chaiHttpResponse: Response;
  describe('return leaderboard with success', () => {

    before(() => {
      sinon.stub(LeaderboadModel, 'createLeaderboardModel').resolves(homeMatchs);
    })

    after(() => {
      (LeaderboadModel.createLeaderboardModel as sinon.SinonStub).restore();
    })

    it('When is success', async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/leaderboard/home')
      .set('content-type', 'application/json');

      console.log(chaiHttpResponse.body);
      console.log(chaiHttpResponse.body.homeMatch);
      
      
      expect(chaiHttpResponse).status(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardHome)
    })
  })
})