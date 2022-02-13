const createShortLink = async (body) => {
  const { nanoid } = require("nanoid");
  const db = require("./database.js");
  if (!body.url) {
    return { error: "Must specify an url." };
  }

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

module.exports = createShortLink;
