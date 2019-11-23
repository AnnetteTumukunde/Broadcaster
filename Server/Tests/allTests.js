import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../index';

chai.use(chaiHttp);
dotenv.config();

const payload = {
    id: 1,
    firstname: 'one',
    lastname: 'one',
    email: 'one@gmail.com',
    phoneNumber: '0247384034',
    password: 'one123456',
    type: 'user',
};
const token = jwt.sign(payload, process.env.PRIVATE_KEY);

describe('App running test', () => {
    it('Tests if app is listening the port', (done) => {
        chai.request(app).get('/api/v1').end((err, res) => {
            expect(res.body.status).to.be.a('number');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equals('Welcome to the Broadcaster');
            done();
        });
    });
});

describe('Signup test', () => {
    it('Tests if new user can signup', (done) => {
        chai.request(app).post('/api/v1/auth/signup')
            .send({ firstname: 'one', lastname: 'one', email: 'one@gmail.com', phoneNumber: '0247384034', password: 'one123456', type: 'user' })
            .end((err, res) => {
                expect(res.status).to.equals(201);
                expect(res.body.status).to.be.a('number');
                expect(res.body.message).to.equals('User created successfully');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});

describe('Signin test', () => {
    it('Tests if user can signin', (done) => {
        chai.request(app).post('/api/v1/auth/signin')
            .send({ email: 'one@gmail.com', password: 'one123456' })
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.equals(200);
                expect(res.body.message).to.equals('User is successfully logged in');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});

describe('Add record test', () => {
    it('Tests if possible to add a record', (done) => {
        chai.request(app).post('/api/v1/incident').set('access-token', token)
            .send({ title: 'Flooding', type: 'Intervention', comment: 'Development', status: 'Under investigation', author: 1, location: 'Ghana' })
            .end((err, res) => {
                expect(res.status).to.equals(201);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('Fetch records test', () => {
    it('Tests if possible to see all records', (done) => {
        chai.request(app).get('/api/v1/incidents').set('access-token', token)
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('Fetch specific record test', () => {
    it('Tests if possible to see one record', (done) => {
        chai.request(app).get('/api/v1/incidents/1').set('access-token', token)
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});

describe('Edit location test', () => {
    it('Tests if possible to edit the location of record', (done) => {
        chai.request(app).patch('/api/v1/incidents/1/Ghana').set('access-token', token)
            .send({ location: 'Uganda' })
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('Edit comment test', () => {
    it('Tests if possible to edit the comment of a record', (done) => {
        chai.request(app).patch('/api/v1/incident/1/Development').set('access-token', token)
            .send({ comment: 'African Development' })
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});

describe('Delete record test', () => {
    it('Tests if possible to delete the record', (done) => {
        chai.request(app).delete('/api/v1/incidents/1').set('access-token', token)
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body.status).to.be.a('number');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
});