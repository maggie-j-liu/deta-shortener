const { Deta } = require("deta");
const deta = new Deta();
const db = deta.Base("links");

module.exports = db;
