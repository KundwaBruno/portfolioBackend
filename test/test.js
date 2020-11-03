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
    it('It should save an article in the database with all fields Entered' , (done) => {
      let article = {
        title : "testingTitle",
        description : 'testing lorem ipsum....',
        image : 'image_Path',
      }
      chai.request(server).post('/articles').send(article).end( (err,res) => {
        res.body.title.should.eql("testingTitle");
        res.body.description.should.eql("testing lorem ipsum....");
        res.body.image.should.eql("image_Path");
        done();
      });
    });


    //Testing creating a user
    it('It should save a user in the database with all fields Entered' , (done) => {
      let user = {
        firstname : "testing",
        secondname : 'testing',
        email : 'email@gmail.com',
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

     //Testing Delete route
  it('Should delete one article' , (done) => {
    let articleId = '5f9b1f115605d85872fa577f';
    chai.request(server).delete('/articles/' + articleId).end( (err,res) => {
      res.body.message.should.eql('Article deleted successfully');
      done();
    })
  });



});

  
