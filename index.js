require("dotenv").config({
	path: __dirname + "/.env",
});

const express = require("express");
const {
	WebClient
} = require("@slack/web-api");

const {
	scrape_onda
} = require("./restaurants/onda_scrape.js");
const {
	scrape_pantry
} = require("./restaurants/pantry_scrape.js");
const {
	scrape_pihka
} = require("./restaurants/pihka_scrape.js");
const {
	scrape_bruket
} = require("./restaurants/bruket_scrape.js");
const {
	scrape_fazer
} = require("./restaurants/fazer_scrape.js");

const {
	greeting
} = require("./components/greetings.js");
const {
	date,
	header,
	restaurant_header,
	restaurant_lunch_section_build_1,
	restaurant_lunch_section_build_2,
	info_section
} = require("./components/message_block_builder.js");

const app = express();

const current_date = new Date().getDay();

app.get("/onda", async (_req, res) => {
	const onda = "https://ravintolaonda.fi/";
	const onda_lunch = await scrape_onda(onda, current_date);
	res.json(onda_lunch);
	console.log(onda_lunch);
})

app.get("/pihka", async (_req, res) => {
	const pihka = "https://www.pihka.fi/pihka-lintulahti/";
	const pihka_lunch = await scrape_pihka(pihka);
	res.json(pihka_lunch);
})

app.get("/pantry", async (_req, res) => {
	const pantry = "https://thepantry.fi/sornainen/#lounas/";
	const pantry_lunch = await scrape_pantry(pantry, current_date);
	res.json(pantry_lunch);
})

app.get("/fazer", async (_req, res) => {
	const fazer_lunch = await scrape_fazer();
	console.log("Testi" + fazer_lunch);
	res.json(fazer_lunch);
})

//Bruket scape

app.get("/bruket", async (_req, res) => {
	const bruket = "http://www.bruketcafe.fi/";
	const bruket_lunch = await scrape_bruket(bruket, current_date);
	res.json(bruket_lunch);
})

//Tanner scrape

//Slack-viestin kokoaminen ja lähettäminen

// eslint-disable-next-line no-undef
const slackbot = new WebClient(process.env.SLACK_BOT_TOKEN_T);
// eslint-disable-next-line no-undef
console.log(process.env.SLACK_BOT_TOKEN_T);

async function send_message() {
	try {
		// Use the `chat.postMessage` method to send a message from this app

		const onda = "https://ravintolaonda.fi/";
		const pihka = "https://www.pihka.fi/pihka-lintulahti/";
		const pantry = "https://thepantry.fi/sornainen/#lounas/";
		const bruket = "https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch";
		const fazer =
			"https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi";

		const onda_list = await new Promise((resolve, reject) => {
			const result = restaurant_lunch_section_build_1(
				onda,
				current_date,
				scrape_onda
			)
			resolve(result)
		})
		console.log(onda_list)


		for (var i = 0; i < onda_list.length; i++) {
			if (i == onda_list.length - 1) {
				console.log("Test" + await onda_list[i])
			} else {
				console.log("Test" + await onda_list[i] + ",")
			}
		}


		await slackbot.chat.postMessage({
			channel: "#lounasbotti-2",
			text: "Päivän lounaslistat",
			blocks: [
				header(greeting),
				date,
				restaurant_header("ONDA", onda),
				async function loop() {
						for (var i = 0; i < onda_list.length; i++) {
							if (i == onda_list.length - 1) {
								return onda_list[i]
							} else {
								return onda_list[i] + ","
							}
						}
					},

					{
						type: "divider",
					},
					restaurant_header("PIHKA", pihka),
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
					info_section("Koko pöytä 11,60€"),
					info_section("Vihreä pöytä + keitto 10,60€"),

					{
						type: "divider",
					},
			],
		});

		console.log("Message posted!");
	} catch (error) {
		console.log(error);
	}
}

send_message();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Lounasbotti_2 app listening on port ${port}`);
})