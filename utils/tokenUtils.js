import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  return jwt.sign(payload, 'secret', {
    expiresIn: '24h',
  });
};

const validateToken = (token) => {
  if (token) {
    const verification = jwt.verify(token, 'secret', (err, data) => {
      if (data) {
        return { data: data, };
      }
      if (err) {
        return { error: err,};
      }
      // console.log( "error: ", err, "data:", data)
    });
    //console.log("verificacion: ", verification);
    return verification;
  }
};

export { generateToken, validateToken };