const fetch = require("node-fetch")
const playwright = require('playwright');
const HttpsProxyAgent = require("https-proxy-agent")

const notify = require("./utils/webhook");
const config = require("./config");

console.log('\033c')
console.log(`Info-Car.pl Sniper Started!`)

var token;
var checking;
var rateLimit;

const regenerateBearerToken = async () => {
    checking = true;
    const browser = await playwright['firefox'].launch({ headless: true });
    const page = await browser.newPage({ viewport: null });

    page.route('**', route => {
        const request = route.request()
        let headers = request.headers()
        if (headers.referer == "https://info-car.pl/new/prawo-jazdy/sprawdz-wolny-termin" && headers.authorization) {
            console.log('Successfully obtained bearer token!')
            token = headers.authorization
            checking = false;
            console.log('Back to checking free exams...')
            return browser.close();
        }
        return route.continue();
    });

    await page.goto('https://info-car.pl/oauth2/login'); // wait until page load
    await page.type('.login-input', config.account.login);
    await page.type('.password-input', config.account.password);
    await page.click('#register-button'),
        await page.waitForSelector('.ghost-btn', {
            visible: true,
        });
    await page.goto('https://info-car.pl/new/prawo-jazdy/sprawdz-wolny-termin')
}

async function get() {

    if (checking) return;

    try {
        const data = await fetch("https://info-car.pl/api/word/word-centers/exam-schedule", {
            timeout: 3 * 1000,
            method: 'PUT',
            agent: config.useProxy ? new HttpsProxyAgent(config.proxy) : '',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "category": config.category,
                "wordId": config.wordID
            })
        }).then(res => res.json())

        data.schedule.scheduledDays.forEach(days => {
            days.scheduledHours.forEach(async exam => {
                if (exam.practiceExams.length < 1) return;

                let examDateInMS = new Date(days.day.toString()).getTime();
                let maxTime = new Date().getTime() + (config.maxExamTime * 24 * 60 * 60 * 1000)

                if (examDateInMS > maxTime) return;

                if (rateLimit) return;

                rateLimit = true;

                setTimeout(() => {
                    rateLimit = false
                }, 30 * 1000)

                return await notify[config.notifyVia](`Wolny egzamin na kategorie ${config.category} dnia ${days.day} na godzinę ${exam.time}`)
            })
        })
    } catch (e) {
        if (e.message.includes("ECONNRESET")) return;

        if (e.message.includes("Unexpected end")) {
            console.log("Invalid Bearer Token detected! Attempting to re-generate it...")
            await regenerateBearerToken();
            return get();
        }
    }

}

get();

setInterval(() => {
    get();
}, config.refreshTime * 1000)
