import { guildId } from "./config.js";
import fetch from "node-fetch";

console.log(process.env.APPLICATION_ID);
const unregister = await fetch(
  `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
  {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`,
    },
  }
);

const json = await unregister.json();
console.log(json);
for (const entry of json) {
  const response = await fetch(
    `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands/${entry.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    console.error(`Problem removing command ${JSON.stringify(entry)}`);
    console.log(response);
  }
}

console.log("done");
