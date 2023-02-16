const organisation = require("./data");

const getEmployees = async (req, res) => {
  try {
    return res.send({ results: organisation });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e.message);
  }
};

module.exports = getEmployees;
