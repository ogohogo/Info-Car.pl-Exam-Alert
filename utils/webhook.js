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
    pushover: async content => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var data = new URLSearchParams();
        data.append("token", config.pushover.token);
        data.append("user", config.pushover.user);
        data.append("title", "InfoCar.pl");
        data.append("message", content);
        data.append("sound", config.pushover.sound);
        data.append("priority", config.pushover.priority);
        if (config.pushover.priority == 2) {
            data.append("retry", config.pushover.retry);
            data.append("expire", config.pushover.expire);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        await fetch("https://api.pushover.net/1/messages.json", requestOptions)
    }
}