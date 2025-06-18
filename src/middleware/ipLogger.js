// const ipLogger = (req, res, next) => {
//   // console.log('ip', req.ip);
//   // console.log('ip', req.headers['x-forwarded-for']);
//   // console.log(req.socket.remoteAddress);
  
//   if(req.method !== 'POST') return next()
  
//   const clientIp = req.socket.remoteAddress;
//   req.clientIp = clientIp;
//   next()
// }

// module.exports = ipLogger

const ipLogger = (randomValue) => {

  return (req, res, next) => {
    console.log('value', randomValue);
    
    const clientIp = req.socket.remoteAddress;
    req.clientIp = clientIp;
    next()
  }
}

module.exports = ipLogger;