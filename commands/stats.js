module.exports = {
  name: "stats",
  description: "Get statistics about a short link.",
  options: [
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to get stats for.",
      required: true,
    },
  ],
  execute: async (message) => {
    const { InteractionResponseType } = require("discord-interactions");
    const resolveRoute = require("../utils/resolveRoute");
    const db = require("../utils/database");
    const route = message.data.options.find(
      (opt) => opt.name === "route"
    ).value;
    const key = resolveRoute(route);
    const link = await db.get(key);
    if (link === null) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `The short link ${process.env.DOMAIN}/${key} doesn't exist.`,
        },
      };
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `The short link <${process.env.DOMAIN}/${key}> was created by <@${link.userId}> and has been visited ${link.clicks} times.`,
        allowed_mentions: {
          parse: [],
        },
      },
    };
  },
};
