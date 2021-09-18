const fetch = require("node-fetch")
const config = require("../config")

module.exports = async (content) => {
    const data = await fetch(config.discordWebhookURL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "content": content
        })
    })

    return console.log("Successfully sent webhook!")
}