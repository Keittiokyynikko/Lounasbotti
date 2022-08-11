require('dotenv').config({path:__dirname + '/.env'})

const express = require('express');
const axios = require('axios');
const {WebClient} = require('@slack/web-api');

const {scrape_onda} = require('./restaurants/onda_scrape.js');
const {scrape_pantry} = require('./restaurants/pantry_scrape.js');
const {scrape_pihka} = require('./restaurants/pihka_scrape.js');
const {scrape_bruket} = require('./restaurants/bruket_scrape.js');
const {scrape_fazer} = require('./restaurants/fazer_scrape.js');

const {greeting} = require('./components/greetings.js');
const {header, restaurant_header, restaurant_lunch_section_build_1} = require('./components/message_block_builder.js');

const app = express();

//Viikonpäivä
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const current_date = new Date().getDay();


const onda = 'https://ravintolaonda.fi/';

app.get('/onda', async(_req, res) => {
	const onda = 'https://ravintolaonda.fi/';
	const onda_lunch = await scrape_onda(onda, current_date)
	res.json(onda_lunch)
	console.log(onda_lunch)
  })


const pihka = 'https://www.pihka.fi/pihka-lintulahti/'

app.get('/pihka', async(_req, res) => {
	const pihka = 'https://www.pihka.fi/pihka-lintulahti/'
	const pihka_lunch = await scrape_pihka(pihka)
	res.json(pihka_lunch)
  })



const pantry = 'https://thepantry.fi/sornainen/#lounas/'

app.get('/pantry', async(_req, res) => {
	const pantry = 'https://thepantry.fi/sornainen/#lounas/'
	const pantry_lunch = await scrape_pantry(pantry, current_date)
	res.json(pantry_lunch)
  })


const fazer = 'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'

app.get('/fazer', async(_req, res) => {
	const fazer_lunch = await scrape_fazer()
	console.log("Testi" + fazer_lunch)
	res.json(fazer_lunch)
})



//Bruket scape

app.get('/bruket', async(_req, res) => {
	const bruket = 'http://www.bruketcafe.fi/';
	const bruket_lunch = await scrape_bruket(bruket, current_date)
	res.json(bruket_lunch)
  })



//Tanner scrape


//Slack-viestin kokoaminen ja lähettäminen

const slackbot = new WebClient(process.env.SLACK_BOT_TOKEN_T)
console.log(process.env.SLACK_BOT_TOKEN_T)
const dayString = new Date().toDateString()

async function send_message () {

  try {
    // Use the `chat.postMessage` method to send a message from this app

	const onda = 'https://ravintolaonda.fi/';
	const onda_lunch = await scrape_onda(onda, current_date)

	const pihka = 'https://www.pihka.fi/pihka-lintulahti/'
	const pihka_lunch = await scrape_pihka(pihka)

	const pantry = 'https://thepantry.fi/sornainen/#lounas/'
	const pantry_lunch = await scrape_pantry(pantry, current_date)

	const bruket = 'https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch';
	const bruket_lunch = await scrape_bruket(bruket, current_date)
	console.log("Testi " + bruket_lunch)

	const fazer = 'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'
	const fazer_lunch = await scrape_fazer()



    await slackbot.chat.postMessage({
      channel: '#lounasbotti-2',
      text: "Päivän lounaslistat",
      blocks: [

		header(greeting),
		restaurant_header("ONDA", onda),
        await restaurant_lunch_section_build_1("ONDA", onda, current_date, 0),
		await restaurant_lunch_section_build_1("ONDA", onda, current_date, 1),
		await restaurant_lunch_section_build_1("ONDA", onda, current_date, 2),
		await restaurant_lunch_section_build_1("ONDA", onda, current_date, 3),
		await restaurant_lunch_section_build_1("ONDA", onda, current_date, 4),

        {
			"type": "divider"
		},

		

	]
    });

    console.log('Message posted!');
  } catch (error) {
    console.log(error);
  }

};

send_message()


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Lounasbotti_2 app listening on port ${port}`)
})