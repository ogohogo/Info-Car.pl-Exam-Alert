module.exports = {
    account: {
        //Dane do konta info-car. Nie polecam używania swojego własnego konta. Lepiej stworzyć nowe, najlepiej przez VPN.
        login: '', //E-mail
        password: '' //Hasło
    },

    maxExamTime: 7, //Maksymalny czas egzaminu od teraz. Czyli np. bot wyśle Tobie powiadomienie, jeśli egzamin jest dostępny w terminie 7 dni od dzisiejszej daty.
    
    useProxy: false, //Czy bot ma używać proxy. true albo false.
    proxy: '', //Proxy w formacie typ://ip:port lub typ://użytkownik:hasło@ip:port

    category: 'B', //Kategoria Prawa Jazdy
    wordID: '', //id twojego wordu. Lista ID dostępna tutaj: https://pastebin.com/3zKNsYk3
    discordWebhookURL: '', //URL do Webhooka Discorda. Tam będą wysyłane twoje powiadomienia.
    telegram: {
        botToken: '',
        chatId: ''
    },
    smsapi: {
        // Tutaj token z uprawnieniami wysyłki generowany w https://ssl.smsapi.pl/react/oauth/manage
        apiToken: 'TOKEN_HERE',
        // Nazwa nadawcy lub null dla domyślnego
        fromNumber: null,
        //Numer pod jaki dostarczyć sms (przykładowy: 48123123123)
        phoneNumber: '48123123123',
    },
    pushover:{ //dokumentacja https://pushover.net/api
        token: '', //token aplikacji
        user: '', //user key
        priority: 1, //wartości -2..2 jeśli ustawiony na 2 (emergency) trzeba też ustawić retry (co ile [s] powtarzać powiadomienie) i expire (po jakim czasie [s] wygasa)
        retry: 10, //tylko dla priority=2
        expire: 60, //tylko dla priority=2
        sound: "persistent" //https://pushover.net/api#sounds
    },
    notifyVia: '', // W jaki sposob chcesz byc powiadomiony, telegram lub discord
    refreshTime: 5, //Co ile bot ma wysyłać requesty do serwisu info-car. W sekundach.
}