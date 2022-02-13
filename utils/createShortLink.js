const createShortLink = async ({ url, slug, userId }) => {
  const { nanoid } = require("nanoid");
  const db = require("./database.js");
  if (!url) {
    return { error: "Must specify an url." };
  }

  if (slug) {
    try {
      await db.insert({
        key: slug,
        url,
        userId,
        clicks: 0,
      });
      return { slug };
    } catch (e) {
      return { error: "Url already taken." };
    }
  }
  while (true) {
    let key = nanoid(6);
    try {
      await db.insert({
        key,
        url,
        userId,
        clicks: 0,
      });
      return { slug: key };
    } catch (e) {}
  }
};

module.exports = createShortLink;
