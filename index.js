const { Deta } = require("deta");
const express = require("express");
const {
  verifyKeyMiddleware,
  InteractionType,
  InteractionResponseType,
} = require("discord-interactions");
const { getCommands } = require("./utils/getCommands.js");
const commands = getCommands();

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
  await db.update(
    {
      clicks: db.util.increment(1),
    },
    req.params.id
  );
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
      const command = commands.find(
        (c) =>
          c.name === message.data.name.toLowerCase() ||
          c.name + "-dev" === message.data.name.toLowerCase()
      );
      if (command) {
        res.send(await command.execute(message));
      }
    }
  }
);

module.exports = app;
