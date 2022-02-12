import register from "./register.js";
import commands from "../commands.js";
register(
  `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`,
  Object.values(commands)
);
