import { guildId } from "./config.js";
import register from "./register.js";
import commands from "../commands.js";

for (const command of Object.values(commands)) {
  command.name += "-dev";
}

register(
  `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
  Object.values(commands)
);
