// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import { Response } from 'superagent';
// import { app } from '../app';
// import allClubs from '../utils/mocks/allClubs';

// chai.use(chaiHttp);

// const { expect } = chai;
// describe('Testing /clubs/:id', () => {
//   let chaiHttpResponse: Response;
  
//   describe('get a club by id', async () => {

//   chaiHttpResponse = await chai.request(app).get('/clubs/5').set('content-type', 'application/json');

//     it('When is success', () => {
//       expect(chaiHttpResponse.body).to.be.equal(allClubs[4]);
//       expect(chaiHttpResponse).to.have.status(200);
//     })
//   })
// })