require('dotenv').config()

const { WebClient } = require('@slack/web-api')

const { scrape_onda } = require('./restaurants/onda_scrape.js')
const { scrape_pantry } = require('./restaurants/pantry_scrape.js')
const { scrape_pihka } = require('./restaurants/pihka_scrape.js')
const { scrape_bruket } = require('./restaurants/bruket_scrape.js')
const { scrape_fazer } = require('./restaurants/fazer_scrape.js')

const { greeting } = require('./components/greetings.js')
const {
  date,
  header,
  restaurant_header,
  info_section,
  restaurant_lunch_section_build_1,
  restaurant_lunch_section_build_2,
  restaurant_lunch_section_build_3,
  restaurant_lunch_section_build_4,
} = require('./components/message_block_builder.js')

const current_date = new Date().getDay()
const slackToken = process.env.SLACK_BOT_TOKEN_T

const slackbot = new WebClient(slackToken)

async function send_message() {
  try {
    // Use the `chat.postMessage` method to send a message from this app

    const onda = 'https://ravintolaonda.fi/'
    const pihka = 'https://www.pihka.fi/pihka-lintulahti/'
    const pantry = 'https://thepantry.fi/sornainen/#lounas/'
    const bruket = 'https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch'
    const fazer =
      'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'

    await slackbot.chat.postMessage({
      channel: '#lounasbotti-2',
      text: 'Lounasbotin beta-testi',
      blocks: [
        await header(greeting),
        date,
        restaurant_header(':restaurant_onda:', 'ONDA', onda),
        await restaurant_lunch_section_build_1(
          onda,
          current_date,
          0,
          scrape_onda
        ),
        await restaurant_lunch_section_build_1(
          onda,
          current_date,
          1,
          scrape_onda
        ),
        await restaurant_lunch_section_build_1(
          onda,
          current_date,
          2,
          scrape_onda
        ),
        await restaurant_lunch_section_build_1(
          onda,
          current_date,
          3,
          scrape_onda
        ),
        await restaurant_lunch_section_build_1(
          onda,
          current_date,
          4,
          scrape_onda
        ),
        info_section(
          '*ALENNUS: Buffet-lounaan kuubilaisille 11,30 €, sisältäen kahvin*'
        ),

        {
          type: 'divider',
        },
        restaurant_header(':pihka:', 'PIHKA', pihka),
        await restaurant_lunch_section_build_2(
          pihka,
          current_date,
          0,
          scrape_pihka
        ),
        await restaurant_lunch_section_build_2(
          pihka,
          current_date,
          1,
          scrape_pihka
        ),
        await restaurant_lunch_section_build_2(
          pihka,
          current_date,
          2,
          scrape_pihka
        ),
        await restaurant_lunch_section_build_2(
          pihka,
          current_date,
          3,
          scrape_pihka
        ),
        info_section('Koko pöytä 11,60€'),
        info_section('Vihreä pöytä + keitto 10,60€'),

        {
          type: 'divider',
        },
        restaurant_header(':pantry:', 'PANTRY', pantry),
        await restaurant_lunch_section_build_1(
          pantry,
          current_date,
          0,
          scrape_pantry
        ),
        await restaurant_lunch_section_build_1(
          pantry,
          current_date,
          1,
          scrape_pantry
        ),
        await restaurant_lunch_section_build_1(
          pantry,
          current_date,
          2,
          scrape_pantry
        ),
        info_section('Kahvi ja tee sisältyy lounaaseen'),

        {
          type: 'divider',
        },
        restaurant_header(':bruket:', 'BRUKET', bruket),
        await restaurant_lunch_section_build_3(
          bruket,
          current_date,
          0,
          scrape_bruket
        ),
        await restaurant_lunch_section_build_3(
          bruket,
          current_date,
          1,
          scrape_bruket
        ),
        info_section('Lounas 13,90 €, sisältäen kahvin'),

        {
          type: 'divider',
        },
        restaurant_header(':fazer:', 'FAZER LINTULAHTI', fazer),
        await restaurant_lunch_section_build_4(0, scrape_fazer),
        await restaurant_lunch_section_build_4(1, scrape_fazer),
        await restaurant_lunch_section_build_4(2, scrape_fazer),
        await restaurant_lunch_section_build_4(3, scrape_fazer),
        await restaurant_lunch_section_build_4(4, scrape_fazer),
        await restaurant_lunch_section_build_4(5, scrape_fazer),
        info_section('Buffet-lounaan hinta 12 €'),
      ],
    })

    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

send_message()
