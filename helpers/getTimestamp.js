const getUnix = (date) => {
  return Date.parse(date);
};

const getTimestamp = (inDateFormat, date) => {
  const dateObj = new Date(date);
  if(inDateFormat === true){
    return {
      unix: getUnix(date),
      utc: dateObj.toUTCString()
    }
  }
  return {
    unix: date,
    utc: dateObj.toUTCString()
  }
}
module.exports = {
  getTimestamp
};
