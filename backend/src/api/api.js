'use strict';

import express from 'express';
import Album from '../models/albums.js';
import Band from '../models/bands.js';
const router = express.Router();

router.get('/albums', (req,res) => {
  Album
    .find()
    .populate('band')
    .exec()
    .then(albums => res.send(albums))
    .catch(err => res.sendStatus(err));
});

router.get('/albums/:id', (req,res,next) => {
  Album
    .findById(req.params.id)
    .populate('band')
    .exec()
    .then( albums => res.send(albums) )
    .catch( next );
});

router.post('/albums', express.json(), (req, res) => {
  Album
    .create(req.body)
    .then(album => res.send(album))
    .catch(err => res.send(err));
});

router.put('/albums', (req, res, next) => {
  Album
    .findByIdAndUpdate(req.params.id, req.body)
    .then( albums => res.send(albums) )
    .catch( next );
});

router.delete('/albums/:id', (req, res) => {
  Album
    .findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/bands', (req,res) => {
  Band
    .find()
    .then(Bands => res.send(Bands))
    .catch(err => res.sendStatus(err));
});

router.get('/bands/:id', (req,res,next) => {
  Band
    .findById(req.params.id)
    .then( Bands => res.send(Bands) )
    .catch( next );
});

router.post('/bands', express.json(), (req, res) => {
  Band
    .create(req.body)
    .then(Band => res.send(Band))
    .catch(err => res.send(err));
});

router.put('/bands', (req, res, next) => {
  Band
    .findByIdAndUpdate(req.params.id, req.body)
    .then( Bands => res.send(Bands) )
    .catch( next );
});

router.delete('/bands/:id', (req, res) => {
  Band
    .findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

export default router;