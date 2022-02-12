const { Deta } = require("deta");
const express = require("express");
const { nanoid } = require("nanoid");
const {
  verifyKeyMiddleware,
  InteractionType,
  InteractionResponseType,
} = require("discord-interactions");
const commands = require("./commands.js");
const { getName, createShortLink } = require("./utils.js");

const app = express();
const linksRoute = express.Router();
linksRoute.use(express.json());

const deta = new Deta();
const db = deta.Base("links");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/:id*?", async (req, res) => {
  const item = await db.get(req.params.id);
  if (item === null) {
    res.send("Not found");
    return;
  }
  res.redirect(307, item.url);
});

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async (req, res) => {
    const message = req.body;
    if (message.type === InteractionType.PING) {
      res.send({
        type: InteractionResponseType.PONG,
      });
    } else if (message.type === InteractionType.APPLICATION_COMMAND) {
      console.log(message);
      switch (message.data.name.toLowerCase()) {
        case getName(commands.HI_COMMAND):
        case getName(commands.HI_COMMAND) + "-dev":
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "hi",
            },
          });
          break;
        case getName(commands.ADD_LINK_COMMAND):
        case getName(commands.ADD_LINK_COMMAND) + "-dev":
          const response = await createShortLink({
            url: message.data.options.find((opt) => opt.name === "url").value,
          });
          let content;
          if (response.error) {
            content = `Error: ${response.error}`;
          } else {
            content = `Linked ${response.url} to <https://src.ink/${response.slug}>`;
          }
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content,
            },
          });
          break;
      }
    }
  }
);

// linksRoute.post("/", async (req, res) => {
//   if (req.body.slug) {
//     try {
//       await db.insert({
//         key: req.body.slug,
//         url: req.body.url,
//       });
//       res.send({ url: req.body.url, slug: req.body.slug });
//       return;
//     } catch (e) {
//       res.status(400).send({ error: "Url already taken." });
//       return;
//     }
//   }
//   while (true) {
//     let key = nanoid(6);
//     try {
//       await db.insert({
//         key,
//         url: req.body.url,
//       });
//       res.send({ url: req.body.url, slug: key });
//       return;
//     } catch (e) {}
//   }
// });

// app.use("/add", linksRoute);

module.exports = app;
