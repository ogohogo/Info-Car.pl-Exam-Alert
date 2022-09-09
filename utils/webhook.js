const fetch = require("node-fetch")
const TelegramBot = require("node-telegram-bot-api");
const config = require("../config")

module.exports = {
    discord: async content => {
        await fetch(config.discordWebhookURL, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "content": `@everyone ${content}`
            })
        })
    },
    telegram: content => {
        const bot = new TelegramBot(config.telegram.botToken, { polling: false });
        bot.sendMessage(config.telegram.chatId, content);
    }
}