const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const app = express();

//Ondan scrape

var ondaLunch1 = {}
var ondaLunch2 = {}
const onda = 'https://ravintolaonda.fi/';

async function scapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[4]/div[1]/p[1]');
    const txt = await el.getProperty('textContent')
    var name = await txt.jsonValue()
    name = name.replace(/(\r\n|\n|\r)/gm, "")
    name = name.trim()

    const [el1] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[5]/div[1]/p[1]');
    const txt1 = await el1.getProperty('textContent')
    var name1 = await txt1.jsonValue()
    name1 = name1.replace(/(\r\n|\n|\r)/gm, "")
    name1 = name1.trim()

    const [el2] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[5]/div[2]/p');
    const txt2 = await el2.getProperty('textContent')
    var price = await txt2.jsonValue()
    price = price.replace(/(\r\n|\n|\r)/gm, "")
    price = price.trim()

    ondaLunch1 = {"name":name, "price":price}
    ondaLunch2 = {"name":name1, "price":price}
    console.log(ondaLunch1, ondaLunch2)
}

scapeProduct(onda)

//Lintulahti scrape

//Bruket scape

//Tanner scrape

//Pantry scrape

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))