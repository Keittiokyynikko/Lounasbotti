const puppeteer = require('puppeteer')

async function format_data(data) {
  const get_txt_content = await data.getProperty('textContent')
  let formated_data = await get_txt_content.jsonValue()
  formated_data = formated_data.replace(/(\r\n|\n|\r)/gm, '')
  formated_data = formated_data.trim()
  return formated_data
}

async function scrape_pihka() {
  const url = 'https://www.pihka.fi/pihka-lintulahti/'
  const browser = await puppeteer.launch()
  const page = await browser.newPage({
    headless: true,
  })
  page.setDefaultNavigationTimeout(0)
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  })

  //Lunch-elements from website

 
    const pihka_meat = '//*[@id="main-content"]/article/div/div[2]/div/div/p[1]'
  const pihka_vegan = '//*[@id="main-content"]/article/div/div[2]/div/div/p[2]'
  const pihka_soup = '//*[@id="main-content"]/article/div/div[2]/div/div/p[3]'
  const pihka_dessert =
    '//*[@id="main-content"]/article/div/div[2]/div/div/p[4]'

  const [pihka_vegan_name_xpath] = pihka_vegan !== null ? await page.$x(pihka_vegan) : "--Tietoa ei saatavilla--"
  const pihka_vegan_name = pihka_vegan !== null ? await format_data(pihka_vegan_name_xpath) : "--Tietoa ei saatavilla--"

  const [pihka_meat_name_xpath] = pihka_meat !== null ? await page.$x(pihka_meat) : "--Tietoa ei saatavilla--"
  const pihka_meat_name = pihka_meat !== null ? await format_data(pihka_meat_name_xpath) : "--Tietoa ei saatavilla--"

  const [pihka_soup_name_xpath] = pihka_meat !== null ? await page.$x(pihka_meat) : "--Tietoa ei saatavilla--"
  const pihka_soup_name = pihka_soup !== null ? await format_data(pihka_soup_name_xpath) : "--Tietoa ei saatavilla--"

  const [pihka_dessert_name_xpath] = pihka_dessert !== null ? await page.$x(pihka_dessert) : "--Tietoa ei saatavilla--"
  const pihka_dessert_name = pihka_dessert !== null ? await format_data(pihka_dessert_name_xpath) : "--Tietoa ei saatavilla--"


  const pihka_lunch_meat = {
    name: pihka_meat_name,
  }
  const pihka_lunch_vegan = {
    name: pihka_vegan_name,
  }
  const pihka_lunch_soup = {
    name: pihka_soup_name,
  }
  const pihka_lunch_dessert = {
    name: pihka_dessert_name,
  }

  await browser.close()

  return [
    pihka_lunch_meat,
    pihka_lunch_vegan,
    pihka_lunch_soup,
    pihka_lunch_dessert,
  ]
}

module.exports = {
  scrape_pihka,
}