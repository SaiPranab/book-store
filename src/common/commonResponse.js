// const successReponse = (res, status, success, message, data ) => {
//   return res.status(status).json({
//     data,
//     success,
//     message,
//     timeStamp: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata'})
//   })
// }

// const failureReponse = (res, status, success, title, details ) => {
//   return res.status(status).json({
//     data,
//     success,
//     title,
//     details,
//     timeStamp: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata'})
//   })
// }

const commonResponse = (res, status, success, data, title, details) => {
  const responseBody = { 
    data,
    success
  }

  if(!success) {
    responseBody.title = title;
    responseBody.details = details;
  }

  responseBody.timeStamp = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata'});

  return res.status(status).json(responseBody);
}
module.exports = commonResponse;