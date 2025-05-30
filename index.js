const { Telegraf } = require('telegraf')
require("dotenv").config();

const commands = [
    {command: "quit", description: "Quit chat interaction with the bot"},
    {command: "post", description: "Make a post with the bot"},
    {command: "help", description: "View help options"},
];
const bot = new Telegraf(process.env.BOT_API_TOKEN);
bot.telegram.setMyCommands(commands);

//quit function
bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
  console.log(`${process.env.BOT_FIRST_NAME} has quit`);
});

bot.command('post', (ctx) => {
    console.log(ctx);
    ctx.reply('What will be the name of your post?');
});

bot.help((ctx) => ctx.reply('Help message'));
bot.hears('hello bot', (ctx) => ctx.reply('Hello world!'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));