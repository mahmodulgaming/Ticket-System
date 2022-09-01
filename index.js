const { Client } = require("discord.js");
const { token, guildId } = require("./settings");

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

client.on("ready", async () => {
  console.log(`${client.user.username} is Online`);
  let guild = client.guilds.cache.get(guildId);
  if (guild) {
    await guild.commands.set([
      {
        name: "ping",
        description: `test ping of bot`,
        type: "CHAT_INPUT",
      },
      {
        name: "setup",
        description: `setup ticket system`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  // loading ticket system
  require("./ticket_system")(client);

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;

  const activities = [
      ` | ${guilds} servers`,
      ` <input> | ${users} users`,
      `filterlist | ${channels} channels`,
  ]

  setInterval(() => {
      client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'WATCHING' });
  }, 15000)
});

client.login(token);
