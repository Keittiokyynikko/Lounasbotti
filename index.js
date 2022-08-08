require('dotenv').config({path:__dirname + '/.env'})

const express = require('express');
const axios = require('axios');
const {WebClient} = require('@slack/web-api');

const {scrape_onda} = require('./restaurants/onda_scrape.js');
const {scrape_pantry} = require('./restaurants/pantry_scrape.js');
const {scrape_pihka} = require('./restaurants/pihka_scrape.js');
const {scrape_bruket} = require('./restaurants/bruket_scrape.js');
const {scrape_fazer} = require('./restaurants/fazer_scrape.js');

const {monday_greetings} = require('./greetings.js')

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
	res.header("Content-Type", "application/xml");
	res.send(fazer_lunch)
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
	console.log(onda_lunch)

	const pihka = 'https://www.pihka.fi/pihka-lintulahti/'
	const pihka_lunch = await scrape_pihka(pihka)

	const pantry = 'https://thepantry.fi/sornainen/#lounas/'
	const pantry_lunch = await scrape_pantry(pantry, current_date)

	const bruket = 'http://www.bruketcafe.fi/';
	const bruket_lunch = await scrape_bruket(bruket, current_date)


    await slackbot.chat.postMessage({
      channel: '#lounasbotti-2',
      text: "Päivän lounaslistat",
      blocks: [
        {
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Päivän lounaat :cook:"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"text": `${dayString}`,
					"type": "mrkdwn"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*ONDA*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://ravintolaonda.fi/",
				"action_id": "button-action"
			}
		},

        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": onda_lunch[0].name + " " + `*${onda_lunch[0].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": onda_lunch[1].name + " " + `*${onda_lunch[1].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": onda_lunch[2].name + " " + `*${onda_lunch[2].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": onda_lunch[3].name + " " + `*${onda_lunch[3].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": onda_lunch[4].name + " " + `*${onda_lunch[4].price}*`
			}
		},
        {
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*PIHKA*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://www.pihka.fi/pihka-lintulahti/",
				"action_id": "button-action"
			}
		},

        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pihka_lunch[0].name
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pihka_lunch[1].name
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pihka_lunch[2].name
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pihka_lunch[3].name
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Koko pöytä 11,60 €*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Vihreä pöytä + keitto 10,60 €*"
			}
		},
        {
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*PANTRY*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://thepantry.fi/sornainen/#lounas",
				"action_id": "button-action"
			}
		},

        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pantry_lunch[0].name + " " + `*${pantry_lunch[0].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pantry_lunch[1].name + " " + `*${pantry_lunch[0].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": pantry_lunch[2].name + " " + `*${pantry_lunch[0].price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Kahvi ja tee lounaan yhteydessä*"
			}
		},
        {
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*BRUKET*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "http://www.bruketcafe.fi/",
				"action_id": "button-action"
			}
		},

        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": bruket_lunch[0].name + " " + `*${bruket_lunch[3]}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": bruket_lunch[1].name + " " + `*${bruket_lunch[3]}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": bruket_lunch[2].name + " " + `*${bruket_lunch[3]}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Kahvi sisältyy lounaaseen*"
			}
		},
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

//send_message()


const port = 3000
app.listen(port, () => {
  console.log(`Lounasbotti_2 app listening on port ${port}`)
})