const getName = (command) => command.name.toLowerCase();

const createShortLink = async (body) => {
  const { nanoid } = require("nanoid");
  if (!body.url) {
    return { error: "Must specify an url." };
  }

  const { Deta } = require("deta");
  const deta = new Deta();
  const db = deta.Base("links");
  if (body.slug) {
    try {
      await db.insert({
        key: body.slug,
        url: body.url,
      });
      return { url: body.url, slug: body.slug };
    } catch (e) {
      return { error: "Url already taken." };
    }
  }
  while (true) {
    let key = nanoid(6);
    try {
      await db.insert({
        key,
        url: body.url,
      });
      return { url: body.url, slug: key };
    } catch (e) {}
  }
};

module.exports = {
  getName,
  createShortLink,
};
