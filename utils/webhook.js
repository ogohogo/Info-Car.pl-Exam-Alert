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
    },
    smsapi: async content => {
        await fetch('https://api.smsapi.pl/sms.do', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.smsapi.apiToken}`,
            },
            "body": JSON.stringify({
                "message": content,
                "to": config.smsapi.phoneNumber,
                "from": config.smsapi.fromNumber,
                "format": "json",
                "encoding": "utf-8",
            })
        })
    },
}