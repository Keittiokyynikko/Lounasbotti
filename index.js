const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const app = express();

//Viikonpäivä
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const currentDate = new Date().getDay();
const dateIndex = currentDate;


//Ondan scrape


const onda = 'https://ravintolaonda.fi/';

var ondaSalad = {}
var ondaBuffetVegan = {}
var ondaBuffetLiha = {}
var ondaVegan = {}
var ondaLiha = {}

async function scapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const monday_vegan = '//*[@id="lunchbox"]/div/div[2]/div[3]/div[1]/p[1]';
    const monday_liha = '//*[@id="lunchbox"]/div/div[2]/div[4]/div[1]/p[1]';

    const tuesday_vegan = '//*[@id="lunchbox"]/div/div[3]/div[4]/div[1]/p[1]';
    const tuesday_liha = '//*[@id="lunchbox"]/div/div[3]/div[5]/div[1]/p[1]';

    const wednesday_vegan = '//*[@id="lunchbox"]/div/div[4]/div[4]/div[1]/p[1]'
    const wednesday_liha = '//*[@id="lunchbox"]/div/div[3]/div[5]/div[1]/p[1]'

    const thursday_vegan = '//*[@id="lunchbox"]/div/div[5]/div[4]/div[1]/p[1]';
    const thursday_liha = '//*[@id="lunchbox"]/div/div[5]/div[5]/div[1]/p[1]';

    const friday_vegan = '//*[@id="lunchbox"]/div/div[6]/div[4]/div[1]/p[1]';
    const friday_liha = '//*[@id="lunchbox"]/div/div[6]/div[5]/div[1]/p[1]';

    var lunchVegan
    var lunchLiha
    if(dateIndex == 1) {
        lunchVegan = monday_vegan
        lunchLiha = monday_liha
    } else if(dateIndex == 2) {
        lunchVegan = tuesday_vegan
        lunchLiha = tuesday_liha
    } else if(dateIndex == 3) {
        lunchVegan = wednesday_vegan
        lunchLiha = wednesday_liha
    } else if(dateIndex == 4) {
        lunchVegan = thursday_vegan
        lunchLiha = thursday_liha
    } else if(dateIndex == 5) {
        lunchVegan = friday_vegan
        lunchLiha = friday_liha
    }

    //Buffet hinta
    const [el0] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[5]/div[2]/p');
    const txt0 = await el0.getProperty('textContent')
    var price_buffet = await txt0.jsonValue()
    price_buffet = price_buffet.replace(/(\r\n|\n|\r)/gm, "")
    price_buffet = price_buffet.trim()

    //Salaatti Buffet hinta
    const [el1] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[3]/div[2]/p');
    const txt1 = await el1.getProperty('textContent')
    var price_buffet_salad = await txt1.jsonValue()
    price_buffet_salad = price_buffet_salad.replace(/(\r\n|\n|\r)/gm, "")
    price_buffet_salad = price_buffet_salad.trim()

    //Lounas1 hinta
    const [el2] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[6]/div[2]/p');
    const txt2 = await el2.getProperty('textContent')
    var price_lounas1 = await txt2.jsonValue()
    price_lounas1 = price_lounas1.replace(/(\r\n|\n|\r)/gm, "")
    price_lounas1 = price_lounas1.trim()

    //Lounas2 hinta
    const [el3] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[7]/div[2]/p');
    const txt3 = await el3.getProperty('textContent')
    var price_lounas2 = await txt3.jsonValue()
    price_lounas2 = price_lounas2.replace(/(\r\n|\n|\r)/gm, "")
    price_lounas2 = price_lounas2.trim()

    //Buffet vegan nimi
    const [el4] = await page.$x(lunchVegan);
    const txt4 = await el4.getProperty('textContent')
    var buffet_vegan_name = await txt4.jsonValue()
    buffet_vegan_name = buffet_vegan_name.replace(/(\r\n|\n|\r)/gm, "")
    buffet_vegan_name = buffet_vegan_name.trim()

    //Buffet liha nimi
    const [el5] = await page.$x(lunchLiha);
    const txt5 = await el5.getProperty('textContent')
    var buffet_liha_name = await txt5.jsonValue()
    buffet_liha_name = buffet_liha_name.replace(/(\r\n|\n|\r)/gm, "")
    buffet_liha_name = buffet_liha_name.trim()

    //Lounas1 nimi
    const [el6] = await page.$x('//*[@id="lunchbox"]/div/div[3]/div[4]/div[1]/p[1]');
    const txt6 = await el6.getProperty('textContent')
    var lounas1_name = await txt6.jsonValue()
    lounas1_name = lounas1_name.replace(/(\r\n|\n|\r)/gm, "")
    lounas1_name = lounas1_name.trim()

    //Lounas2 nimi
    const [el7] = await page.$x('//*[@id="lunchbox"]/div/div[6]/div[7]/div[1]/p[1]');
    const txt7 = await el7.getProperty('textContent')
    var lounas2_name = await txt7.jsonValue()
    lounas2_name = lounas2_name.replace(/(\r\n|\n|\r)/gm, "")
    lounas2_name = lounas2_name.trim()

    //JSON-objektit
    ondaSalad = {"name": "Salaatti buffet", "price": price_buffet_salad + ' €'}
    ondaVegan = {"name": lounas1_name, "price": price_lounas1 + ' €'}
    ondaLiha = {"name": lounas2_name, "price": price_lounas2 + ' €'}
    ondaBuffetVegan = {"name":buffet_vegan_name, "price":price_buffet + ' €'}
    ondaBuffetLiha = {"name":buffet_liha_name, "price":price_buffet + ' €'}
    console.log(ondaBuffetVegan, ondaBuffetLiha, ondaVegan, ondaLiha, ondaSalad)
}

scapeProduct(onda)


//------------------------


//Lintulahti scrape

//Bruket scape

//Tanner scrape

//Pantry scrape

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))