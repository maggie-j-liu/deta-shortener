module.exports = {
  name: "delete",
  description: "Deletes a created short link.",
  options: [
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to delete.",
      required: true,
    },
  ],
  execute: async (message) => {
    const { InteractionResponseType } = require("discord-interactions");
    const getUserId = require("../utils/getUserId.js");
    const resolveRoute = require("../utils/resolveRoute.js");
    const db = require("../utils/database.js");
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
    if (link.userId !== getUserId(message)) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "You can only delete links that were created by you.",
        },
      };
    }
    await db.delete(key);
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Successfully deleted ${process.env.DOMAIN}/${key}.`,
      },
    };
  },
};
