const {
  InteractionResponseType,
  InteractionResponseFlags,
} = require("discord-interactions");
const createShortLink = require("../utils/createShortLink.js");
const getUserId = require("../utils/getUserId.js");

module.exports = {
  name: "shorten",
  description: "Create a short link.",
  options: [
    {
      name: "url",
      description: "The long url you would like to shorten.",
      type: 3, // STRING
      required: true,
    },
    {
      name: "route",
      type: 3,
      description: "The route of the short URL you want to use.",
    },
  ],
  execute: async (message) => {
    const url = message.data.options.find((opt) => opt.name === "url").value;
    const route = message.data.options.find(
      (opt) => opt.name === "route"
    )?.value;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Please specify a valid url.",
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      };
    }
    const userId = getUserId(message);
    const response = await createShortLink({
      url,
      slug: route,
      userId,
    });
    let content;
    if (response.error) {
      content = `Error: ${response.error}`;
    } else {
      content = `Linked ${url} to <${process.env.DOMAIN}/${response.slug}>`;
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content,
      },
    };
  },
};
