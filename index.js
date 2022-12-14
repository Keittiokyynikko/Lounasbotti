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
  scrape_boka
} = require('./restaurants/boka_scrape.js')

const {
  greeting
} = require('./components/greetings.js')

const {
  header,
  restaurant_header,
  info_section,
  lunch_section,
} = require('./components/message_block_builder.js')

const current_date = new Date().getDay()
const slackToken = process.env.SLACK_BOT_TOKEN_K

const slackbot = new WebClient(slackToken)

const objectEmpty = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}

const objectNull = (obj) => {
  return obj && obj == null
}

async function send_message() {
  try {
    const onda_data = await scrape_onda(current_date)
    const onda_blocks = onda_data.map((data) => {
      if (data.name == null || data.price == null) {
        return lunch_section('--- Tietoa ei onnistuttu hakemaan ---')
      } else {
        return lunch_section(data.name, data.price)
      }
    })

    let pihka_blocks = []
    try {
      const pihka_data = await scrape_pihka()
      pihka_blocks = pihka_data.map((data) => {
        return lunch_section(data.name)
      })
    } catch (err) {
      pihka_blocks = ['--Tietoja ei voitu hakea--']
    }
    console.log(pihka_blocks)

    let pantry_blocks = []
    try {
      const pantry_data = await scrape_pantry(current_date)
      pantry_blocks = pantry_data.map((data) => {
        return lunch_section(data.name, data.price)
      })
    } catch (err) {
      pantry_blocks = [lunch_section('--Tietoja ei voitu hakea--')]
    }

    console.log(pantry_blocks)

    const bruket_data = await scrape_bruket(current_date)
    const bruket_blocks = bruket_data.map((data) => {
      if (objectEmpty(bruket_data)) {
        return lunch_section('Tietoja ei saatavilla')
      } else if (objectNull(bruket_data)) {
        return lunch_section('Tietoja ei saatavilla')
      } else {
        return lunch_section(data)
      }
    })

    console.log(bruket_blocks)

    const fazer_data = await scrape_fazer()
    const fazer_blocks = fazer_data === null ?
    await fazer_data.map((data) => {
      if (data.name == null) {
        return lunch_section('--- Tietoa ei onnistuttu hakemaan ---')
      } else {
        return lunch_section(data.name)
      }
    }) : lunch_section('--Tietoa ei onnistuttu hakemaan--')

    const boka_data = await scrape_boka()
    const boka_blocks = await boka_data.map((data) => {
      if (data.object == null) {
        return lunch_section('--- Tietoa ei onnistuttu hakemaan ---')
      } else {
        return lunch_section(data.object)
      }
    })

    const divider = {
      type: 'divider',
    }

    let blocks = [header(greeting)]
    blocks.push(
      restaurant_header(
        ':restaurant_onda:',
        'ONDA',
        'https://ravintolaonda.fi/'
      )
    )
    blocks = blocks.concat(onda_blocks)
    blocks.push(
      info_section(
        '*ALENNUS: Buffet-lounaan kuubilaisille 11,30 €, sisältäen kahvin*'
      )
    )
    blocks.push(divider)
    blocks.push(
      restaurant_header(
        ':pihka:',
        'PIHKA',
        'https://www.pihka.fi/pihka-lintulahti/'
      )
    )
    blocks = blocks.concat(pihka_blocks)
    blocks.push(info_section('Koko pöytä 11,60€'))
    blocks.push(info_section('Vihreä pöytä + keitto 10,60€'))
    blocks.push(divider)
    blocks.push(
      restaurant_header(
        ':thepantry:',
        'PANTRY',
        'https://thepantry.fi/sornainen/#lounas/'
      )
    )
    blocks = blocks.concat(pantry_blocks)
    blocks.push(info_section('Kahvi ja tee lounaan yhteydessä 1,50 €'))
    blocks.push(divider)
    blocks.push(
      restaurant_header(':bruket:', 'BRUKET', 'http://www.bruketcafe.fi/')
    )
    blocks = blocks.concat(bruket_blocks)
    blocks.push(info_section('Lounas 13,90 €, sisältäen kahvin'))
    blocks.push(divider)
    blocks.push(
      restaurant_header(
        ':fazer:',
        'FAZER LINTULAHTI',
        'https://www.foodandco.fi/ravintolat/Ravintolat-kaupungeittain/helsinki/Lintu2/'
      )
    )
    blocks = blocks.concat(fazer_blocks)
    blocks.push(info_section('Buffet-lounaan hinta 12 €'))

    blocks.push(divider)

    blocks.push(
      restaurant_header(
        ':boka:',
        'BOKA HELSINKI',
        'https://ravintolaboka.fi/lounas-helsinki/')
    )
    blocks = blocks.concat(boka_blocks)

    await slackbot.chat.postMessage({
      channel: process.env.LOUNAS,
      text: 'Päivän lounaslista',
      blocks,
    })

    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

send_message()