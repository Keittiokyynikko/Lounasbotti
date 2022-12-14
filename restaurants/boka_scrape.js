const axios = require('axios')
const cheerio = require('cheerio')

async function scrape_boka() {
    const promise = await new Promise((resolve) => {
        const boka = 'https://ravintolaboka.fi/lounas-helsinki/'
        axios.get(boka).then((res) => {
            const data = res.data
            const $ = cheerio.load(data)

            const lunch_array = [];
            const objects = [];

            const lunch_raw = $('p.p1')
            $(lunch_raw).each((_, element) => {
                const el = $(element).text()
                lunch_array.push(el)
            })

            for (let i = 0; i < lunch_array.length; i++) {

                const lunct_object = {
                    object: lunch_array[i],
                }
                objects.push(lunct_object)

            }

            resolve(objects)
        })
    })
    return promise
}

scrape_boka();

module.exports = {
    scrape_boka,
}