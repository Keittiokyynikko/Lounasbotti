const cheerio = require('cheerio')
const axios = require('axios')
const { XMLParser, XMLBuilder } = require('fast-xml-parser')
const he = require('he')

async function scrape_fazer() {
  const promise = new Promise((resolve) => {
    axios
      .get(
        'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'
      )
      .then((res) => {
        try{
          const parser = new XMLParser()
        const builder = new XMLBuilder()
        const data = res.data

        const xml = parser.parse(data)
        const xml_build = builder.build(xml)
        const $ = cheerio.load(xml_build)

        const lunch_raw = $('description').last().text()
        const lunch_clean = lunch_raw.replace(/<\/?[^>]+(>|$)/g, '')
        const lunch = he.decode(lunch_clean)

        let lunch_array = lunch.split(')')
        for (let i = 0; i < lunch_array.length; i++) {
          lunch_array[i] = lunch_array[i].concat(')')
        }

        lunch_array = lunch_array.slice(0, -1)

        //console.log(lunch_array)

        const fazer_lunch_entry_1 = {
          name: lunch_array[0],
        }
        const fazer_lunch_entry_2 = {
          name: lunch_array[1],
        }
        const fazer_lunch_entry_3 = {
          name: lunch_array[2],
        }
        const fazer_lunch_entry_4 = {
          name: lunch_array[3],
        }
        const fazer_lunch_entry_5 = {
          name: lunch_array[4],
        }
        const fazer_lunch_entry_6 = {
          name: lunch_array[5],
        }

        const lunch_list = [
          fazer_lunch_entry_1,
          fazer_lunch_entry_2,
          fazer_lunch_entry_3,
          fazer_lunch_entry_4,
          fazer_lunch_entry_5,
          fazer_lunch_entry_6,
        ]

        resolve(lunch_list)
        } catch (err) {
          resolve ('--Tietoja ei onnistuttu hakemaan--')
        }
      })
  })

  return promise
}

module.exports = {
  scrape_fazer,
}
