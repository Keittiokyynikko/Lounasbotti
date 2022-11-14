require('dotenv').config()

const { WebClient } = require('@slack/web-api')

const { scrape_onda } = require('./restaurants/onda_scrape.js')
const { scrape_pantry } = require('./restaurants/pantry_scrape.js')
const { scrape_pihka } = require('./restaurants/pihka_scrape.js')
const { scrape_bruket } = require('./restaurants/bruket_scrape.js')
const { scrape_fazer } = require('./restaurants/fazer_scrape.js')

const {
  restaurant_header,
  info_section,
  lunch_section,
} = require('./components/message_block_builder.js')

const current_date = new Date().getDay()
const slackToken = process.env.SLACK_BOT_TOKEN_T

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

    const pihka_data = await scrape_pihka()
    const pihka_blocks = pihka_data.map((data) => {
      return lunch_section(data.name)
    })

    let pantry_blocks = []
    try {
      const pantry_data = await scrape_pantry(current_date)
      pantry_blocks = pantry_data.map((data) => {
        return lunch_section(data.name, data.price)
      })
    } catch (err) {
      pantry_blocks = ['Tietoja ei voitu hakea', 'Tietoja ei voitu hakea']
    }

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

    const fazer_data = await scrape_fazer()
    const fazer_blocks = await fazer_data.map((data) => {
      if (data.name == null) {
        return lunch_section('--- Tietoa ei onnistuttu hakemaan ---')
      } else {
        return lunch_section(data.name)
      }
    })

    console.log(
      'lengths',
      onda_blocks.length,
      pihka_blocks.length,
      pantry_blocks.length,
      bruket_blocks.length,
      fazer_blocks.length
    )

    const divider = {
      type: 'divider',
    }

    let blocks = []
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

    await slackbot.chat.postMessage({
      channel: process.env.TESTI,
      text: 'Päivän lounaslista',
      blocks,
    })

    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

send_message()
