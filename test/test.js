import chai  from 'chai'
import server from '../server.js'
import chaiHttp from 'chai-http'
import mocha from 'mocha'

let should = chai.should();

chai.use(chaiHttp);

const { expect } = chai;

describe('REST API', () => {

    //Testing getting all articles
    it('it should GET all the articles', (done) => {
      chai.request(server)
          .get('/articles')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            done();
          });
    });

    //Testing all Users
    it('it should Get all the users' , (done) => {
      chai.request(server).get('/users').end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.not.eql(0);
      done();
      });
    });

    //Testing creating an article
    it('It should save a user in the database with all fields Entered' , (done) => {
      let user = {
        firstname : "testing",
        secondname : 'testing',
        email : 'email@gmail.com',
        password : 'password123'
      }
      chai.request(server).post('/users').send(user).end( (err,res) => {
        res.body.firstname.should.eql("testing");
        res.body.secondname.should.eql("testing");
        res.body.email.should.eql("email@gmail.com");
        res.body.password.should.eql("password123");
        done();
      });
    });


    //Testing gettin a specific article
    it('it should GET a specific article', (done) => {
      let articleId = '5f95c37afda3bd0017ff8489';
      chai.request(server)
          .get('/articles/' + articleId)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });


    //Testing UPDATE route
    it('Should update an article' , (done) => {
      let articleId = '5f95c37afda3bd0017ff8489';
      let updateInfo = {
        title : 'Updated Title'
      }
      chai.request(server).patch('/articles/' + articleId).send(updateInfo).end( (err,res) => {
        res.should.have.status(200);
        res.body.message.should.eql('Article updated successfully');
        done();
      })

    })


});
