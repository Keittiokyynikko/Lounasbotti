require('dotenv').config()

const {
  WebClient
} = require('@slack/web-api')

const {
  scrape_onda
} = require('./restaurants/onda_scrape.js')
const {
  scrape_pantry
} = require('./restaurants/pantry_scrape.js')
const {
  scrape_pihka
} = require('./restaurants/pihka_scrape.js')
const {
  scrape_bruket
} = require('./restaurants/bruket_scrape.js')
const {
  scrape_fazer
} = require('./restaurants/fazer_scrape.js')

const {
  greeting
} = require('./components/greetings.js')
const {
  date,
  header,
  restaurant_header,
  info_section,
  lunch_section,
  lunch_section_name,
} = require('./components/message_block_builder.js')

const current_date = new Date().getDay()
const slackToken = process.env.SLACK_BOT_TOKEN_K

const slackbot = new WebClient(slackToken)

const objectEmpty = (obj) => {
  return obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
}

const objectNull = (obj) => {
  return obj && obj == null
}

const loopData = (data) => {
  for (let i = 0; i < data.length; i++) {
    return data[i]
  }
}

async function send_message() {
  try {
    // Use the `chat.postMessage` method to send a message from this app

    const onda_url = 'https://ravintolaonda.fi/'
    const pihka_url = 'https://www.pihka.fi/pihka-lintulahti/'
    const pantry_url = 'https://thepantry.fi/sornainen/#lounas/'
    const bruket_url = 'https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch'
    const fazer_url =
      'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'

    const onda_data = await scrape_onda(onda_url, current_date)
    const onda_blocks = onda_data.map(data => {
      return lunch_section(data.name, data.price)
    })

    const pihka_data = await scrape_pihka(pihka_url)
    const pihka_blocks = pihka_data.map(data => {
      return lunch_section_name(data.name)
    })

    const pantry_data = await scrape_pantry(pantry_url, current_date)
    const pantry_blocks = pantry_data.map(data => {
      return lunch_section(data.name, data.price)
    })

    const bruket_data = await scrape_bruket(bruket_url, current_date)
    const bruket_blocks = bruket_data.map(data => {

      if (objectEmpty(bruket_data)) {
        return lunch_section_name('Tietoja ei saatavilla')
      } else if (objectNull(bruket_data)) {
        return lunch_section_name('Tietoja ei saatavilla')
      } else {
        return lunch_section_name(data)
      }
    })

    const fazer_data = await scrape_fazer()
    const fazer_blocks = fazer_data.map(data => {
      return lunch_section_name(data.name)
    })
    console.log(fazer_data)

    await slackbot.chat.postMessage({
      channel: process.env.LOUNAS,
      text: 'Päivän lounaslista',
      blocks: [
        await header(greeting),
        date,
        restaurant_header(':restaurant_onda:', 'ONDA', onda_url),
        onda_blocks[0],
        onda_blocks[1],
        onda_blocks[2],
        onda_blocks[3],
        onda_blocks[4],
        info_section(
          '*ALENNUS: Buffet-lounaan kuubilaisille 11,30 €, sisältäen kahvin*'
        ),

        {
          type: 'divider',
        },
        restaurant_header(':pihka:', 'PIHKA', pihka_url),
        pihka_blocks[0],
        pihka_blocks[1],
        pihka_blocks[2],
        pihka_blocks[3],
        info_section('Koko pöytä 11,60€'),
        info_section('Vihreä pöytä + keitto 10,60€'),

        {
          type: 'divider',
        },
        restaurant_header(':pantry:', 'PANTRY', pantry_url),
        pantry_blocks[0],
        pantry_blocks[1],
        pantry_blocks[2],
        info_section('Kahvi ja tee lounaan yhteydessä 1,50 €'),

        {
          type: 'divider',
        },
        restaurant_header(':bruket:', 'BRUKET', bruket_url),
        bruket_blocks[0],
        bruket_blocks[1],
        info_section('Lounas 13,90 €, sisältäen kahvin'),

        {
          type: 'divider',
        },
        restaurant_header(':fazer:', 'FAZER LINTULAHTI', fazer_url),
        fazer_blocks[0],
        fazer_blocks[1],
        fazer_blocks[2],
        fazer_blocks[3],
        fazer_blocks[4],
        info_section('Buffet-lounaan hinta 12 €'),
      ],
    })

    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

send_message()