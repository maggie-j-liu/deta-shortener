# deta-shortener

A link shortener Discord bot that runs on [Deta](https://deta.sh). The bot and the site are hosted on a Deta Micro, and it uses a Deta Base to store the links.

Add the discord bot to your server: https://discord.com/api/oauth2/authorize?client_id=941056160860102756&scope=applications.commands

Deploy your own on Deta:

[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://github.com/maggie-j-liu/deta-shortener)

> Note: Since Deta needs to wake up on each request, it may not be able to respond within 3 seconds, leading to "The application did not respond" errors from Discord. Rerunning the command again should work, since the micro has had time to wake up.
