function checkForValidDate(date) {
  const nonNumRegex = /\D/g.test(date);
  const validDateFormatRegex = /\d{4}\-{1}[0-3]*[0-9]{1}\-{1}[0-3]*[0-9]{1}$/.test(date);
  const validDate = Date.parse(date).toString() !== "NaN";
  return ((validDateFormatRegex === true && validDate == true) || nonNumRegex === false);
}
const getNumHyphens = (arr) => {
  return arr.filter((x) => x === "-").length;
};

module.exports = {
    checkForValidDate,
    getNumHyphens
};
