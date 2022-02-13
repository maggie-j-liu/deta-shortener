module.exports = {
  name: "hi",
  description: "Say hi.",
  execute: () => {
    const { InteractionResponseType } = require("discord-interactions");
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "hi",
      },
    };
  },
};
