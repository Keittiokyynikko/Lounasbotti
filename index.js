const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const onda = 'https://ravintolaonda.fi/';

axios(onda)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);
        const lunches = [];

        const currentDate = new Date().getDay();

        $('#lunchbox', html).each(function() {
                const title = $(this).text();
                lunches.push({
                title
            })
            console.log(lunches);
        })
    })

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))