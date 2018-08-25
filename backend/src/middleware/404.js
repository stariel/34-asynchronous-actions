'use strict';

export default (req,res) => {
  let error = {error:'Resource Not Found'};
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.send( JSON.stringify(error) );
};