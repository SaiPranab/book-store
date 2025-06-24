const ipLogger = (randomValue) => {
  return (req, res, next) => {
    console.log('value', randomValue);
    
    const clientIp = req.ip || req.socket?.remoteAddress;
    const userAgent = req.headers['User-Agent'];

    req.clientIp = clientIp;
    req.userAgent = userAgent;

    // console.log('IP:', clientIp);
    // console.log('User-Agent:', userAgent);

    next();
  }
}

module.exports = ipLogger;