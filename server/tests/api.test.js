const axios = require("axios");

const organisation = require("../data");

const url = `http://localhost:3050/employees`;

describe("Get all employees", () => {
  it("should return the total employees", async () => {
    const response = await axios.get(url);
    expect(response.status).toEqual(200);
    expect(response.data.results).toEqual(organisation);
  });
});
