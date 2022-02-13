const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  name: "hi",
  description: "Say hi.",
  execute: () => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "hi",
      },
    };
  },
};
