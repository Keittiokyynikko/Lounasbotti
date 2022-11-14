const puppeteer = require('puppeteer')

async function format_data(data) {
  const get_txt_content = await data.getProperty('textContent')
  let formated_data = await get_txt_content.jsonValue()
  formated_data = formated_data.replace(/(\r\n|\n|\r)/gm, '')
  formated_data = formated_data.trim()
  return formated_data
}

async function scrape_pantry(url, date_index) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage({
    headless: true
  })
  page.setDefaultNavigationTimeout(0);
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0
  })

  console.log(url);

  //Lunch-elements from website

  const monday_vegan =
    '//*[@id="maanantai"]/div/div[5]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const monday_liha =
    '//*[@id="maanantai"]/div/div[1]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const monday_kala =
    '//*[@id="maanantai"]/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'

  const tuesday_vegan =
    '//*[@id="tiistai"]/div/div[5]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const tuesday_liha =
    '//*[@id="tiistai"]/div/div[1]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const tuesday_kala =
    '//*[@id="tiistai"]/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'

  const wednesday_vegan =
    '//*[@id="keskiviikko"]/div/div[5]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h4'
  const wednesday_liha =
    '//*[@id="keskiviikko"]/div/div[1]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const wednesday_kala =
    '//*[@id="keskiviikko"]/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'

  const thursday_vegan =
    '//*[@id="torstai"]/div/div[5]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6/span'
  const thursday_liha =
    '//*[@id="torstai"]/div/div[1]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6/span'
  const thursday_kala =
    '//*[@id="torstai"]/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6/span'

  const friday_vegan =
    '//*[@id="perjantai"]/div/div[5]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const friday_liha =
    '//*[@id="perjantai"]/div/div[1]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'
  const friday_kala =
    '//*[@id="perjantai"]/div/div[3]/div/div/div[1]/div/div/div/div/div[2]/div[1]/h6'

  var lunch_vegan
  var lunch_meat
  var lunch_fish

  if (date_index == 1) {
    lunch_vegan = monday_vegan
    lunch_meat = monday_liha
    lunch_fish = monday_kala
  } else if (date_index == 2) {
    lunch_vegan = tuesday_vegan
    lunch_meat = tuesday_liha
    lunch_fish = tuesday_kala
  } else if (date_index == 3) {
    lunch_vegan = wednesday_vegan
    lunch_meat = wednesday_liha
    lunch_fish = wednesday_kala
  } else if (date_index == 4) {
    lunch_vegan = thursday_vegan
    lunch_meat = thursday_liha
    lunch_fish = thursday_kala
  } else if (date_index == 5) {
    lunch_vegan = friday_vegan
    lunch_meat = friday_liha
    lunch_fish = friday_kala
  }

  const [lunch_vegan_name_xpath] = await page.$x(lunch_vegan)
  const lunch_vegan_name = await format_data(lunch_vegan_name_xpath)

  console.log(lunch_vegan_name);

  const [lunch_meat_name_xpath] = await page.$x(lunch_meat)
  const lunch_meat_name = await format_data(lunch_meat_name_xpath)

  const [lunch_fish_name_xpath] = await page.$x(lunch_fish)
  const lunch_fish_name = await format_data(lunch_fish_name_xpath)

  const [lunch_price_xpath] = await page.$x(
    '//*[@id="torstai"]/div/div[5]/div/div/div[2]/div/div/div/div/div/div[1]/h6'
  )
  const lunch_price = await format_data(lunch_price_xpath)

  const pantry_lunch_vegan = {
    name: lunch_vegan_name,
    price: lunch_price,
  }

  console.log(pantry_lunch_vegan);

  const pantry_lunch_meat = {
    name: lunch_meat_name,
    price: lunch_price,
  }
  const pantry_lunch_fish = {
    name: lunch_fish_name,
    price: lunch_price,
  }

  await browser.close();

  return [pantry_lunch_vegan, pantry_lunch_meat, pantry_lunch_fish]
}

module.exports = {
  scrape_pantry,
}