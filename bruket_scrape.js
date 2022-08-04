const cheerio = require('cheerio');
const axios = require('axios');

async function scrape_bruket() {

    const lunchlist = []

    axios.get('http://www.bruketcafe.fi/')
    .then( res => {

        const html = res.data
        const $ = cheerio.load(html)

        console.log(lunchlist)
        })

        return lunchlist
}

module.exports = {scrape_bruket}
