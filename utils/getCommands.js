const fs = require("fs");
const path = require("path");
const getCommands = () => {
  const commands = [];
  const files = fs
    .readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".js"));
  for (const file of files) {
    const command = require(`../commands/${file}`);
    commands.push(command);
  }
  return commands;
};

const getCommandsData = () => {
  const commands = getCommands();
  for (const command of commands) {
    delete command.execute;
  }
  return commands;
};

module.exports = {
  getCommands,
  getCommandsData,
};
