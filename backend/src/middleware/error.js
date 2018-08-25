'use strict';

export default  (err,req,res) => {
  let error = {error:err};
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.send( JSON.stringify(error) );
};