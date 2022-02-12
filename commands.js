module.exports = {
  HI_COMMAND: {
    name: "hi",
    description: "Say hi.",
  },
  ADD_LINK_COMMAND: {
    name: "shorten",
    description: "Create a short link.",
    options: [
      {
        name: "url",
        description: "The url you would like to shorten",
        type: 3, // STRING
        required: true,
      },
    ],
  },
};
