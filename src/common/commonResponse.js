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
  const response = { 
    data,
    success,
    timeStamp : new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata'})
  }

  if(!success) {
    response.title = title;
    response.details = details;
  }

  return res.status(status).json(response);
}
module.exports = commonResponse;