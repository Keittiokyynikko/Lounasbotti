require('dotenv').config({path:__dirname + '/.env'})

const express = require('express');
const axios = require('axios');
const {WebClient} = require('@slack/web-api');

const {scrape_onda} = require('./onda_scrape.js');
const {scrape_pantry} = require('./pantry_scrape.js');
const {scrape_pihka} = require('./pihka_scrape.js');
const {scrape_bruket} = require('./bruket_scrape.js')

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


const lintulahtiRSS = 'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'



//Bruket scape

app.get('/bruket', async(_req, res) => {
	const bruket_lunch = await scrape_bruket()
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


    await slackbot.chat.postMessage({
      channel: '#lounasbotti-2',
      text: "Sisältöä ei voi näyttää, ota yhteyttä ohjelmoijaan!",
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
				"text": onda_lunch[0].name
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*PANTRY SÖRNÄINEN*"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://thepantry.fi/sornainen/",
				"action_id": "button-action"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${paivanLiha.name}, *${paivanLiha.price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${paivanKala.name}, *${paivanKala.price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${paivanKasvis.name}, *${paivanKasvis.price}*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Kahvi tai tee sisältyy lounaaseen.*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*PIHKA LINTULAHTI*"
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
				"text": `${pihkaLiha.name}`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${pihkaKasvis.name}`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${pihkaKeitto.name}`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${pihkaDessert.name}`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Koko pöytä *11,60 €*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Vihreä pöytä + keitto *10,60 €*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "RAVINTOLAN NIMI"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://google.com",
				"action_id": "button-action"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 1"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 2"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 3"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "RAVINTOLAN NIMI"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Sivusto",
					"emoji": true
				},
				"value": "click_me_123",
				"url": "https://google.com",
				"action_id": "button-action"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 1"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 2"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lounas 3"
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

/*
async function test () {
    try {
        // Use the `chat.postMessage` method to send a message from this app
        await slackbot.chat.postMessage({
          channel: '#lounas',
          text: "Heippa! Olen Lempi Lounasbotti ja testaan kuuluvuuttani. Kuulette minusta lisää syksyllä!",
        });
        console.log('Message posted!');
      } catch (error) {
        console.log(error);
      }
}

test()
*/




const port = 3000
app.listen(port, () => {
  console.log(`Lounasbotti_2 app listening on port ${port}`)
})