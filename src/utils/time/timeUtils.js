function parseTimeToMs(timeStr) {
  if (typeof timeStr !== 'string') {
    throw new Error('Time must be a string like "15m", "1d", etc.');
  }

  const match = timeStr.match(/^(\d+)([smhd])$/); // e.g., 15m, 1d
  if (!match) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }
  
  const value = parseInt(match[1], 10);
  const unit = match[2];

  const unitToMs = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * unitToMs[unit];
}

function getExpiryTime(tokenExipirationTime) {
  const newExpiryTime = new Date(Date.now() + parseTimeToMs(tokenExipirationTime));
  return newExpiryTime
}

module.exports = {parseTimeToMs, getExpiryTime}