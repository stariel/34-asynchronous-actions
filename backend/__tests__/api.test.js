'use strict';

import supertest from 'supertest';
import {Mockgoose} from 'mockgoose';
import mongoose from 'mongoose';
import {server}  from '../src/app.js';

import Album from '../src/models/albums.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/albums';

const mockgoose = new Mockgoose(mongoose);

beforeAll((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://127.0.0.1/albums').then(() => {
      done();
    });
  });
});

afterEach((done) => {
  mockgoose.helper.reset().then(done);
});

afterAll((done) => {
  mongoose.disconnect().then(() => {
    console.log('disconnected');
    done();
  }).catch((err) => {
    console.error(err);
    done();
  });
});

describe('api module', () => {

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for albums before database is filled', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      throw(err);
    });

  });

  it('gets a 200 response on an existing model', () => {
    return mockRequest.get(API_URL)
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets a 500 response on an invalid model', () => {
    return mockRequest.get('/api/v1/dogs')
      .then(console.log)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });


  it('handles an invalid get request with a 404', () => {

    return mockRequest.get('/blah')
      .then()
      .catch(res => expect(res.status).toEqual(404));

  });
  it('handles an invalid get request with a 404', () => {

    return mockRequest.get('/api/v1/albums/blah')
      .then()
      .catch(res => expect(res.status).toEqual(404));

  });

  it(' on POST should respond with bad request if no request body was provided', () => {
    return mockRequest.post(API_URL)
      .catch(response => {
        expect(response.statusCode).toEqual(400);
      })
      .catch(console.err);
  });

  it('on POST should respond with bad request if request body was invalid', () => {
    let obj = {};
    return mockRequest.post(API_URL)
      .send(obj)
      .catch(response => {
        expect(response.statusCode).toEqual(400);
      })
      .catch(console.err);
  });

});

describe('album', () => {

  it('should post an album', () => {

    const albumObj = {
      title: 'Antichrist Superstar',
      artist: 'Marilyn Manson',
      releaseYear: 1996,
    };

    return mockRequest
      .post(API_URL)
      .send(albumObj)
      .then(results => {

        try {
          const album = JSON.parse(results.text);
          expect(album.title).toBe(albumObj.title);
          expect(album.artist).toBe(albumObj.artist);
          expect(album.releaseYear).toBe(albumObj.releaseYear);
          expect(album._id).toBeDefined();
        } catch (error) {
          throw(error);
        }
      }).catch(err => console.log(err));
  });

  it('should add to all albums after a post', () => {

    const albumObj = {
      title: 'Lightbulb Sun',
      artist: 'Porcupine Tree',
      releaseYear: 2000,
    };

    return mockRequest
      .post(API_URL)
      .send(albumObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(albums => expect(albums.length).toBe(1))
          .catch(err => console.log(err));
      });

  });

  it('should find one album by id', () => {

    const albumObj = {
      title: 'Superunknown',
      artist: 'Soundgarden',
      releaseYear: 1994,
    };

    return Album.create(albumObj).then(data => {

      return Album.findById(data._id).then(album => {

        expect(album.name).toEqual(albumObj.name);

      }).catch(err => console.log(err));

    }).catch(err => console.log(err));
  });

});
