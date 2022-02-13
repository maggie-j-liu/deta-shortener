import fetch from "node-fetch";

const register = async (url, commandsList) => {
  console.log("registering commands", commandsList);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${process.env.TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(commandsList),
  });

  if (response.ok) {
    console.log("Registered all commands");
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
  }
};

export default register;
