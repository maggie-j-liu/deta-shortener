import { getCommandsData } from "../utils/getCommands.js";
import { guildId } from "./config.js";
import register from "./register.js";

const commands = getCommandsData();

for (const command of commands) {
  command.name += "-dev";
}

register(
  `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
  Object.values(commands)
);
